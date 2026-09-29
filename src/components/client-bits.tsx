'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/** "Use this design" in the gallery: picks the design on the order form and scrolls to it. */
export function UseDesign({ id, label = 'Use this design' }: { id: string; label?: string }) {
  return (
    <a
      className="btn ghost small"
      href={`/?design=${id}#create`}
      onClick={(e) => {
        const form = document.getElementById('create');
        if (!form) return;
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('rq:design', { detail: id }));
        form.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', '#create');
      }}
    >
      {label}
    </a>
  );
}

/**
 * Phones only: a bar that slides up once you scroll past the hero, so ordering is always one tap away.
 * Hidden while the order form is on screen.
 */
export function MobileBuyBar({ title, note, href = '/#create', label = 'Create my sign' }: { title: string; note: string; href?: string; label?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const check = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 200;
      const form = document.getElementById('create');
      const r = form?.getBoundingClientRect();
      const covering = !!r && r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.15;
      setOn(window.scrollY > 560 && !nearEnd && !covering);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, []);
  return (
    <div className={`m-buybar${on ? ' on' : ''}`} aria-hidden={!on}>
      <div><b>{title}</b><small>{note}</small></div>
      <Link className="btn" href={href} tabIndex={on ? 0 : -1}>{label}</Link>
    </div>
  );
}
