import { rateLimited } from '@/lib/guard';

export const runtime = 'nodejs';

/**
 * Optional "Find my business" search on the order form, using the Google Places API (New).
 * Turned on by setting GOOGLE_PLACES_API_KEY. Returns each match with its direct review link.
 */
export async function GET(req: Request) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return Response.json({ error: 'Search is off.' }, { status: 404 });
  if (rateLimited(req, 'places', 25)) return Response.json({ error: 'Too many searches. Paste your link instead, or try again later.' }, { status: 429 });
  const q = (new URL(req.url).searchParams.get('q') || '').trim().slice(0, 120);
  if (q.length < 3) return Response.json({ results: [] });

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress' },
    body: JSON.stringify({ textQuery: q, regionCode: 'NZ', languageCode: 'en', pageSize: 5 }),
    cache: 'no-store',
  }).catch(() => null);
  if (!res?.ok) return Response.json({ error: 'Search isn’t working right now. Paste your link instead.' }, { status: 502 });
  const data = (await res.json()) as { places?: { id: string; displayName?: { text: string }; formattedAddress?: string }[] };
  return Response.json({
    results: (data.places || []).map((p) => ({
      name: p.displayName?.text || 'Unnamed place',
      address: p.formattedAddress || '',
      url: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(p.id)}`,
    })),
  });
}
