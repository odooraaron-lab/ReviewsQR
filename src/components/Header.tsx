'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

const LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#designs', label: 'Designs' },
  { href: '/for', label: 'Who it’s for' },
  { href: '/blog', label: 'Guides' },
  { href: '/#questions', label: 'FAQ' },
];

export function Header({ product, brand, announce }: { product: string; brand: string; announce: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="announce">{announce}</div>
      <header className={`site-head${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap head-in">
          <Link href="/" className="logo" aria-label={`${product} home`}><Logo product={product} brand={brand} /></Link>
          <nav className="site-nav" aria-label="Main">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname !== '/' && l.href === pathname ? 'page' : undefined}>{l.label}</Link>
            ))}
          </nav>
          <Link href="/#create" className="btn small head-cta">Create my sign</Link>
          <button ref={btn} className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          <div className="wrap">
            <nav aria-label="Mobile">
              {LINKS.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
            </nav>
            <Link href="/#create" className="btn" onClick={() => setOpen(false)}>Create my sign</Link>
          </div>
        </div>
      </header>
    </>
  );
}
