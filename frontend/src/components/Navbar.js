import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { to: '/',        label: 'Home' },
    { to: '/about',   label: 'About' },
    { to: '/stack',   label: 'Stack' },
    { to: '/projects',label: 'Projects' },
    { to: '/play',    label: 'Play' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.3s;
          padding: 0 24px;
        }
        .navbar.scrolled {
          background: rgba(8,12,16,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -1px;
          text-decoration: none;
        }
        .nav-logo span { color: var(--text); }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }
        .nav-links a {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.5px;
          color: var(--text2);
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.2s;
          text-decoration: none;
        }
        .nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.04); }
        .nav-links a.active { color: var(--accent); }
        .nav-resume {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          color: var(--bg) !important;
          background: var(--accent) !important;
          padding: 8px 16px !important;
          border-radius: 6px !important;
          margin-left: 8px;
          letter-spacing: 0.5px;
          transition: all 0.2s !important;
        }
        .nav-resume:hover { background: #00c4da !important; transform: translateY(-1px); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.3s;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: rgba(8,12,16,0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px;
          flex-direction: column;
          gap: 8px;
          z-index: 999;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text2);
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-menu a:hover, .mobile-menu a.active { color: var(--accent); }
        .mobile-menu .mob-resume {
          color: var(--accent) !important;
          border-bottom: none;
          margin-top: 8px;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">Aarya<span>.dev</span></Link>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={isActive(l.to) ? 'active' : ''}>{l.label}</Link>
              </li>
            ))}
            {/* ↓ REPLACE href with your actual resume PDF link */}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nav-resume">
                ↗ Resume
              </a>
            </li>
          </ul>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} className={isActive(l.to) ? 'active' : ''}>{l.label}</Link>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mob-resume">↗ Resume</a>
      </div>
    </>
  );
};

export default Navbar;
