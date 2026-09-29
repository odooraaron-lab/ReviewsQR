import { db, hasDb, localRead, localWrite } from './db';
import { shortId, token } from './guard';
import type { SignInput } from './options';

export type OrderStatus = 'pending' | 'paid' | 'disabled';

export type Order = {
  id: string;
  token: string;
  business: string;
  headline: string;
  thanks: string;
  review_url: string;
  design: string;
  email: string;
  status: OrderStatus;
  stripe_session_id: string | null;
  amount_cents: number;
  created_at: string;
  paid_at: string | null;
  emailed_at: string | null;
  downloads: number;
  edits: number;
};

/** Customers can fix typos or switch design for a week after paying. */
export const EDIT_DAYS = 7;
export const EDIT_LIMIT = 10;
export const canEdit = (o: Order) =>
  o.status === 'paid' && !!o.paid_at && Date.now() - new Date(o.paid_at).getTime() < EDIT_DAYS * 86400000 && o.edits < EDIT_LIMIT;

export const signInput = (o: Order): SignInput => ({ business: o.business, headline: o.headline, thanks: o.thanks, url: o.review_url, design: o.design });

const now = () => new Date().toISOString();

export async function createOrder(input: SignInput, email: string): Promise<Order> {
  const o: Order = {
    id: shortId(), token: token(), business: input.business, headline: input.headline, thanks: input.thanks,
    review_url: input.url, design: input.design, email, status: 'pending', stripe_session_id: null,
    amount_cents: 0, created_at: now(), paid_at: null, emailed_at: null, downloads: 0, edits: 0,
  };
  if (!hasDb()) { localWrite([...localRead<Order>(), o]); return o; }
  const sql = await db();
  await sql`insert into rq_orders (id, token, business, headline, thanks, review_url, design, email)
            values (${o.id}, ${o.token}, ${o.business}, ${o.headline}, ${o.thanks}, ${o.review_url}, ${o.design}, ${o.email})`;
  return o;
}

async function one(where: 'id' | 'token' | 'stripe_session_id', value: string): Promise<Order | null> {
  if (!value) return null;
  if (!hasDb()) return localRead<Order>().find((o) => o[where] === value) ?? null;
  const sql = await db();
  const rows = await sql<Order[]>`select * from rq_orders where ${sql(where)} = ${value} limit 1`;
  return rows[0] ?? null;
}

export const getOrder = (id: string) => one('id', id);
export const getOrderByToken = (t: string) => one('token', t);
export const getOrderBySession = (s: string) => one('stripe_session_id', s);

async function update(id: string, patch: Partial<Order>) {
  if (!hasDb()) {
    const rows = localRead<Order>();
    const i = rows.findIndex((o) => o.id === id);
    if (i >= 0) { rows[i] = { ...rows[i], ...patch }; localWrite(rows); }
    return;
  }
  const sql = await db();
  await sql`update rq_orders set ${sql(patch as Record<string, unknown>)} where id = ${id}`;
}

export async function editOrder(o: Order, input: SignInput) {
  await update(o.id, { business: input.business, headline: input.headline, thanks: input.thanks, review_url: input.url, design: input.design, edits: o.edits + 1 });
}

export const setSession = (id: string, sessionId: string) => update(id, { stripe_session_id: sessionId });
export const markEmailed = (id: string) => update(id, { emailed_at: now() });

/**
 * Pending → paid, exactly once. Returns the order only to the caller that made the change,
 * so the webhook and the thank-you page can both try without sending two emails.
 */
export async function markPaid(id: string, amountCents: number): Promise<Order | null> {
  if (!hasDb()) {
    const rows = localRead<Order>();
    const o = rows.find((r) => r.id === id && r.status === 'pending');
    if (!o) return null;
    Object.assign(o, { status: 'paid', paid_at: now(), amount_cents: amountCents });
    localWrite(rows);
    return o;
  }
  const sql = await db();
  const rows = await sql<Order[]>`
    update rq_orders set status = 'paid', paid_at = now(), amount_cents = ${amountCents}
    where id = ${id} and status = 'pending' returning *`;
  return rows[0] ?? null;
}

/** Turn downloads off (admin, refunds) or back on. */
export async function setStatus(id: string, status: 'paid' | 'disabled') {
  if (!hasDb()) return update(id, { status });
  const sql = await db();
  if (status === 'paid') await sql`update rq_orders set status = 'paid' where id = ${id} and status = 'disabled'`;
  else await sql`update rq_orders set status = 'disabled' where id = ${id} and status = 'paid'`;
}

export async function countDownload(id: string) {
  if (!hasDb()) {
    const o = await getOrder(id);
    if (o) await update(id, { downloads: o.downloads + 1 });
    return;
  }
  const sql = await db();
  await sql`update rq_orders set downloads = downloads + 1 where id = ${id}`;
}

/** Abandoned checkouts are deleted after three days. */
export async function prunePending() {
  if (!hasDb()) return 0;
  const sql = await db();
  const rows = await sql`delete from rq_orders where status = 'pending' and created_at < now() - interval '3 days' returning id`;
  return rows.length;
}
