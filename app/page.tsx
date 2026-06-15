import type { Metadata } from 'next';
import '@/styles/css/v2.css';
import '@/styles/css/phase4.css';
import { sbFetch, sbSetting, sbAsset } from '@/lib/supabase';
import { ASSET_VERSION } from '@/lib/version';
import { SITE, TECH_MARQUEE } from '@/lib/site';
import { fetchGitHubStats, GITHUB_FALLBACK } from '@/lib/github';
import {
  PROJECTS,
  TIMELINE,
  CURRENTLY_BUILDING,
  getFeaturedProject,
  getMajorProjects,
} from '@/lib/projects';
import Scripts from './Scripts';
import Loader from './components/Loader';
import Chrome from './components/Chrome';

export const revalidate = 120;

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
  title: `${SITE.name} — AI Engineer & Machine Learning Developer`,
  description: SITE.description,
  keywords: [...SITE.keywords],
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: `${SITE.name} — AI Engineer & Machine Learning Developer`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — AI Engineer`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

type Social = { label: string; url: string };
type Stat = {
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
  link_text: string;
  link: string;
};

function navHref(link: string): { href: string; external: boolean } {
  const external = /^https?:\/\//.test(link);
  return { href: external ? link : link.startsWith('#') ? link : '/' + link.replace(/^\/+/, ''), external };
}

const SKILL_CATEGORIES: { title: string; items: string[] }[] = [
  { title: 'AI & Machine Learning', items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'OpenCV'] },
  { title: 'Generative AI', items: ['LLMs', 'RAG', 'LangChain', 'Vector Databases'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend', items: ['FastAPI', 'Flask', 'Node.js'] },
  { title: 'Cloud & Tools', items: ['AWS', 'Docker', 'Git', 'GitHub'] },
];

const DEFAULT_STATS: Stat[] = [
  { value: 5, suffix: '+', label: 'AI Projects Built', link_text: 'View Projects', link: 'projects' },
  { value: 3, suffix: '+', label: 'Years of Coding', link_text: 'My Journey', link: '#experience' },
  { display: 'ML · DL · Gen AI', label: 'Core Expertise', link_text: 'Explore Skills', link: '#about' },
];

export default async function Home() {
  let socials = await sbFetch<Social>('social_links', 'select=*&visible=eq.true&order=sort');
  if (!socials) {
    socials = [
      { label: 'git', url: SITE.github },
      { label: 'in', url: SITE.linkedin },
    ];
  }

  let resumeUrl = await sbSetting<string>('resume_url', SITE.resume.replace(/^\//, ''));
  if (typeof resumeUrl !== 'string') resumeUrl = SITE.resume.replace(/^\//, '');

  let contactEmail = await sbSetting<string>('contact_email', SITE.email);
  if (typeof contactEmail !== 'string' || !contactEmail) contactEmail = SITE.email;

  const heroCfg = (await sbSetting<any>('hero', {})) || {};
  const heroT1 = heroCfg.title_1 ?? 'Manikanta';
  const heroT2 = heroCfg.title_2 ?? 'Ramineni';
  const heroEyebrow = heroCfg.eyebrow ?? 'AI Engineer · Machine Learning Developer · Full-Stack Builder';
  const heroCopy =
    heroCfg.copy ??
    'Building intelligent systems that solve real-world problems — from deep learning pipelines to generative AI products and scalable software platforms.';

  let stats = await sbSetting<Stat[] | null>('stats', null);
  if (!Array.isArray(stats) || !stats.length) stats = DEFAULT_STATS;

  const featured = PROJECTS;
  const featuredProject = getFeaturedProject();
  const majorProjects = getMajorProjects();
  const github = (await fetchGitHubStats()) ?? GITHUB_FALLBACK;
  const projectsJson = JSON.stringify(PROJECTS).replace(/</g, '\\u003c');

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.body.classList.add('is-loading');document.body.dataset.loader='full';" }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__PROJECTS__=${projectsJson};` }} />

      <Loader />
      <Chrome />

      <div className="page">
        {/* ===================== HERO ===================== */}
        <section id="home" className="hero" data-nav-section>
          <header className="site-header">
            <a className="brand" href="/"><img src="/assets/logo.svg" alt="mani logo" /></a>
            <nav>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#experience">Journey</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </nav>
            <div className="header-flag"><img src="/assets/india.svg" alt="Made in India" /></div>
          </header>

          <div className="hero-ghost" aria-hidden="true">manikanta — manikanta</div>

          <div className="hero-inner">
            <div className="hero-left">
              <p className="hero-eyebrow mono">{heroEyebrow}</p>

              <h1 className="hero-title">
                <span className="line"><span className="word">{heroT1}</span></span>
                <span className="line"><span className="word">{heroT2}</span></span>
              </h1>

              <svg className="hero-swoosh" viewBox="0 0 420 40" aria-hidden="true">
                <path d="M6 30 C 110 6, 240 6, 300 22 S 400 30, 414 14" />
              </svg>

              <p className="hero-copy">
                {String(heroCopy).split('\n').map((part, i, arr) => (
                  <span key={i}>{part}{i < arr.length - 1 ? <br /> : null}</span>
                ))}
              </p>

              <div className="social-row">
                {socials.map((so, i) => (
                  <a key={i} href={so.url} target="_blank" rel="noopener noreferrer" className="social-icon">{so.label}</a>
                ))}
              </div>

              <div className="cta-row">
                <a href="/projects" className="btn-pill cta-secondary">View Projects <span className="arr">→</span></a>
                <a href={sbAsset(resumeUrl)} target="_blank" className="resume-btn" data-resume-link data-no-transition>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L7 11H10V4H14V11H17L12 16ZM6 18V20H18V18H6Z" fill="currentColor" />
                  </svg>
                  Download Resume
                </a>
              </div>

              <div className="stats">
                {stats.map((st, i) => {
                  const { href, external } = navHref(st.link);
                  return (
                    <div className="stat-item" key={i}>
                      {st.display ? (
                        <h2 className="stat-text">{st.display}</h2>
                      ) : (
                        <h2>
                          <span className="plus">+</span>
                          <span className="count" data-target={Math.trunc(st.value ?? 0)}>{Math.trunc(st.value ?? 0)}</span>
                          {st.suffix ?? ''}
                        </h2>
                      )}
                      <p>
                        {st.label}
                        <br />
                        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{st.link_text}</a>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hero-right">
              <div className="portrait-card">
                <img src="/assets/vee-img.webp" alt="Manikanta Ramineni — AI Engineer" fetchPriority="high" decoding="async" />
                <span className="portrait-badge">mani<span className="amber">.</span> — CBIT · Hyderabad</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== EXPERIENCE TIMELINE ===================== */}
        <section id="experience" className="exp-timeline" data-nav-section>
          <div className="section-head on-dark">
            <div>
              <p className="section-kicker"><span className="idx">01</span> journey</p>
              <h2 className="section-title">
                <span className="word">building</span> <span className="word amber">intelligence</span>
                <span className="word">over</span> <span className="word">time<span className="amber">.</span></span>
              </h2>
            </div>
            <p className="section-note">from computer vision experiments to enterprise AI systems.</p>
          </div>

          <div className="exp-track">
            {TIMELINE.map((ev) => (
              <article className="exp-item" key={ev.id}>
                <p className="exp-year">{ev.year}</p>
                <h3 className="exp-title">{ev.title}</h3>
                <button type="button" className="exp-link" data-project-id={ev.id}>view project details →</button>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== TECH STACK MARQUEE ===================== */}
        <section id="stack" className="tech-marquee" data-nav-section>
          <div className="tech-marquee-head section-head">
            <div>
              <p className="section-kicker"><span className="idx">02</span> toolkit</p>
              <h2 className="section-title">
                <span className="word">the</span> <span className="word amber">stack</span>
                <span className="word">behind</span> <span className="word">the</span>
                <span className="word">systems<span className="amber">.</span></span>
              </h2>
            </div>
            <p className="section-note">languages, frameworks, and infrastructure I build with daily.</p>
          </div>

          <div className="tech-marquee-inner" aria-hidden="true">
            {[0, 1].map((rep) => (
              <div className="tech-marquee-set" key={rep}>
                {TECH_MARQUEE.map((tech) => (
                  <span className="tech-chip" key={`${rep}-${tech}`}>{tech}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ===================== FEATURED SPOTLIGHT ===================== */}
        <section id="spotlight" className="featured-spotlight" data-nav-section>
          <div className="section-head">
            <div>
              <p className="section-kicker"><span className="idx">03</span> flagship system</p>
              <h2 className="section-title">
                <span className="word">featured</span> <span className="word amber">project</span>
              </h2>
            </div>
            <p className="section-note">the system that defines my approach to enterprise AI.</p>
          </div>

          <article className="featured-spotlight-card">
            <div className="featured-spotlight-content">
              <p className="featured-spotlight-badge mono">Enterprise AI · {featuredProject.year}</p>
              <h3 className="featured-spotlight-title">{featuredProject.title}</h3>
              <p className="featured-spotlight-desc" dangerouslySetInnerHTML={{ __html: featuredProject.desc }} />
              <div className="featured-spotlight-highlights">
                {(featuredProject.highlights ?? []).map((h) => (
                  <span className="featured-highlight" key={h}>{h}</span>
                ))}
              </div>
              <div className="featured-spotlight-actions">
                <button type="button" className="btn-pill" data-project-id={featuredProject.id}>
                  view case study <span className="arr">→</span>
                </button>
                {featuredProject.github ? (
                  <a href={featuredProject.github} target="_blank" rel="noopener noreferrer" className="btn-pill cta-secondary" data-no-transition>
                    view on github <span className="arr">→</span>
                  </a>
                ) : null}
              </div>
            </div>
            <div className="featured-spotlight-visual">
              <img src={featuredProject.img} alt={featuredProject.title} loading="lazy" decoding="async" />
            </div>
          </article>
        </section>

        {/* ===================== PROJECT SCREENSHOTS ===================== */}
        <section id="systems">
          <div className="section-head">
            <div>
              <p className="section-kicker"><span className="idx">04</span> systems built</p>
              <h2 className="section-title">
                <span className="word">AI</span> <span className="word amber">products</span>
                <span className="word">&amp;</span> <span className="word">platforms</span>
              </h2>
            </div>
            <p className="section-note">real projects — ML pipelines, RAG systems, and intelligent applications.</p>
          </div>

          <div className="portfolio">
            <div className="portfolio-grid">
              {PROJECTS.map((p, gi) => (
                <div className={'card' + (gi === PROJECTS.length - 1 ? ' last-card' : '')} key={p.id}>
                  <img src={p.img} alt={p.title} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
            <h2 className="portfolio-title">systems</h2>
          </div>
        </section>

        <div className="band band-dark" aria-hidden="true">
          <div className="band-track">
            <span className="band-chunk">
              intelligent <span className="dot"></span> <span className="o">systems</span> <span className="dot"></span>
              machine <span className="dot"></span> <span className="o">learning</span> <span className="dot"></span>
              generative <span className="dot"></span> <span className="o">AI</span> <span className="dot"></span>
              intelligent <span className="dot"></span> <span className="o">systems</span> <span className="dot"></span>
            </span>
            <span className="band-chunk">
              intelligent <span className="dot"></span> <span className="o">systems</span> <span className="dot"></span>
              machine <span className="dot"></span> <span className="o">learning</span> <span className="dot"></span>
              generative <span className="dot"></span> <span className="o">AI</span> <span className="dot"></span>
              intelligent <span className="dot"></span> <span className="o">systems</span> <span className="dot"></span>
            </span>
          </div>
        </div>

        {/* ===================== ARCHITECTURE DIAGRAMS ===================== */}
        <section id="architecture" className="arch-section" data-nav-section>
          <div className="section-head on-dark">
            <div>
              <p className="section-kicker"><span className="idx">05</span> system design</p>
              <h2 className="section-title">
                <span className="word">architecture</span> <span className="word amber">flows</span>
              </h2>
            </div>
            <p className="section-note">how data moves from problem to intelligent output.</p>
          </div>

          <div className="arch-grid">
            {majorProjects.map((p) => (
              <article className="arch-card" key={p.id} data-reveal="fade-up">
                <div className="arch-card-head">
                  <p className="arch-card-year">{p.year} · {p.cat_label.replace(/&amp;/g, '&')}</p>
                  <h3 className="arch-card-title">{p.title}</h3>
                </div>
                <div className="arch-flow">
                  {(p.flow ?? []).map((step, i, arr) => (
                    <div key={step.label}>
                      <div className="arch-flow-node">
                        <span className="arch-flow-label">{step.label}</span>
                        {step.detail ? <span className="arch-flow-detail">{step.detail}</span> : null}
                      </div>
                      {i < arr.length - 1 ? <div className="arch-flow-arrow" aria-hidden="true">↓</div> : null}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== FEATURED PROJECTS ===================== */}
        <section id="project" className="project" data-nav-section>
          <div className="section-head">
            <div>
              <p className="section-kicker"><span className="idx">06</span> selected work</p>
              <h2 className="section-title">
                <span className="word">featured</span> <span className="word amber">projects</span>
              </h2>
            </div>
            <p className="section-note">hover for preview — click for full case study.</p>
          </div>

          <div className="preview">
            <div className="preview-img preview-img-1"></div>
            <div className="preview-img preview-img-2"></div>
          </div>
          <div className="menu">
            {featured.map((fp) => (
              <div
                className="menu-item"
                key={fp.id}
                data-project-id={fp.id}
                data-hover-src={sbAsset(fp.hover_src)}
              >
                <div className="info"><p>{fp.info}</p></div>
                <div className="name"><p>{fp.title}</p></div>
                <div className="tag"><p>{fp.tag}</p></div>
              </div>
            ))}
          </div>

          <div className="project-cta">
            <a href="/projects" className="btn-pill">explore all AI projects <span className="arr">→</span></a>
          </div>
        </section>

        <div className="band band-light" aria-hidden="true">
          <div className="band-track">
            <span className="band-chunk">
              let&apos;s build <span className="dot"></span> <span className="o">intelligent products</span> <span className="dot"></span>
              let&apos;s build <span className="dot"></span> <span className="o">intelligent products</span> <span className="dot"></span>
            </span>
            <span className="band-chunk">
              let&apos;s build <span className="dot"></span> <span className="o">intelligent products</span> <span className="dot"></span>
              let&apos;s build <span className="dot"></span> <span className="o">intelligent products</span> <span className="dot"></span>
            </span>
          </div>
        </div>

        {/* ===================== CURRENTLY BUILDING ===================== */}
        <section id="building" className="building-section" data-nav-section>
          <div className="section-head">
            <div>
              <p className="section-kicker"><span className="idx">07</span> in progress</p>
              <h2 className="section-title">
                <span className="word">currently</span> <span className="word amber">building</span>
              </h2>
            </div>
            <p className="section-note">active experiments and systems in development.</p>
          </div>

          <div className="building-list">
            {CURRENTLY_BUILDING.map((item) => (
              <article className="building-item" key={item.title} data-reveal="fade-up">
                <span className="building-pulse" aria-hidden="true" />
                <div>
                  <h3 className="building-title">{item.title}</h3>
                  <p className="building-note">{item.note}</p>
                </div>
                <div className="building-tags">
                  {item.tags.map((tag) => (
                    <span className="building-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===================== GITHUB ACTIVITY ===================== */}
        <section id="github" className="github-section" data-nav-section>
          <div className="section-head">
            <div>
              <p className="section-kicker"><span className="idx">08</span> open source</p>
              <h2 className="section-title">
                <span className="word">github</span> <span className="word amber">activity</span>
              </h2>
            </div>
            <p className="section-note">building in public — repositories, contributions, and languages.</p>
          </div>

          <div className="github-grid">
            <div className="github-stat-card" data-reveal="fade-up">
              <p className="github-stat-value">{github.repos}</p>
              <p className="github-stat-label">Repositories</p>
            </div>
            <div className="github-stat-card" data-reveal="fade-up">
              <p className="github-stat-value">{github.followers}</p>
              <p className="github-stat-label">Followers</p>
            </div>
            <div className="github-lang-card" data-reveal="blur-sharp">
              <h3>Top Languages</h3>
              <div className="github-lang-list">
                {github.languages.map((lang) => (
                  <div className="github-lang-row" key={lang.name}>
                    <span className="github-lang-name">{lang.name}</span>
                    <span className="github-lang-pct">{lang.percent}%</span>
                    <div className="github-lang-bar">
                      <i data-width={lang.percent} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="github-chart-wrap" data-reveal="scale">
              <img
                src={github.chartUrl}
                alt={`GitHub contribution graph for ${github.username}`}
                loading="lazy"
                decoding="async"
                width={800}
                height={120}
              />
            </div>
          </div>

          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="github-profile-link" data-no-transition>
            @{github.username} on github <span className="arr">→</span>
          </a>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section id="contact" className="contact" data-nav-section>
          <div className="section-head on-dark">
            <div>
              <p className="section-kicker"><span className="idx">09</span> connect</p>
              <h2 className="section-title">
                <span className="word">let&apos;s</span> <span className="word">build</span>
                <span className="word">something</span> <span className="word amber">intelligent<span className="coral">.</span></span>
              </h2>
            </div>
            <p className="section-note">open to AI engineering roles, ML projects, and collaborations.</p>
          </div>

          <div className="contact-container">
            <div className="contact-image">
              <img src="/assets/vee.webp" alt="Manikanta Ramineni" loading="lazy" decoding="async" />
            </div>

            <div className="contact-content">
              <p className="contact-tagline" data-reveal="text">Ready to ship intelligent systems together?</p>

              <div className="contact-links">
                <a href={`mailto:${contactEmail}`} className="contact-link-card">
                  <span className="contact-link-icon">@</span>
                  email
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link-card" data-no-transition>
                  <span className="contact-link-icon">in</span>
                  linkedin
                </a>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="contact-link-card" data-no-transition>
                  <span className="contact-link-icon">gh</span>
                  github
                </a>
              </div>

              <h3 className="gmailTxt">or drop a line — <a href={`mailto:${contactEmail}`}>{contactEmail}</a></h3>

              <form id="contactForm">
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" id="name" placeholder=" " required />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-group">
                    <input type="email" id="email" placeholder=" " required />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>

                <div className="selection-group">
                  <label>Category</label>
                  <div className="pills">
                    <button type="button" className="pill-btn active">AI / ML Project</button>
                    <button type="button" className="pill-btn">Full-Stack Development</button>
                    <button type="button" className="pill-btn">Internship / Role</button>
                    <button type="button" className="pill-btn">Research Collaboration</button>
                    <button type="button" className="pill-btn">Other</button>
                  </div>
                </div>

                <div className="form-group message-group">
                  <textarea id="message" placeholder=" " required></textarea>
                  <label htmlFor="message">Your message</label>
                </div>

                <button type="submit" className="submit-btn">send it →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section id="about" className="about" data-nav-section>
          <p className="section-kicker"><span className="idx">10</span> about</p>

          <div className="resume-story">
            <p>
              I&apos;m a 3rd-year AI &amp; Data Science student passionate about building intelligent software systems.
            </p>
            <p>
              My work focuses on machine learning, generative AI, retrieval-augmented generation, and full-stack development.
            </p>
            <p>
              I enjoy transforming complex ideas into practical products that people can use.
            </p>
          </div>

          <h2 className="about-statement">
            <span className="w">I&apos;m</span> <span className="w">a</span>
            <span className="w accent">3rd-year</span> <span className="w accent">AI</span> <span className="w accent">&amp;</span> <span className="w accent">Data</span> <span className="w accent">Science</span>
            <span className="w">student</span> <span className="w">passionate</span> <span className="w">about</span> <span className="w">building</span>
            <span className="w">intelligent</span> <span className="w">products</span> <span className="w">using</span>
            <span className="w highlight">Machine</span> <span className="w highlight">Learning,</span>
            <span className="w highlight">Deep</span> <span className="w highlight">Learning,</span>
            <span className="w highlight">Generative</span> <span className="w highlight">AI,</span>
            <span className="w">and</span> <span className="w highlight">Full-Stack</span> <span className="w highlight">Development.</span>
          </h2>

          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <div className="skills-category" key={cat.title}>
                <p className="skills-category-label mono">{cat.title}</p>
                <div className="skills-pills">
                  {cat.items.map((item) => (
                    <span className="skill-pill" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="about-quote">
            My focus is on creating <span className="highlight">AI-powered</span> applications that solve <span className="accent">real-world</span> problems through data, automation, and scalable software systems.
          </p>
        </section>

        <footer className="site-footer">
          <div className="footer-top">
            <a className="brand" href="/"><img src="/assets/vee-logo-white.svg" alt="mani logo" /></a>
            <nav>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#experience">Journey</a></li>
                <li><a href="#stack">Stack</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </nav>
          </div>

          <div className="footer-giant">
            <span className="row"><span className="ghost">train models<span className="amber">?</span></span></span>
            <span className="row"><span>ship systems<span className="amber">.</span></span></span>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Manikanta Ramineni</span>
            <span>building intelligent systems — solving real problems</span>
            <span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></span>
          </div>
        </footer>
      </div>

      <div id="projectDetailModal" className="project-detail-modal" role="dialog" aria-modal="true" aria-label="Project details">
        <div className="project-detail-panel">
          <button type="button" className="project-detail-close" aria-label="Close">&times;</button>
          <div id="projectDetailBody"></div>
        </div>
      </div>

      <div id="toast-container"></div>

      <Scripts
        src={[
          'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',
          '/js/loader.js',
          '/js/v2.js',
          '/js/projectScript.js',
          '/js/projectDetail.js',
          '/js/archFlow.js',
          '/js/contactScript.js',
        ]}
        version={ASSET_VERSION}
      />
    </>
  );
}
