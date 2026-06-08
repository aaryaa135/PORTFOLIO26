import React, { useState } from 'react';

// Each skill: name, level 0-100, category, color, icon (emoji or text)
const skills = [
  // ↓ EDIT THESE — add/remove your real skills
  // LANGUAGES
  { name: 'Python',     level: 75, cat: 'Languages',  color: '#3776ab', icon: '🐍' },
  { name: 'JavaScript', level: 60, cat: 'Languages',  color: '#f7df1e', icon: '⚡' },
  { name: 'HTML/CSS',   level: 70, cat: 'Languages',  color: '#e34f26', icon: '🌐' },
  { name: 'C',          level: 50, cat: 'Languages',  color: '#555555', icon: '⚙️' },
  // FRAMEWORKS
  { name: 'React',      level: 30, cat: 'Frameworks', color: '#61dafb', icon: '⚛️' },
  { name: 'Node.js',    level: 35, cat: 'Frameworks', color: '#339933', icon: '🟢' },
  { name: 'Express',    level: 30, cat: 'Frameworks', color: '#ffffff', icon: '🚂' },
  // TOOLS
  { name: 'Git',        level: 65, cat: 'Tools',      color: '#f05032', icon: '🌿' },
  { name: 'VS Code',    level: 80, cat: 'Tools',      color: '#007acc', icon: '💙' },
  { name: 'Linux',      level: 50, cat: 'Tools',      color: '#fcc624', icon: '🐧' },
  // DATABASES
  { name: 'MongoDB',    level: 30, cat: 'Databases',  color: '#47a248', icon: '🍃' },
  { name: 'PostgreSQL', level: 20, cat: 'Databases',  color: '#336791', icon: '🐘' },
  // LEARNING
  { name: 'TypeScript', level: 15, cat: 'Learning',   color: '#3178c6', icon: '📘' },
  { name: 'Docker',     level: 10, cat: 'Learning',   color: '#2496ed', icon: '🐳' },
];

const categories = ['All', ...Array.from(new Set(skills.map(s => s.cat)))];

const Stack = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? skills : skills.filter(s => s.cat === active);

  return (
    <div style={{ paddingTop: 64 }}>
      <style>{`
        .stack-hero {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px;
          text-align: center;
        }
        .filter-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 40px 0;
          justify-content: center;
        }
        .filter-tab {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 8px 18px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg2);
          color: var(--text2);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }
        .filter-tab:hover { border-color: var(--accent); color: var(--accent); }
        .filter-tab.active {
          background: var(--accent);
          color: var(--bg);
          border-color: var(--accent);
          font-weight: 700;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .skill-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s;
          animation: fadeUp 0.4s ease both;
        }
        .skill-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .skill-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .skill-name-row { display: flex; align-items: center; gap: 10px; }
        .skill-icon { font-size: 1.5rem; }
        .skill-name { font-weight: 700; font-size: 1rem; }
        .skill-cat {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text3);
          letter-spacing: 1px;
        }
        .skill-pct {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--accent);
        }
        .skill-bar-bg {
          height: 6px;
          background: var(--bg3);
          border-radius: 3px;
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s cubic-bezier(.4,0,.2,1);
        }
        .level-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text3);
          margin-top: 6px;
          letter-spacing: 0.5px;
        }

        /* LEARNING SECTION */
        .learning-section {
          margin-top: 64px;
          padding: 40px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          border-left: 3px solid var(--accent3);
        }
        .learning-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .currently-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .currently-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 16px;
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .currently-item .spin-icon {
          animation: spin 3s linear infinite;
          display: inline-block;
        }
      `}</style>

      <div className="stack-hero">
        <div className="section-label" style={{ justifyContent: 'center' }}>My toolkit</div>
        <h1 className="section-title">Tech Stack</h1>
        <p style={{ color: 'var(--text2)', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
          The tools I use, the ones I'm learning, and the ones I'm targeting next.
          Honesty about skill levels — no fake 95% bars here.
        </p>
      </div>

      <div className="section">
        {/* FILTER TABS */}
        <div className="filter-tabs">
          {categories.map(c => (
            <button key={c} className={`filter-tab${active === c ? ' active' : ''}`} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* SKILLS GRID */}
        <div className="skills-grid">
          {filtered.map((s, i) => {
            const getLabel = (l) => {
              if (l >= 80) return 'Advanced';
              if (l >= 60) return 'Intermediate';
              if (l >= 40) return 'Familiar';
              if (l >= 20) return 'Beginner';
              return 'Learning';
            };
            return (
              <div key={s.name} className="skill-card" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="skill-header">
                  <div className="skill-name-row">
                    <span className="skill-icon">{s.icon}</span>
                    <div>
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-cat">{s.cat}</div>
                    </div>
                  </div>
                  <div className="skill-pct">{s.level}%</div>
                </div>
                <div className="skill-bar-bg">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${s.level}%`, background: s.color }}
                  />
                </div>
                <div className="level-label">{getLabel(s.level)}</div>
              </div>
            );
          })}
        </div>

        {/* CURRENTLY LEARNING */}
        <div className="learning-section">
          <div className="learning-title">
            <span>🎯</span> Currently focused on
          </div>
          <div className="currently-row">
            {/* ↓ EDIT with what you're currently learning */}
            {['React', 'Node.js + Express', 'REST APIs', 'MongoDB', 'Git workflows', 'Clean Code practices'].map(item => (
              <div key={item} className="currently-item">
                <span className="spin-icon">⚙</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;
