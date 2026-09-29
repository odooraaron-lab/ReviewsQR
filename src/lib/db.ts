import fs from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';

// Postgres (Neon) in production. Without DATABASE_URL, on your own computer, orders are kept
// in .data/orders.json instead so you can try the whole flow with no setup.

const DDL = `
create table if not exists rq_orders (
  id                text primary key,                 -- short reference, e.g. k7m2p9qx (the admin's "site" slug)
  token             text not null unique,             -- secret, in the customer's download link
  business          text not null,
  headline          text not null default '',
  thanks            text not null default '',
  review_url        text not null,
  design            text not null,
  email             text not null,
  status            text not null default 'pending',  -- pending | paid | disabled
  stripe_session_id text unique,
  amount_cents      int not null default 0,
  created_at        timestamptz not null default now(),
  paid_at           timestamptz,
  emailed_at        timestamptz,
  downloads         int not null default 0,
  edits             int not null default 0            -- free changes within 7 days of paying
);
create index if not exists rq_orders_email_idx on rq_orders (lower(email));
create index if not exists rq_orders_status_idx on rq_orders (status, created_at);
alter table rq_orders add column if not exists edits int not null default 0;
`;

let client: ReturnType<typeof postgres> | null = null;
let ready: Promise<unknown> | null = null;

export const hasDb = () => !!process.env.DATABASE_URL;

export async function db() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    client = postgres(url, { ssl: /localhost|127\.0\.0\.1/.test(url) ? false : 'require', max: 5, prepare: false, idle_timeout: 20 });
  }
  // The table creates itself the first time (keep this in step with sql/schema.sql).
  if (!ready) ready = client.unsafe(DDL).catch((e) => { ready = null; throw e; });
  await ready;
  return client;
}

// ── Local JSON store (development only) ──
const FILE = path.join(process.cwd(), '.data', 'orders.json');
export function localRead<T>(): T[] {
  if (process.env.NODE_ENV === 'production') throw new Error('DATABASE_URL is not set');
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch { return []; }
}
export function localWrite<T>(rows: T[]) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 2));
}
