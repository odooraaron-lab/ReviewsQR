-- Review QR tables. The app creates this by itself on first use, so running it is optional.
-- Prefixed rq_ so it can share the Neon database with the other myQR apps. Safe to re-run.

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
