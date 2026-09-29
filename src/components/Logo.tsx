// The mark: a QR code corner with a gold review star. Same drawing as src/app/icon.svg.
export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#2E2140" />
      <rect x="10.5" y="10.5" width="21" height="21" rx="6" fill="none" stroke="#fff" strokeWidth="5" />
      <rect x="17" y="17" width="8" height="8" rx="2.2" fill="#fff" />
      <rect x="37" y="10" width="7" height="7" rx="1.6" fill="#fff" />
      <rect x="46" y="17" width="7" height="7" rx="1.6" fill="#fff" />
      <rect x="10" y="37" width="7" height="7" rx="1.6" fill="#fff" />
      <rect x="17" y="46" width="7" height="7" rx="1.6" fill="#fff" />
      <path d="M43 29.5l4.1 8.3 9.2 1.3-6.6 6.5 1.6 9.1L43 50.4l-8.2 4.3 1.6-9.1-6.6-6.5 9.2-1.3z" fill="#FFC857" stroke="#FFC857" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Mark + product name, with "myQR" small underneath to tie the family of sites together. */
export function Logo({ product, brand, size = 38 }: { product: string; brand: string; size?: number }) {
  return (
    <>
      <LogoMark size={size} />
      <span className="wordmark"><span>{product}</span><small>{brand}</small></span>
    </>
  );
}
