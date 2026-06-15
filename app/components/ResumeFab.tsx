import { SITE } from '@/lib/site';

/** Fixed resume download — visible on all pages, mobile-friendly. */
export default function ResumeFab() {
  return (
    <a
      href={SITE.resume}
      className="resume-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Resume PDF"
      data-no-transition
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 16L7 11H10V4H14V11H17L12 16ZM6 18V20H18V18H6Z" fill="currentColor" />
      </svg>
      <span>Resume</span>
    </a>
  );
}
