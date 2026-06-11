import React from 'react';

const About = () => (
  <div style={{ paddingTop: 64 }}>
    <style>{`
      .about-hero {
        background: var(--bg2);
        border-bottom: 1px solid var(--border);
        padding: 80px 24px;
      }
      .about-hero-inner {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 64px;
        align-items: center;
      }
      .about-avatar {
        width: 280px;
        height: 280px;
        border-radius: 16px;
        border: 2px solid var(--border);
        background: var(--bg3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6rem;
        position: relative;
        overflow: hidden;
        /* Replace the emoji with <img src="your-photo.jpg" alt="Aarya" style="width:100%;height:100%;object-fit:cover" /> */
      }
      .about-avatar::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(0,229,255,0.1), rgba(124,58,237,0.08));
      }
      .about-tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
      .timeline { margin-top: 48px; }
      .tl-item {
        display: flex;
        gap: 24px;
        padding-bottom: 40px;
        position: relative;
      }
      .tl-item:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 11px;
        top: 28px;
        bottom: 0;
        width: 1px;
        background: var(--border);
      }
      .tl-dot {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--bg3);
        border: 2px solid var(--accent);
        margin-top: 2px;
      }
      .tl-year {
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--accent);
        margin-bottom: 4px;
      }
      .tl-title { font-weight: 700; margin-bottom: 4px; }
      .tl-desc { font-size: 0.9rem; color: var(--text2); line-height: 1.6; }
      .interests-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
        margin-top: 32px;
      }
      .interest-item {
        background: var(--bg2);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        transition: border-color 0.2s;
      }
      .interest-item:hover { border-color: var(--accent); }
      .interest-icon { font-size: 2rem; margin-bottom: 8px; }
      .interest-label { font-size: 0.9rem; font-weight: 600; }
      @media (max-width: 768px) {
        .about-hero-inner { grid-template-columns: 1fr; }
        .about-avatar { width: 160px; height: 160px; font-size: 4rem; }
      }
    `}</style>

    <div className="about-hero">
      <div className="about-hero-inner">
        <div className="fade-up">
          <div className="section-label">Who I am</div>
          <h1 className="section-title">About Me</h1>
          <p style={{ color: 'var(--text2)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 16 }}>
            {/* ↓ EDIT THIS — your real intro */}
           Hey! I'm Aarya, an aspiring Software Engineer from Himachal Pradesh, India. 
           Driven by curiosity and a passion for technology, I enjoy building solutions that turn ideas into real-world impact. 
           My interests span across software engineering, artificial intelligence, cloud technologies, and modern computing, and I'm constantly exploring new ways to learn, innovate, and create. 
           I believe the best way to grow is by building things, solving meaningful problems, and occasionally spending far longer debugging than writing the code itself.

          </p>
          <p style={{ color: 'var(--text2)', fontSize: '1.05rem', lineHeight: 1.8 }}>
            I believe great software is more than just working code—it's thoughtful, scalable, maintainable, and built with purpose. 
            I'm passionate about solving challenging problems, understanding systems beyond the surface, and continuously refining ideas into elegant, impactful solutions.

          </p>
          <div className="about-tag-row">
            {['Problem Solver', 'Fast Learner', 'Team Player', 'Open Source Enthusiast', 'Night Owl Coder'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }} className="fade-up fade-up-2">
          <div className="about-avatar">
            👨‍💻
            {/* Replace with: <img src="your-photo.jpg" alt="Aarya" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
          </div>
        </div>
      </div>
    </div>

    <div className="section">
      {/* JOURNEY TIMELINE */}
      <div className="section-label">My story</div>
      <h2 className="section-title">Journey so far</h2>
      <div className="timeline">
        {[
          /* ↓ EDIT THESE with your real history */
          { year: '2024 – Present', title: 'Learning React & Full Stack Development', desc: 'Diving deep into React, Node.js, and databases. Building personal projects to solidify my skills.' },
          { year: '2023',           title: 'Started Computer Science',               desc: 'Enrolled in CS. Fell in love with programming — specifically Python and data structures.' },
          { year: '2022',           title: 'First Line of Code',                     desc: 'Wrote "Hello World" in Python. Immediately broke something. Fixed it. Fell in love.' },
          { year: '2020',           title: 'Discovered Tech',                        desc: 'Started tinkering with computers, building small automations, and getting curious about how apps work.' },
        ].map((item, i) => (
          <div key={i} className="tl-item fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="tl-dot" />
            <div>
              <div className="tl-year">{item.year}</div>
              <div className="tl-title">{item.title}</div>
              <p className="tl-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* INTERESTS */}
      <div style={{ marginTop: 64 }}>
        <div className="section-label">Beyond code</div>
        <h2 className="section-title">Interests</h2>
        <div className="interests-grid">
          {[
            /* ↓ EDIT with your real interests */
            { icon: '💻', label: 'Open Source' },
            { icon: '🎮', label: 'Gaming' },
            { icon: '📚', label: 'Reading' },
            { icon: '🏔️', label: 'Hiking (Himachal!)' },
            { icon: '🎵', label: 'Music' },
            { icon: '🧩', label: 'Puzzles & Logic' },
          ].map((item, i) => (
            <div key={i} className="interest-item">
              <div className="interest-icon">{item.icon}</div>
              <div className="interest-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default About;
