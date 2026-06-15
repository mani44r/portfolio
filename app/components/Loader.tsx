// Port of partials/loader.php — the pit-lane wheel burst loader (shared).
export default function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-road"></div>
      <div className="loader-streaks" id="loaderStreaks"></div>

      <div className="loader-wheel-wrap">
        <svg className="loader-wheel loader-wheel-ghost" viewBox="0 0 400 400">
          <use href="#lwWheel"></use>
        </svg>

        <svg className="loader-wheel" viewBox="0 0 400 400">
          <defs>
            <radialGradient id="lwRimGrad" cx="35%" cy="32%" r="80%">
              <stop offset="0%" stopColor="#45454b" />
              <stop offset="55%" stopColor="#26262a" />
              <stop offset="100%" stopColor="#121214" />
            </radialGradient>
            <linearGradient id="lwSpokeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4e4e54" />
              <stop offset="100%" stopColor="#1b1b1e" />
            </linearGradient>
            <radialGradient id="lwDiscGrad" cx="50%" cy="50%" r="50%">
              <stop offset="50%" stopColor="#2c2c2f" />
              <stop offset="82%" stopColor="#404045" />
              <stop offset="100%" stopColor="#232326" />
            </radialGradient>
            <g id="lwSpoke">
              <path d="M191 178 L177 78 Q186 70 195 73 L198 178 Z" fill="url(#lwSpokeGrad)" />
              <path d="M209 178 L223 78 Q214 70 205 73 L202 178 Z" fill="url(#lwSpokeGrad)" />
            </g>
          </defs>

          <g id="lwWheel">
            <circle cx="200" cy="200" r="118" fill="url(#lwDiscGrad)" />
            <circle cx="200" cy="200" r="106" fill="none" stroke="#1c1c1f" strokeWidth="3" strokeDasharray="2 11" />
            <circle cx="200" cy="200" r="86" fill="none" stroke="#1c1c1f" strokeWidth="3" strokeDasharray="2 9" />
            <path d="M319.6 144.2 A132 132 0 0 1 319.6 255.8 L290.6 242.3 A100 100 0 0 0 290.6 157.7 Z" fill="#F9B646" />

            <g id="lwRotor">
              <circle cx="200" cy="200" r="174" fill="none" stroke="#141414" strokeWidth="46" />
              <circle cx="200" cy="200" r="192" fill="none" stroke="#060606" strokeWidth="8" strokeDasharray="15 11" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#0b0b0b" strokeWidth="12" />
              <circle cx="200" cy="42" r="5" fill="#F9B646" />

              <circle cx="200" cy="200" r="152" fill="none" stroke="#4d4d53" strokeWidth="2.5" />
              <circle cx="200" cy="200" r="141" fill="none" stroke="url(#lwRimGrad)" strokeWidth="21" />

              <use href="#lwSpoke" />
              <use href="#lwSpoke" transform="rotate(72 200 200)" />
              <use href="#lwSpoke" transform="rotate(144 200 200)" />
              <use href="#lwSpoke" transform="rotate(216 200 200)" />
              <use href="#lwSpoke" transform="rotate(288 200 200)" />

              <circle cx="200" cy="200" r="58" fill="#19191b" stroke="#2c2c30" strokeWidth="2" />
              <circle cx="200" cy="166" r="6" fill="#8e8e96" />
              <circle cx="232.3" cy="189.5" r="6" fill="#8e8e96" />
              <circle cx="220" cy="227.5" r="6" fill="#8e8e96" />
              <circle cx="180" cy="227.5" r="6" fill="#8e8e96" />
              <circle cx="167.7" cy="189.5" r="6" fill="#8e8e96" />
              <circle cx="200" cy="200" r="29" fill="#111110" stroke="#F9B646" strokeWidth="2" />
              <text x="200" y="212" textAnchor="middle" fontFamily="'Clash Display', sans-serif" fontSize="34" fontWeight="700" fill="#F9B646">M</text>
            </g>
          </g>
        </svg>
      </div>

      <div className="loader-meta">
        <span className="loader-brand">mani<span className="amber">.</span></span>
        <span className="loader-tag">AI systems — &apos;26</span>
      </div>

      <div className="loader-line"><i></i></div>

      <div className="loader-speedo">
        <span className="loader-counter" id="loaderCounter">000</span>
        <span className="loader-unit">ignition / km·h</span>
      </div>
    </div>
  );
}
