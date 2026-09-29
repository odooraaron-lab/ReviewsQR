import type { DesignId } from './designs';

// The sample signs on the website. Their QR codes point back to this site.
export const EXAMPLES: Record<DesignId, { business: string; headline: string; thanks: string }> = {
  midnight: { business: 'The Grand Oak Bistro', headline: 'Enjoyed your meal?', thanks: 'Thank you for dining with us!' },
  cafe: { business: 'Harbour Street Café', headline: 'Enjoyed your coffee?', thanks: 'Ngā mihi, thank you!' },
  sunset: { business: 'Glow Beauty Studio', headline: 'Loved your visit?', thanks: 'Thanks for supporting local!' },
  minimal: { business: 'Summit Physio', headline: 'How did we do?', thanks: 'We read every review. Thank you!' },
  fern: { business: 'Kauri Ridge Lodge', headline: 'Loved your stay?', thanks: 'Ngā mihi, thank you!' },
  chalk: { business: 'The Daily Grind', headline: 'Tell us what you think!', thanks: 'Thank you for your support!' },
};
