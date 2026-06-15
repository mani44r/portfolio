// Port of partials/site_footer.php.
export default function SiteFooter({ base = '/' }: { base?: string }) {
  const root = base;
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="brand" href={root}><img src={`${root}assets/vee-logo-white.svg`} alt="vee logo" /></a>
        <nav>
          <ul>
            <li><a href={root}>Home</a></li>
            <li><a href={`${root}#intro`}>Intro</a></li>
            <li><a href={`${root}projects`}>Projects</a></li>
            <li><a href={`${root}timeline`}>Timeline</a></li>
            <li><a href={`${root}chaicode`}>ChaiCode</a></li>
            <li><a href={`${root}blogs`}>Blogs</a></li>
            <li><a href={`${root}#contact`}>Contact</a></li>
            <li><a href={`${root}#about`}>About</a></li>
          </ul>
        </nav>
      </div>

      <div className="footer-giant">
        <span className="row"><span className="ghost">fall back<span className="amber">?</span></span></span>
        <span className="row"><span>redesign<span className="amber">..!</span></span></span>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Manikanta Ramineni</span>
        <span>building intelligent systems — solving real problems</span>
        <span><a href="mailto:manikantaramineni113@gmail.com">manikantaramineni113@gmail.com</a></span>
      </div>
    </footer>
  );
}
