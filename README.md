# myQR Review QR

Google review QR code signs, ready to print. A business pastes its Google review link, picks one of
six designs, pays **$5.99 NZD** (no sign-up) and gets a print-ready PDF and TV slide straight away,
plus a copy by email. Live at `reviews.myqr.co.nz`.

## How it works

1. **Order form** (home page `#create`, and every `/for/<industry>` page): business name, review link,
   design, headline, sign-off, email. The live preview (`/api/preview`) is drawn by the real renderer,
   watermarked, with a **real, scannable QR code** so people can test their link before paying.
2. **Pay:** `/api/checkout` saves a pending order and opens Stripe Checkout
   (`metadata: { product: 'reviews', site_slug: <order id> }`).
3. **Fulfil:** Stripe calls `/api/stripe/webhook` → the order is marked paid, the print pack is emailed
   (PDF attached) and the order is reported to the admin. The thank-you page (`/done`) does the same as
   a backup, so it doesn't matter which arrives first: only one email is ever sent.
4. **Download page** `/order/<secret token>` (linked in the email, never indexed): every file, printing
   tips, the Digital Signage cross-sell, and **free changes for 7 days** (wording, design or link).

Nothing is stored except the order details: every file is drawn fresh when it's downloaded.

## What the customer gets

| File | What |
| --- | --- |
| Print pack (PDF) | A4 poster · 2 × A5 table signs (one A4 sheet) · 4 × A6 counter cards (one A4 sheet) · the QR code on its own with print notes. All vector. |
| TV slide (PNG) | 1920 × 1080, for TVs and myQR Digital Signage |
| Sign image (PNG) | The A4 sign at 300 dpi, for socials, emails and websites |
| QR code (PNG + SVG) | Just the code, for menus, invoices and designers |

The QR codes are **static**: they contain the Google link itself, so they never expire and never
depend on this site.

## Where things live

| What | File |
| --- | --- |
| The six designs (colours, fonts, background art) | `src/lib/designs.ts` |
| Sign layout (portrait A-series + 16:9 TV) | `src/lib/sign.ts` |
| QR code drawing (rounded "eyes", error correction Q) | `src/lib/qr.ts` |
| Text → vector outlines (fonts in `/fonts`, SIL OFL) | `src/lib/fonts.ts` |
| PDF pack, PNGs, file names | `src/lib/pack.ts` |
| Headlines and sign-offs on the form | `src/lib/options.ts` |
| Price, brand, product code | `src/lib/config.ts` + env |
| Orders (Postgres, or `.data/orders.json` locally) | `src/lib/orders.ts`, `src/lib/db.ts`, `sql/schema.sql` |
| Order email | `src/lib/email.ts` |
| Industry landing pages (10) | `src/lib/industries.ts` → `/for/<slug>` |
| Blog / guides (11) | `src/lib/blog.ts` → `/blog/<slug>` |
| Sample signs on the site | `src/lib/examples.ts` → `/examples/<design>.svg`, `-tv.svg`, `.png` (built at deploy) |
| Icons | `src/components/Icon.tsx`, `src/app/icon.svg` (`node scripts/make-icons.mjs` redraws the favicons) |

**Add a design:** add an entry to `DESIGNS` in `src/lib/designs.ts` (and `EXAMPLES` in
`src/lib/examples.ts`). Keep QR colours dark on a light card. Use plain shapes, paths and gradients
only (no filters, masks or patterns: the PDF converter ignores them). Scan the result with a phone.

## Run it on your computer

```
npm install
npm run dev
```
Open http://localhost:3000. With no Stripe key, **Pay** skips payment and takes you straight to the
download page, and emails are printed in the terminal. Orders are saved in `.data/orders.json`.

## Deploy (about 20 minutes)

Same pattern as the other myQR sites (see Admin-Portal `NEW-SITE-PLAYBOOK.md`).

1. **Vercel:** Add New → Project → import `ReviewsQR` (Pro team). Framework: Next.js, defaults.
2. **Domain:** add `reviews.myqr.co.nz` (DNS is already on Vercel). No wildcard needed.
3. **Database:** Storage → connect the existing Neon database (adds `DATABASE_URL`). The `rq_orders`
   table creates itself on first use (or run `sql/schema.sql`).
4. **Environment variables:** everything in `.env.example`. Tick **Sensitive** for secrets.
   Put Stripe **sandbox** keys in Preview and live keys in Production.
5. **Stripe:** Webhooks → Add destination → `https://reviews.myqr.co.nz/api/stripe/webhook` with
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `charge.refunded`.
   Copy the `whsec_…` into `STRIPE_WEBHOOK_SECRET`. Payment methods (Apple Pay, Google Pay, Link) are
   switched on in the Stripe dashboard. Promotion codes work at checkout.
   The admin's own webhook needs no change: it files these orders under `reviews` from the metadata.
6. **Resend:** same account and domain as the other sites; set `RESEND_API_KEY` and `FROM_EMAIL`.
7. **Admin:** admin.myqr.co.nz → Products → Add product: code `reviews`, name Review QR, app address
   `https://reviews.myqr.co.nz`, pricing one-time. Copy its secret into `HQ_SECRET`. Each order appears
   under Sites (the "site" is the order), with Turn off / Turn on / Resend email. Refunds turn downloads off.
8. **Cron:** set `CRON_SECRET`. `vercel.json` runs `/api/cron/prune` daily to delete unpaid checkouts.
9. **Test:** on a Preview deploy, buy with `4242 4242 4242 4242`, check the email, download every file,
   scan the printed sign. Then buy once on Production with a real card and refund it.
10. **Search:** Google Search Console → add `reviews.myqr.co.nz` → submit `/sitemap.xml`.

**Optional:** `GOOGLE_PLACES_API_KEY` (Places API (New)) adds a "Find your business" search that fills in
the review link. It costs a little per search, so it's rate-limited per visitor.

## SEO built in

- Every page has its own title, description, canonical link and share image (`/opengraph-image`,
  drawn with the sign renderer).
- Structured data: Organization, WebSite, Product with NZD offer, HowTo, FAQPage, BreadcrumbList,
  BlogPosting.
- `sitemap.xml` (with sample images), `robots.txt` (order pages, API and `/done` are excluded),
  favicons for Google results (`favicon.ico`, `icon1.png`, `apple-icon.png`), web manifest.
- Content: 10 industry pages and 11 guides, all interlinked, each with its own FAQ.
- Fast: static pages, fonts self-hosted by Next, sample images built once at deploy.

## Rules we follow in the copy

- No invented statistics. Where we mention Google's advice, it's paraphrased from Google's own help.
- Google doesn't allow incentives or review gating: every sign asks all customers for an honest review.
- "Not affiliated with Google" is in the footer; Google's logo is never used.
