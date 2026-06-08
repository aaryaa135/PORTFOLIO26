import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Animated terminal-style typing effect
const useTyping = (words, speed = 80, pause = 1800) => {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
};

// Floating code particles
const Particles = () => {
  const snippets = ['const', 'await', '{ }', '=>', 'async', 'import', '[]', '&&', 'return', 'class', '?? ', '||'];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {snippets.map((s, i) => (
        <span key={i} style={{
          position: 'absolute',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'rgba(0,229,255,0.12)',
          left: `${(i * 9.1) % 95}%`,
          top: `${(i * 17 + 10) % 90}%`,
          animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }}>{s}</span>
      ))}
    </div>
  );
};

const Home = () => {
  const typed = useTyping([
    'Building things that matter.',
    'Turning coffee → code.',
    'Debugging at 2am. Again.',
    'Open to opportunities.',
    'Learning every single day.',
  ]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,229,255,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(124,58,237,0.04) 0%, transparent 50%);
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(30,42,56,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,42,56,0.3) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 70%);
        }
        .hero-content { position: relative; z-index: 2; }
        .hero-eyebrow {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent);
          letter-spacing: 2px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse 2s infinite;
          box-shadow: 0 0 8px var(--green);
        }
        .hero-name {
          font-size: clamp(3.5rem, 10vw, 7rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
        }
        .hero-name .accent { color: var(--accent); }
        .hero-name .dim { color: var(--text3); }
        .hero-typed {
          font-family: var(--font-mono);
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: var(--text2);
          margin-bottom: 40px;
          min-height: 2em;
        }
        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--accent);
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: blink 1s infinite;
        }
        .hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }
        .hero-meta {
          position: absolute;
          bottom: 40px; right: 0;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text3);
          text-align: right;
          line-height: 2;
        }
        .hero-meta span { display: block; }
        .scroll-hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text3);
          letter-spacing: 2px;
          animation: float 2s ease-in-out infinite;
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--text3), transparent);
        }

        /* QUICK STATS */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .stat-item {
          background: var(--bg2);
          padding: 32px 24px;
          text-align: center;
          transition: background 0.2s;
        }
        .stat-item:hover { background: var(--bg3); }
        .stat-num {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text3);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* FEATURED SECTION */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 48px;
        }
        .feat-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 28px;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
          color: var(--text);
        }
        .feat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .feat-card:hover::before { transform: scaleX(1); }
        .feat-card:hover { border-color: rgba(0,229,255,0.3); transform: translateY(-4px); }
        .feat-icon { font-size: 2rem; margin-bottom: 16px; }
        .feat-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .feat-desc {
          font-size: 0.9rem;
          color: var(--text2);
          line-height: 1.6;
        }
        .feat-arrow {
          position: absolute;
          top: 24px; right: 24px;
          font-size: 18px;
          color: var(--text3);
          transition: color 0.2s, transform 0.2s;
        }
        .feat-card:hover .feat-arrow { color: var(--accent); transform: translate(2px, -2px); }

        @media (max-width: 768px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .hero-meta { display: none; }
        }
        @media (max-width: 480px) {
          .stats-bar { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <Particles />
        <div className="section hero-content">
          <div className="hero-eyebrow fade-up">
            <span className="dot" />
            Available for opportunities
          </div>
          <h1 className="hero-name fade-up fade-up-1">
            Hi, I'm<br />
            <span className="accent">Aarya</span><span className="dim">.</span>
          </h1>
          <p className="hero-typed fade-up fade-up-2">
            {typed}<span className="cursor" />
          </p>
          <p style={{ color: 'var(--text2)', marginBottom: 40, maxWidth: 520, fontSize: '1.05rem', lineHeight: 1.7 }}
             className="fade-up fade-up-3">
            Aspiring software developer from India. I build clean, purposeful software —
            from the frontend pixel to the backend query. Currently levelling up in React.
          </p>
          <div className="hero-cta fade-up fade-up-4">
            <Link to="/projects" className="btn btn-primary">View Projects →</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </div>
        <div className="hero-meta">
          {/* Update with your real info */}
          <span>📍 Himachal Pradesh, India</span>
          <span>💼 Open to Work</span>
          <span>🎯 Full Stack Dev</span>
        </div>
        <div className="scroll-hint">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          { num: '10+', label: 'Projects Built' },
          { num: '5+', label: 'Tech Skills' },
          { num: '∞', label: 'Cups of Coffee' },
          { num: '100%', label: 'Dedication' },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURED QUICK LINKS */}
      <div className="section">
        <div className="section-label">Explore</div>
        <h2 className="section-title">What's here</h2>
        <div className="featured-grid">
          {[
            { to: '/about',    icon: '👾', title: 'About Me',     desc: 'My story, background, and what drives me to build.' },
            { to: '/stack',    icon: '⚡', title: 'Tech Stack',   desc: 'The tools and technologies I use and am learning.' },
            { to: '/projects', icon: '🚀', title: 'Projects',     desc: 'Real things I\'ve built — with code, purpose, and sweat.' },
            { to: '/play',     icon: '🎮', title: 'Playground',   desc: 'Mini-games and interactive experiments. Take a break.' },
            { to: '/contact',  icon: '💬', title: 'Contact',      desc: 'Reach out for work, collabs, or just to say hey.' },
          ].map((f, i) => (
            <Link key={i} to={f.to} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <p className="feat-desc">{f.desc}</p>
              <span className="feat-arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
