// The site's line icons, drawn for Review QR on a 24px grid (2px strokes, round ends).

const P: Record<string, string> = {
  link: 'M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4l-1.1 1.1M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.1-1.1',
  palette: 'M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.5-1.3-1.7-1.3-3 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.4 17 3 12 3zM7.5 12.5h.01M9 8h.01M14 7h.01M17.5 10h.01',
  download: 'M12 4v11M7 10.5l5 5 5-5M5 20h14',
  printer: 'M7 8V3h10v5M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-5A2.5 2.5 0 0 1 5.5 8h13a2.5 2.5 0 0 1 2.5 2.5v5a1.5 1.5 0 0 1-1.5 1.5H17M7 14h10v7H7z',
  tv: 'M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 14.5zM9 21h6M12 17v4',
  star: 'M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  shield: 'M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6zM9 12l2.2 2.2L15.5 10',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5V12l3 2',
  mail: 'M4 6h16v12H4zM4.5 6.5l7.5 6 7.5-6',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2.5v2.5H14zM17.5 17.5H20V20h-2.5zM14 18.5v1.5M18.5 14H20',
  phone: 'M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3zM11 18h2',
  camera: 'M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2.5h6L16.5 7h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5zM12 10a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z',
  coffee: 'M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M7.5 3.5c-.8 1 .8 1.8 0 3M11.5 3.5c-.8 1 .8 1.8 0 3M3 21h14',
  utensils: 'M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v5M17 21V3c-2.2 1.3-3 3.8-3 7v3h3',
  beer: 'M6 8h10v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM16 10h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M6 8a2.5 2.5 0 0 1 1-5 3 3 0 0 1 5 0 2.5 2.5 0 0 1 4 2.5V8M9.5 12v5M12.5 12v5',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.2 7.8L20 19M8.2 16.2L20 5',
  bag: 'M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9zM9 8V6.5a3 3 0 0 1 6 0V8',
  wrench: 'M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 1 5-5L19 6l-1 2-2 1z',
  bed: 'M3 19V6M3 14h18v5M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5M7 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  heart: 'M12 20s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.6-7.5 10-7.5 10zM8.5 12h2l1-2 1.5 4 1-2h1.5',
  dumbbell: 'M3.5 10v4M6.5 7.5v9M17.5 7.5v9M20.5 10v4M6.5 12h11',
  mountain: 'M3 19l6.5-11 4 6.5 2.5-3.5 5 8zM13.5 14.5l-2 2.5',
  receipt: 'M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21zM9 8h6M9 12h6M9 16h3',
  window: 'M4 4h16v16H4zM4 10h16M10 10v10',
  table: 'M3 9h18M5 9v11M19 9v11M8 9V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V9',
  menu: 'M6 3h12v18H6zM9 7.5h6M9 11h6M9 14.5h4',
  card: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM7 10h5M7 14h3M15 10h2.5v4H15z',
  sparkle: 'M12 3c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7zM19 16c.2 1.4.8 2 2 2.2-1.2.2-1.8.8-2 2.2-.2-1.4-.8-2-2-2.2 1.2-.2 1.8-.8 2-2.2z',
  bolt: 'M13 3L5 13.5h6L10 21l8-10.5h-6z',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  infinity: 'M7 9a3 3 0 1 0 0 6c2.5 0 3.5-2 5-3s2.5-3 5-3a3 3 0 1 1 0 6c-2.5 0-3.5-2-5-3s-2.5-3-5-3z',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM15.5 15.5L20 20',
  chat: 'M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18.5 14.5a6.5 6.5 0 0 1 3 5.5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  sticker: 'M5 4h14v9l-7 7H5zM12 20v-5.5a1.5 1.5 0 0 1 1.5-1.5H19',
  tag: 'M3.5 12.5V4h8.5l8.5 8.5-8 8zM8 8h.01',
};

export type IconName = keyof typeof P;

export function Icon({ name, size = 24, className, fill = false, stroke = 2 }: { name: string; size?: number; className?: string; fill?: boolean; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d={P[name] ?? P.star} />
    </svg>
  );
}

export function Stars({ size = 18, color = '#F5B301' }: { size?: number; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={size} fill stroke={1.5} />)}
    </span>
  );
}
