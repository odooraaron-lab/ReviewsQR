import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section narrow center">
      <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)' }}>Page not found</h1>
      <p className="lede" style={{ margin: '0 auto 22px' }}>That page doesn’t exist, but your review sign can in about two minutes.</p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <Link className="btn" href="/#create">Create my sign</Link>
        <Link className="btn ghost" href="/blog">Read the guides</Link>
      </div>
    </section>
  );
}
