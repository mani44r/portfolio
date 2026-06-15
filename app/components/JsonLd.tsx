import { SITE } from '@/lib/site';

/** JSON-LD structured data for search engines. */
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    jobTitle: 'AI Engineer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Chaitanya Bharathi Institute of Technology',
    },
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Generative AI',
      'Full Stack Development',
      'Retrieval-Augmented Generation',
    ],
    sameAs: [SITE.github, SITE.linkedin],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
