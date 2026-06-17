import React, { useState } from 'react';

// Each skill: name, level 0-100, category, color, icon (emoji or text)
const skills = [
  // Languages
  { name: 'C', cat: 'Languages', color: '#A8B9CC' },
  { name: 'C++', cat: 'Languages', color: '#00599C' },
  { name: 'Python', cat: 'Languages', color: '#3776AB' },
  { name: 'JavaScript', cat: 'Languages', color: '#F7DF1E' },
  { name: 'SQL', cat: 'Languages', color: '#336791' },

  // Backend
  { name: 'FastAPI', cat: 'Backend', color: '#009688' },
  { name: 'Django', cat: 'Backend', color: '#092E20' },
  { name: 'Node.js', cat: 'Backend', color: '#339933' },
  { name: 'Express.js', cat: 'Backend', color: '#444444' },
  { name: 'REST API Design', cat: 'Backend', color: '#FF6B35' },
  { name: 'REST API Automation', cat: 'Backend', color: '#FF8C42' },

  // Databases
  { name: 'PostgreSQL', cat: 'Databases', color: '#336791' },
  { name: 'MySQL', cat: 'Databases', color: '#4479A1' },
  { name: 'MongoDB', cat: 'Databases', color: '#47A248' },
  { name: 'SQLAlchemy ORM', cat: 'Databases', color: '#D71F00' },
  { name: 'RDBMS', cat: 'Databases', color: '#607D8B' },

  // CS Core
  { name: 'Data Structures & Algorithms', cat: 'CS Core', color: '#FF5722' },
  { name: 'OOP', cat: 'CS Core', color: '#9C27B0' },
  { name: 'Operating Systems', cat: 'CS Core', color: '#3F51B5' },
  { name: 'Computer Networks', cat: 'CS Core', color: '#009688' },
  { name: 'DBMS', cat: 'CS Core', color: '#795548' },

  // Testing
  { name: 'Pytest', cat: 'Testing', color: '#0A9EDC' },
  { name: 'Test-Driven Development', cat: 'Testing', color: '#FF9800' },
  { name: 'Postman', cat: 'Testing', color: '#FF6C37' },
  { name: 'API Testing', cat: 'Testing', color: '#E91E63' },

  // Web
  { name: 'HTML', cat: 'Web', color: '#E34F26' },
  { name: 'CSS', cat: 'Web', color: '#1572B6' },
  { name: 'React', cat: 'Web', color: '#61DAFB' },
  { name: 'Next.js', cat: 'Web', color: '#000000' },
  { name: 'Tailwind CSS', cat: 'Web', color: '#06B6D4' },

  // Tools
  { name: 'Git', cat: 'Tools', color: '#F05032' },
  { name: 'GitHub', cat: 'Tools', color: '#181717' },
  { name: 'Linux', cat: 'Tools', color: '#FCC624' },
  { name: 'AWS', cat: 'Tools', color: '#FF9900' },
  { name: 'VS Code', cat: 'Tools', color: '#007ACC' },
  { name: 'Cisco DNA Center', cat: 'Tools', color: '#1BA0D7' },
  { name: 'YOLOv8', cat: 'Tools', color: '#8A2BE2' },
  { name: 'Scikit-learn', cat: 'Tools', color: '#F7931E' },
  { name: 'XGBoost', cat: 'Tools', color: '#FF6600' },
  { name: 'OpenCV', cat: 'Tools', color: '#5C3EE8' },
  { name: 'Pandas', cat: 'Tools', color: '#150458' },
  { name: 'NumPy', cat: 'Tools', color: '#013243' }
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
            {[
               'System Design & Scalability',
               'Docker & Containerization',
               'AWS Cloud Architecture',
               'Microservices Architecture',
               'Distributed Systems',
               'MLOps & Model Deployment'
              ].map(item => (
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
