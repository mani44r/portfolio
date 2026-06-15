/* ============================================================
   Project detail modal — overview, stack, architecture, etc.
   Reads window.__PROJECTS__ injected by page.tsx / projects page.
   ============================================================ */

(function () {
    const modal = document.getElementById('projectDetailModal');
    const panel = modal?.querySelector('.project-detail-panel');
    const body = document.getElementById('projectDetailBody');
    const closeBtn = modal?.querySelector('.project-detail-close');
    const projects = window.__PROJECTS__ || [];

    if (!modal || !body || !projects.length) return;

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderProject(p) {
        const features = (p.features || []).map((f) => `<li>${f}</li>`).join('');
        const challenges = (p.challenges || []).map((c) => `<li>${c}</li>`).join('');
        const links = [];
        if (p.github) links.push(`<a href="${esc(p.github)}" target="_blank" rel="noopener" class="btn-pill btn-ghost">GitHub Repository <span class="arr">→</span></a>`);
        if (p.demo) links.push(`<a href="${esc(p.demo)}" target="_blank" rel="noopener" class="btn-pill">Live Demo <span class="arr">→</span></a>`);

        body.innerHTML = `
            <p class="project-detail-kicker mono">${esc(p.year)} · ${p.cat_label || p.cat}</p>
            <h2 class="project-detail-title">${esc(p.title)}</h2>
            <p class="project-detail-stack mono">${esc(p.stack)}</p>
            <div class="project-detail-grid">
                <section><h3>Overview</h3><p>${esc(p.overview)}</p></section>
                <section><h3>Problem Statement</h3><p>${esc(p.problem)}</p></section>
                <section><h3>Architecture</h3><p>${esc(p.architecture)}</p></section>
                <section><h3>Key Features</h3><ul>${features}</ul></section>
                <section><h3>Challenges</h3><ul>${challenges}</ul></section>
                <section><h3>Results</h3><p>${esc(p.results)}</p></section>
            </div>
            ${links.length ? `<div class="project-detail-links">${links.join('')}</div>` : ''}
        `;
    }

    function open(id) {
        const p = projects.find((x) => x.id === id);
        if (!p) return;
        renderProject(p);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (typeof gsap !== 'undefined' && panel) {
            gsap.fromTo(panel, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' });
        }
    }

    function close() {
        if (typeof gsap !== 'undefined' && panel) {
            gsap.to(panel, {
                y: 24, autoAlpha: 0, duration: 0.3, ease: 'power2.in',
                onComplete: () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                },
            });
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-project-id]');
        if (!trigger) return;
        if (trigger.hasAttribute('data-url') || trigger.hasAttribute('data-video')) return;
        e.preventDefault();
        open(trigger.getAttribute('data-project-id'));
    });

    closeBtn?.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    window.openProjectDetail = open;
})();
