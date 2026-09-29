import { APP_URL, APP_HOST, BRAND, PRODUCT, SUPPORT_EMAIL, SIGNAGE_URL } from './config';
import { escapeHtml } from './guard';
import { getDesign } from './designs';
import { renderPack, fileSlug, FILES } from './pack';
import { signInput, type Order } from './orders';

type Attachment = { filename: string; content: Buffer };

/** Sends through Resend. With no RESEND_API_KEY the email is printed to the server log instead. */
export async function sendEmail(o: { to: string; subject: string; html: string; text: string; attachments?: Attachment[]; idempotencyKey?: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`\n[email not sent: RESEND_API_KEY missing] to=${o.to} subject=${o.subject}\n${o.text}\n(attachments: ${(o.attachments || []).map((a) => `${a.filename} ${Math.round(a.content.length / 1024)}KB`).join(', ') || 'none'})\n`);
    return true;
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...(o.idempotencyKey ? { 'Idempotency-Key': o.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || `${PRODUCT} <hello@myqr.co.nz>`,
      to: o.to,
      subject: o.subject,
      html: o.html,
      text: o.text,
      reply_to: SUPPORT_EMAIL || undefined,
      attachments: o.attachments?.map((a) => ({ filename: a.filename, content: a.content.toString('base64') })),
    }),
  });
  if (!res.ok) console.error('email failed', res.status, await res.text().catch(() => ''));
  return res.ok;
}

export const orderLink = (o: Order) => `${APP_URL}/order/${o.token}`;

/** The "here's your sign" email, with the print pack attached and a link to every other file. */
export async function sendOrderEmail(o: Order, resend = false) {
  const link = orderLink(o);
  const design = getDesign(o.design);
  const pdf = await renderPack(signInput(o));
  const name = escapeHtml(o.business);
  const subject = `Your Google review sign for ${o.business} is ready`;

  const text = `Kia ora,

Thanks for your order. Your Google review QR sign for ${o.business} (${design.name} design) is attached as a print-ready PDF.

Download everything again any time (keep this link):
${link}

What's in your pack
- Print pack (PDF, attached): A4 poster, 2 × A5 table signs, 4 × A6 counter cards, and the QR code on its own
- TV slide (1920 × 1080 PNG) for TVs and digital signage
- Sign image (PNG) for socials, emails and your website
- QR code on its own (PNG and SVG) for menus and your own designs

Printing tips
- Print at 100% / "actual size" on A4. Thick matte paper or card looks best.
- Any home printer works. Print shops (Warehouse Stationery, Officeworks and local printers) can print and laminate it for a few dollars.
- Before you put it up, scan it with your own phone to check it opens your Google review page.

Put it on your TV too
Upload the TV slide to ${SIGNAGE_URL.replace('https://', '')} and show it on every screen in your venue, alongside your specials.

The code links to: ${o.review_url}
Order reference: ${o.id}

Questions? Just reply to this email.

${PRODUCT} by ${BRAND} · ${APP_HOST}`;

  const li = (s: string) => `<li style="margin:0 0 6px">${s}</li>`;
  const html = `<!doctype html><html><body style="margin:0;background:#F4F8FE;font-family:Nunito,Segoe UI,Helvetica,Arial,sans-serif;color:#2E2140">
<div style="max-width:560px;margin:0 auto;padding:28px 18px">
  <p style="font-size:14px;font-weight:800;color:#C23A64;margin:0 0 12px">${PRODUCT} by ${BRAND}</p>
  <div style="background:#fff;border:1px solid #D6E1F2;border-radius:20px;padding:26px">
    <h1 style="font-size:26px;line-height:1.15;margin:0 0 12px">Your review sign for ${name} is ready</h1>
    <p style="font-size:16px;line-height:1.55;margin:0 0 18px">Thanks for your order. Your <b>${escapeHtml(design.name)}</b> sign is attached as a print-ready PDF. Everything else is one tap away:</p>
    <p style="margin:0 0 22px"><a href="${link}" style="display:inline-block;background:#C23A64;color:#fff;text-decoration:none;font-weight:800;border-radius:999px;padding:14px 26px">Open your downloads</a></p>
    <h2 style="font-size:18px;margin:0 0 8px">What's in your pack</h2>
    <ul style="padding-left:20px;margin:0 0 18px;font-size:15px;line-height:1.5">
      ${li(`<b>${FILES.pack.label}</b> (attached): ${FILES.pack.note}`)}
      ${li(`<b>${FILES.tv.label}</b>: ${FILES.tv.note}`)}
      ${li(`<b>${FILES.sign.label}</b>: ${FILES.sign.note}`)}
      ${li(`<b>QR code on its own</b> (PNG and SVG) for menus and your own designs`)}
    </ul>
    <h2 style="font-size:18px;margin:0 0 8px">Printing tips</h2>
    <ul style="padding-left:20px;margin:0 0 18px;font-size:15px;line-height:1.5">
      ${li('Print at 100% (actual size) on A4. Thick matte paper or card looks best.')}
      ${li('Any home printer works, or a print shop can print and laminate it for a few dollars.')}
      ${li('Scan it with your own phone before you put it up.')}
    </ul>
    <div style="background:#FFF4D6;border-radius:14px;padding:14px 16px;font-size:15px;line-height:1.5">
      <b>Put it on your TV too.</b> Upload the TV slide to <a href="${SIGNAGE_URL}" style="color:#A12F53">myQR Digital Signage</a> and show it on every screen in your venue, next to your specials.
    </div>
  </div>
  <p style="font-size:13px;color:#5E4C70;line-height:1.5;margin:16px 4px 0">The code links to: ${escapeHtml(o.review_url)}<br>Order reference: ${o.id}<br>Questions? Just reply to this email.</p>
</div></body></html>`;

  return sendEmail({
    to: o.email,
    subject: resend ? `${subject} (resent)` : subject,
    html,
    text,
    attachments: [{ filename: FILES.pack.name(fileSlug(o.business)), content: pdf }],
    idempotencyKey: resend ? undefined : `rq-order-${o.id}`,
  });
}
