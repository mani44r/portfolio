import ResumeFab from './ResumeFab';

// Port of partials/chrome.php — film grain + custom cursor + scroll progress wheel.
export default function Chrome() {
  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <ResumeFab />

      <button className="scroll-wheel" aria-label="Back to top">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="rgba(17,17,16,0.85)" />
          <g className="sw-rotor">
            <circle cx="50" cy="50" r="36" fill="none" stroke="#3a3a3e" strokeWidth="5" />
            <line x1="50" y1="50" x2="50" y2="16" stroke="#5a5a60" strokeWidth="4" />
            <line x1="50" y1="50" x2="82.3" y2="60.5" stroke="#5a5a60" strokeWidth="4" />
            <line x1="50" y1="50" x2="30" y2="77.5" stroke="#5a5a60" strokeWidth="4" />
            <line x1="50" y1="50" x2="17.7" y2="39.5" stroke="#5a5a60" strokeWidth="4" />
            <line x1="50" y1="50" x2="70" y2="22.5" stroke="#5a5a60" strokeWidth="4" />
            <circle cx="50" cy="50" r="9" fill="#F9B646" />
          </g>
          <circle className="sw-progress" cx="50" cy="50" r="44" />
        </svg>
      </button>
    </>
  );
}
