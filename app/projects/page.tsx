import type { Metadata } from 'next';
import '@/styles/css/v2.css';
import '@/styles/css/projectsPage.css';
import { ASSET_VERSION } from '@/lib/version';
import { SITE } from '@/lib/site';
import { PROJECTS } from '@/lib/projects';
import Scripts from '../Scripts';
import Loader from '../components/Loader';
import Chrome from '../components/Chrome';
import SiteHeader from '../components/SiteHeader';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'AI Projects',
  description:
    'AI and machine learning projects by Manikanta Ramineni — RAG systems, financial intelligence, computer vision, and deep learning applications.',
  alternates: { canonical: `${SITE.url}/projects` },
  openGraph: {
    type: 'website',
    url: `${SITE.url}/projects`,
    title: `AI Projects — ${SITE.name}`,
    description: 'Intelligent systems built with Python, TensorFlow, RAG, and full-stack engineering.',
    images: [SITE.ogImage],
  },
};

const pad2 = (n: number) => String(n).padStart(2, '0');

export default function ProjectsPage() {
  const projects = PROJECTS;
  const counts: Record<string, number> = { all: projects.length, ai: 0, ml: 0, cv: 0 };
  for (const p of projects) counts[p.cat]++;

  const projectsJson = JSON.stringify(PROJECTS).replace(/</g, '\\u003c');

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.body.classList.add('is-loading');" }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__PROJECTS__=${projectsJson};` }} />
      <Loader />
      <Chrome />

      <div className="page">
        <SiteHeader active="projects" base="/" />

        <section className="garage-hero">
          <div className="hero-ghost" aria-hidden="true">AI systems — AI systems</div>
          <h1 className="garage-title">
            <span className="line"><span className="word">AI</span></span>
            <span className="line"><span className="word amp" style={{ color: 'var(--amber)', fontStyle: 'italic' }}>projects</span><span className="word">,</span></span>
            <span className="line"><span className="word">in depth.</span></span>
          </h1>
          <div className="garage-sub">
            <p>
              Machine learning pipelines, generative AI platforms, computer vision systems,
              and full-stack intelligent products — each with architecture, challenges, and results.
            </p>
            <span className="garage-count mono">
              <span className="amber">{pad2(counts.all)}</span> systems — &apos;22 to &apos;26
            </span>
          </div>
        </section>

        <div className="filter-bar">
          <span className="lbl">filter /</span>
          <button className="filter-btn active" data-filter="all">all <span className="n">{counts.all}</span></button>
          <button className="filter-btn" data-filter="ai">generative AI <span className="n">{counts.ai}</span></button>
          <button className="filter-btn" data-filter="ml">machine learning <span className="n">{counts.ml}</span></button>
          <button className="filter-btn" data-filter="cv">computer vision <span className="n">{counts.cv}</span></button>
        </div>

        <div className="cases">
          {projects.map((p, i) => {
            const num = pad2(i + 1);
            return (
              <article className="case" data-cat={p.cat} key={p.id}>
                <span className="case-num">{num}</span>
                <div className="case-media" data-project-id={p.id}>
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <span className="case-chip" dangerouslySetInnerHTML={{ __html: p.cat_label }} />
                </div>
                <div className="case-body">
                  <p className="case-kicker">{num} / {p.cat}</p>
                  <h2 className="case-title">{p.title}</h2>
                  <p className="case-desc" dangerouslySetInnerHTML={{ __html: p.desc }} />
                  <dl className="case-meta">
                    <div><dt>role</dt><dd>{p.role}</dd></div>
                    <div><dt>toolkit</dt><dd>{p.stack}</dd></div>
                    <div><dt>year</dt><dd>{p.year}</dd></div>
                  </dl>
                  <div className="case-actions">
                    <button type="button" className="btn-pill" data-project-id={p.id}>
                      view details <span className="arr">→</span>
                    </button>
                  </div>
                  <div className="case-links">
                    {p.github ? (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" data-no-transition>GitHub →</a>
                    ) : null}
                    {p.demo ? (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" data-no-transition>Live Demo →</a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section className="garage-outro">
          <h2 className="ot">got an AI problem worth<br />solving <span className="amber">together?</span></h2>
          <a href="/#contact" className="btn-pill">let&apos;s build it <span className="arr">→</span></a>
        </section>

        <footer className="site-footer">
          <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
            <span>© 2026 Manikanta Ramineni</span>
            <span>building intelligent systems — solving real problems</span>
            <span><a href="/">back to home →</a></span>
          </div>
        </footer>
      </div>

      <div id="projectDetailModal" className="project-detail-modal" role="dialog" aria-modal="true" aria-label="Project details">
        <div className="project-detail-panel">
          <button type="button" className="project-detail-close" aria-label="Close">&times;</button>
          <div id="projectDetailBody"></div>
        </div>
      </div>

      <Scripts src={['/js/loader.js', '/js/projectsPage.js', '/js/projectDetail.js']} version={ASSET_VERSION} />
    </>
  );
}
