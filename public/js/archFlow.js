/* Architecture flow diagram scroll animations */
(function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.arch-card').forEach((card) => {
        const nodes = card.querySelectorAll('.arch-flow-node');
        const arrows = card.querySelectorAll('.arch-flow-arrow');

        gsap.set(nodes, { autoAlpha: 0, y: 16, filter: 'blur(6px)' });
        gsap.set(arrows, { scaleY: 0, autoAlpha: 0, transformOrigin: 'center top' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
            },
        });

        nodes.forEach((node, i) => {
            tl.to(node, {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.45,
                ease: 'power3.out',
            }, i * 0.12);
            if (arrows[i]) {
                tl.to(arrows[i], {
                    scaleY: 1,
                    autoAlpha: 1,
                    duration: 0.25,
                    ease: 'power2.out',
                }, i * 0.12 + 0.08);
            }
        });
    });

    /* GitHub language bars animate on scroll */
    document.querySelectorAll('.github-lang-bar i').forEach((bar) => {
        const target = parseFloat(bar.dataset.width || '0') / 100;
        gsap.fromTo(bar,
            { scaleX: 0 },
            {
                scaleX: target,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar.closest('.github-lang-row'),
                    start: 'top 92%',
                    once: true,
                },
            }
        );
    });
})();
