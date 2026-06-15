import type { Metadata } from 'next';
import '@/styles/css/v2.css';
import '@/styles/css/v2-sub.css';
import '@/styles/css/chaicodeStyles.css';
import '@/styles/css/singleChaicodeStyles.css';
import { sbFetch, sbAsset } from '@/lib/supabase';
import { ASSET_VERSION } from '@/lib/version';
import Scripts from '../Scripts';
import SubShell from '../components/SubShell';
import fallbackPosts from '@/content/chaicodePosts.json';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'ChaiCode - Veeshal D. Bodosa',
  description:
    'ChaiCode - Veeshal D. Bodosa - A creative developer and video editor blending code and cinematics to craft immersive digital experiences.',
  alternates: { canonical: 'https://veeshal.me/chaicode/' },
  openGraph: {
    type: 'website', url: 'https://veeshal.me/chaicode/', title: 'ChaiCode - Veeshal D. Bodosa',
    description: 'Welcome to a visual journey that blends code & creativity, and every edit tells a story. Engineered with precision & crafted with passion.',
    images: ['https://veeshal.me/assets/vee-og.svg'],
  },
};

export default async function Chaicode({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const sbItems = await sbFetch<any>('chaicode_items', 'select=*&visible=eq.true&order=sort');

  let allPosts = fallbackPosts as any[];
  allPosts = allPosts.map(p => ({
    ...p,
    link: p.link.startsWith('/') || p.link.startsWith('http') ? p.link : '/chaicode/' + p.link
  }));

  if (sbItems) {
    allPosts = sbItems.map((r) => ({
      title: r.title, date: r.date_label, category: r.category,
      image: sbAsset(r.image), link: r.link.startsWith('/') || r.link.startsWith('http') ? r.link : '/chaicode/' + r.link,
    }));
  }

  const categories: string[] = sbItems
    ? Array.from(new Set(sbItems.map((r) => r.category).filter(Boolean)))
    : ['Web Development', 'Software Development', 'Full Stack Development', 'Product management', 'Productivity', 'Design inspiration'];

  return (
    <>
      <SubShell active="chaicode">
        <section className="sub-hero">
          <p className="section-kicker"><span className="idx">//</span> brewed builds</p>
          <h1>chai<span className="amber">code.</span></h1>
          <p className="sub-note">Coding challenges, assignments and experiments — one cup of chai at a time.</p>
        </section>

        <div className="chaicode-container">
          <aside className="chaicode-sidebar">
            <h3 className="chaicode-category-title">Categories</h3>
            <ul className="chaicode-categories">
              <li><a href="/chaicode" className={!category ? 'active' : undefined}>View all</a></li>
              {categories.map((cat) => (
                <li key={cat}>
                  <a href={`?category=${encodeURIComponent(cat)}`} className={category === cat ? 'active' : undefined}>{cat}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="chaicode-content">
            <script dangerouslySetInnerHTML={{ __html: `const allPosts = ${JSON.stringify(allPosts)};` }} />

            <div className="chaicode-content-header">
              <h3 className="recent-posts-title">Recent posts</h3>
              <div className="search-container">
                <input type="text" placeholder="Search" className="search-input" />
              </div>
            </div>

            <div className="posts-grid"></div>

            <div className="pagination-container" style={{ marginTop: 50, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}></div>
          </main>
        </div>
      </SubShell>

      <Scripts src={['/js/loader.js', '/js/subpage.js', '/js/chaicodeScript.js']} version={ASSET_VERSION} />
    </>
  );
}
