import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { INDUSTRIES } from '@/lib/industries';
import { POSTS } from '@/lib/blog';
import { DESIGNS } from '@/lib/designs';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly', lastModified: Date = now) =>
    ({ url: `${SITE}${path}`, lastModified, changeFrequency, priority });
  return [
    { ...page('', 1, 'weekly'), images: DESIGNS.map((d) => `${SITE}/examples/${d.id}.png`) },
    page('/for', 0.8),
    ...INDUSTRIES.map((i) => page(`/for/${i.slug}`, 0.8)),
    page('/blog', 0.7, 'weekly'),
    ...POSTS.map((p) => page(`/blog/${p.slug}`, 0.7, 'monthly', new Date(p.date))),
    page('/privacy', 0.2, 'yearly'),
    page('/terms', 0.2, 'yearly'),
  ];
}
