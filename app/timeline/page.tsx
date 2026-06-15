import type { Metadata } from 'next';
import '@/styles/css/v2.css';
import '@/styles/css/v2-sub.css';
import '@/styles/css/timelineStyles.css';
import { sbFetch } from '@/lib/supabase';
import { ASSET_VERSION } from '@/lib/version';
import Scripts from '../Scripts';
import SubShell from '../components/SubShell';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Timeline - Veeshal D. Bodosa',
  description:
    'Timeline - Veeshal D. Bodosa - A creative developer and video editor blending code and cinematics to craft immersive digital experiences.',
  alternates: { canonical: 'https://veeshal.me/timeline/' },
  openGraph: {
    type: 'website', url: 'https://veeshal.me/timeline/', title: 'Timeline - Veeshal D. Bodosa',
    description: 'Welcome to a visual journey that blends code & creativity, and every edit tells a story. Engineered with precision & crafted with passion.',
    images: ['https://veeshal.me/assets/vee-og.svg'],
  },
};

type Ev = { title: string; description: string; tag: string; date_label: string; images: string[] | string };

const FALLBACK: Ev[] = [
  { title: 'AI & Innovation at NEGC 2026, USTM', description: 'AI & Innovation... Awarded competition conducted during North East Graduate Congress-2026 held at University of Science & Technology Meghalaya from 26th–28th March, 2026.', tag: 'Winner', date_label: '26-28 Mar 2026', images: ['https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/AI%20%26%20Inno%202026%20-%201st.webp', 'https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/AI%20%26%20Inno%20-%201.webp', 'https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/AI%20%26%20Inno%20-%202.webp'] },
  { title: 'Prajukti 2026 GCU Hackathon', description: 'Prajukti 2026 GCU Hackathon held during GCU Varsity Week: EUPHUISM 2026 (Roots and Resilience) from 11th to 14th March, 2026.', tag: 'Winner', date_label: '11-14 Mar 2026', images: ['https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/Prajukti%202026%20-%201st.webp', 'https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/Prajukti%20-%201.webp', 'https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/Prajukti%20-%202.webp'] },
  { title: 'Codestellation, under CodeWar 7.0 at AEC', description: 'This Hackathon was held by Assam Engineering College (AEC) under CodeWar 7.0 part of Pyrokinesis 2026 organised by Coding Club, AEC named as Codestellation on 26 Feb 2026.', tag: 'First Runner Up', date_label: '26 Feb 2026', images: ['https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/CodeWar%202026%20-%202nd.webp', 'https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/CodeWar%20-%201.webp', 'https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/CodeWar%20-%202.webp'] },
  { title: 'Ideathon — Where Ideas Compile', description: 'First place at the Ideathon competition — a stage where raw ideas meet real execution. Pitched a solution that stood out from the crowd and brought home the win. The beginning of the grind.', tag: 'Winner', date_label: '27 NOV 2024', images: ['https://pub-fe9b85f97c6a4773bbf0ceb5f53c430b.r2.dev/achievement/Idea%20Comp%202024%20-%201st.webp'] },
];

export default async function Timeline() {
  let items = await sbFetch<Ev>('timeline_events', 'select=*&visible=eq.true&order=sort');
  if (!items) items = FALLBACK;

  return (
    <>
      <SubShell active="timeline">
        <div className="timeline-container">
          <div className="timeline-title">
            <div className="code-label">
              <span className="code-fn">console</span><span className="code-dot">.</span><span className="code-method">log</span><span className="code-paren">(</span><span className="code-var">currentLife</span><span className="code-paren">)</span>
            </div>
            <h1>Glory<br />Logged.</h1>
          </div>

          <div className="timeline-progress-wrapper" id="timelineProgressWrapper">
            <svg id="snakeSvg" className="snake-svg" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path id="snakePathBase" className="snake-path-base" fill="none" stroke="#d1d1d1" strokeWidth="4" />
              <path id="snakePathFill" className="snake-path-fill" fill="none" stroke="#F9B646" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <div className="timeline" id="timelineItems">
            {items.map((ev, ti) => {
              const side = ti % 2 === 0 ? 'left' : 'right';
              const imgs: string[] = Array.isArray(ev.images)
                ? ev.images
                : (() => { try { const v = JSON.parse(ev.images as string); return Array.isArray(v) ? v : []; } catch { return []; } })();
              return (
                <div className={`timeline-item ${side}`} data-images={JSON.stringify(imgs)} key={ti}>
                  <div className="timeline-content">
                    <div className="tag-row">
                      <span className="tag">{ev.tag}</span>
                      <span className="date">{ev.date_label}</span>
                    </div>
                    <h2>{ev.title}</h2>
                    <p>{ev.description}</p>
                  </div>
                  <div className="timeline-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  </div>
                  <div className="timeline-image">
                    <div className={'img-slider' + (imgs.length < 2 ? ' single' : '')}>
                      {imgs.map((iu, ii) => (
                        <img src={iu} alt={ev.title} className={'slider-img' + (ii === 0 ? ' active' : '')} key={ii} />
                      ))}
                      <button className="slider-btn slider-prev" aria-label="Previous">&#8249;</button>
                      <button className="slider-btn slider-next" aria-label="Next">&#8250;</button>
                      <div className="slider-dots">
                        {imgs.map((_, ii) => (<span className={'dot' + (ii === 0 ? ' active' : '')} key={ii}></span>))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="timelineModal" className="timeline-modal">
          <div className="timeline-modal-content">
            <span className="close-modal">&times;</span>
            <button className="modal-arrow modal-prev" aria-label="Previous">&#8249;</button>
            <img id="timelinePopupImg" alt="Fullscreen Certificate" />
            <button className="modal-arrow modal-next" aria-label="Next">&#8250;</button>
            <div className="modal-dots" id="modalDots"></div>
          </div>
        </div>
      </SubShell>

      <Scripts src={['/js/loader.js', '/js/subpage.js', '/js/timelineScript.js']} version={ASSET_VERSION} />
    </>
  );
}
