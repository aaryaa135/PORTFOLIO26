import React, { useState } from 'react';

// ↓ EDIT THIS ARRAY — add your real projects
const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    desc: 'This very site. Built with React, featuring multi-page routing, animations, a contact form with backend, and a mini-game playground.',
    tags: ['React', 'Node.js', 'MongoDB'],
    cat: 'Web',
    status: 'Live',
    github: 'https://github.com/yourusername/portfolio', // ← change
    demo: '#',
    highlight: true,
    emoji: '🌐',
  },
  {
    id: 2,
    title: 'Task Manager CLI',
    desc: 'Command-line task manager written in Python. Supports priorities, due dates, and local JSON persistence.',
    tags: ['Python', 'CLI', 'JSON'],
    cat: 'Tool',
    status: 'Complete',
    github: 'https://github.com/yourusername/task-cli',
    demo: null,
    highlight: false,
    emoji: '✅',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    desc: 'Fetches real-time weather data using OpenWeatherMap API. Displays 5-day forecast with charts.',
    tags: ['JavaScript', 'API', 'CSS'],
    cat: 'Web',
    status: 'Complete',
    github: 'https://github.com/yourusername/weather-app',
    demo: '#',
    highlight: false,
    emoji: '⛅',
  },
  {
    id: 4,
    title: 'Student Grade Tracker',
    desc: 'Desktop-style web app to track subject grades, calculate GPA, and visualize performance over time.',
    tags: ['React', 'Chart.js', 'LocalStorage'],
    cat: 'Web',
    status: 'In Progress',
    github: '#',
    demo: null,
    highlight: false,
    emoji: '📊',
  },
  {
    id: 5,
    title: 'Algo Visualizer',
    desc: 'Visualizes sorting algorithms (Bubble, Merge, Quick) in real-time with adjustable speed and array size.',
    tags: ['JavaScript', 'Canvas', 'Algorithms'],
    cat: 'Tool',
    status: 'In Progress',
    github: '#',
    demo: null,
    highlight: false,
    emoji: '📈',
  },
];

const cats = ['All', 'Web', 'Tool'];

const statusColor = { 'Live': '#00ff88', 'Complete': '#00e5ff', 'In Progress': '#f59e0b' };

const Projects = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.cat === active);

  return (
    <div style={{ paddingTop: 64 }}>
      <style>{`
        .projects-hero {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px;
          text-align: center;
        }
        .proj-filter { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 40px 0; }
        .proj-tab {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 8px 20px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--bg2);
          color: var(--text2);
          cursor: pointer;
          transition: all 0.2s;
        }
        .proj-tab:hover { border-color: var(--accent); color: var(--accent); }
        .proj-tab.active { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 700; }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .proj-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
          animation: fadeUp 0.4s ease both;
        }
        .proj-card.highlight {
          border-color: rgba(0,229,255,0.3);
          background: linear-gradient(135deg, var(--bg2), rgba(0,229,255,0.03));
        }
        .proj-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .proj-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
        .proj-emoji { font-size: 2rem; }
        .proj-status {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 12px;
          background: rgba(0,0,0,0.3);
        }
        .proj-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
        .proj-desc { color: var(--text2); font-size: 0.9rem; line-height: 1.7; flex: 1; margin-bottom: 20px; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
        .proj-links { display: flex; gap: 10px; }
        .proj-link {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 8px 14px;
          border-radius: 6px;
          border: 1px solid var(--border);
          color: var(--text2);
          cursor: pointer;
          transition: all 0.2s;
          background: none;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .proj-link:hover { border-color: var(--accent); color: var(--accent); }
        .proj-link.primary { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 700; }
        .proj-link.primary:hover { background: #00c4da; }
        .wip-banner {
          margin-top: 48px;
          padding: 32px;
          background: var(--bg2);
          border: 1px dashed var(--border);
          border-radius: 12px;
          text-align: center;
        }
        .wip-banner h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .wip-banner p { color: var(--text2); font-size: 0.9rem; }
      `}</style>

      <div className="projects-hero">
        <div className="section-label" style={{ justifyContent: 'center' }}>What I've built</div>
        <h1 className="section-title">Projects</h1>
        <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Real things I've made. Some polished, some works-in-progress —
          all learning experiences.
        </p>
      </div>

      <div className="section">
        <div className="proj-filter">
          {cats.map(c => (
            <button key={c} className={`proj-tab${active === c ? ' active' : ''}`} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div key={p.id} className={`proj-card${p.highlight ? ' highlight' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="proj-top">
                <span className="proj-emoji">{p.emoji}</span>
                <span className="proj-status" style={{ color: statusColor[p.status] || 'var(--text2)', border: `1px solid ${statusColor[p.status] || 'var(--border)'}` }}>
                  {p.status}
                </span>
              </div>
              <div className="proj-title">{p.title}</div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="proj-links">
                {p.github && p.github !== '#' && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                    ↗ GitHub
                  </a>
                )}
                {p.demo && p.demo !== '#' && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="proj-link primary">
                    ▶ Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="wip-banner">
          <h3>🔨 More cooking…</h3>
          <p>New projects are always in progress. Check back soon — or peek at my GitHub for the latest.</p>
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: 16, display: 'inline-flex' }}>
            GitHub Profile ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
