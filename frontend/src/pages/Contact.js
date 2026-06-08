import React, { useState } from 'react';

// This form sends to your backend API (see backend/server.js)
// Change the URL once your backend is live
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Contact = () => {
  const [tab, setTab] = useState('contact'); // 'contact' | 'review'

  /* CONTACT FORM STATE */
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [csending, setCsending] = useState(false);
  const [cstatus, setCstatus] = useState(null);

  /* REVIEW FORM STATE */
  const [review, setReview] = useState({ name: '', role: '', rating: 5, feedback: '', idea: '' });
  const [rsending, setRsending] = useState(false);
  const [rstatus, setRstatus] = useState(null);

  const handleContact = async (e) => {
    e.preventDefault();
    setCsending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setCstatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setCstatus('error');
      }
    } catch {
      setCstatus('error');
    } finally {
      setCsending(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setRsending(true);
    try {
      const res = await fetch(`${API_URL}/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (res.ok) {
        setRstatus('success');
        setReview({ name: '', role: '', rating: 5, feedback: '', idea: '' });
      } else {
        setRstatus('error');
      }
    } catch {
      setRstatus('error');
    } finally {
      setRsending(false);
    }
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <style>{`
        .contact-hero {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px;
          text-align: center;
        }
        .contact-tabs {
          display: flex;
          gap: 0;
          justify-content: center;
          margin: 40px 0;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 4px;
          width: fit-content;
          margin: 40px auto;
        }
        .ctab {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 10px 28px;
          border-radius: 7px;
          border: none;
          background: none;
          color: var(--text2);
          cursor: pointer;
          transition: all 0.2s;
        }
        .ctab.active { background: var(--accent); color: var(--bg); font-weight: 700; }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
          align-items: start;
        }
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--text2);
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .form-input, .form-textarea, .form-select {
          width: 100%;
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--text);
          font-family: var(--font-display);
          font-size: 14px;
          transition: border-color 0.2s;
          outline: none;
        }
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: var(--accent);
        }
        .form-textarea { resize: vertical; min-height: 120px; }
        .rating-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .rating-btn {
          width: 44px; height: 44px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg3);
          color: var(--text2);
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-mono);
          transition: all 0.15s;
        }
        .rating-btn.sel { background: var(--accent); color: var(--bg); border-color: var(--accent); }
        .rating-btn:hover { border-color: var(--accent); }

        .contact-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 16px;
        }
        .contact-link-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: var(--text);
          transition: color 0.2s;
        }
        .contact-link-row:last-child { border-bottom: none; }
        .contact-link-row:hover { color: var(--accent); }
        .contact-icon { font-size: 1.3rem; width: 28px; }
        .contact-link-label { font-size: 0.9rem; color: var(--text2); font-family: var(--font-mono); font-size: 11px; display: block; }
        .contact-link-val { font-size: 0.95rem; font-weight: 600; }
        .status-msg {
          padding: 14px 18px;
          border-radius: 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          margin-bottom: 16px;
        }
        .status-success { background: rgba(0,255,136,0.1); border: 1px solid var(--green); color: var(--green); }
        .status-error { background: rgba(255,71,87,0.1); border: 1px solid var(--red); color: var(--red); }

        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="contact-hero">
        <div className="section-label" style={{ justifyContent: 'center' }}>Let's connect</div>
        <h1 className="section-title">Get In Touch</h1>
        <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Whether it's a referral, work opportunity, feedback on my projects, or just a hello —
          I'm all ears.
        </p>
      </div>

      <div className="section">
        <div className="contact-tabs">
          <button className={`ctab${tab === 'contact' ? ' active' : ''}`} onClick={() => setTab('contact')}>
            💬 Contact Me
          </button>
          <button className={`ctab${tab === 'review' ? ' active' : ''}`} onClick={() => setTab('review')}>
            ⭐ Leave Feedback
          </button>
        </div>

        <div className="contact-layout">
          {/* LEFT: FORM */}
          <div>
            {tab === 'contact' ? (
              <form onSubmit={handleContact}>
                {cstatus === 'success' && <div className="status-msg status-success">✅ Message sent! I'll get back to you soon.</div>}
                {cstatus === 'error' && <div className="status-msg status-error">❌ Something went wrong. Try emailing me directly.</div>}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input required className="form-input" placeholder="Your name" value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input required type="email" className="form-input" placeholder="you@email.com" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" placeholder="What's this about?" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea required className="form-textarea" placeholder="Your message…" value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={csending} style={{ width: '100%', justifyContent: 'center' }}>
                  {csending ? '⏳ Sending…' : '🚀 Send Message'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleReview}>
                {rstatus === 'success' && <div className="status-msg status-success">✅ Thanks for your feedback!</div>}
                {rstatus === 'error' && <div className="status-msg status-error">❌ Something went wrong. Try again!</div>}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" placeholder="Optional" value={review.name}
                      onChange={e => setReview(r => ({ ...r, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Role</label>
                    <input className="form-input" placeholder="e.g. Recruiter, Dev" value={review.role}
                      onChange={e => setReview(r => ({ ...r, role: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <div className="rating-row">
                    {[1,2,3,4,5].map(n => (
                      <button type="button" key={n}
                        className={`rating-btn${review.rating === n ? ' sel' : ''}`}
                        onClick={() => setReview(r => ({ ...r, rating: n }))}>
                        {n}
                      </button>
                    ))}
                    <span style={{ alignSelf: 'center', fontSize: '1.2rem' }}>
                      {review.rating >= 4 ? '🔥' : review.rating >= 3 ? '👍' : '💡'}
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Feedback / Review *</label>
                  <textarea required className="form-textarea"
                    placeholder="What do you think of my portfolio, projects, or skills?"
                    value={review.feedback}
                    onChange={e => setReview(r => ({ ...r, feedback: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Ideas / Suggestions</label>
                  <textarea className="form-textarea" style={{ minHeight: 80 }}
                    placeholder="What would you improve? What should I build? What stack should I learn?"
                    value={review.idea}
                    onChange={e => setReview(r => ({ ...r, idea: e.target.value }))} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={rsending} style={{ width: '100%', justifyContent: 'center' }}>
                  {rsending ? '⏳ Submitting…' : '⭐ Submit Feedback'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: INFO */}
          <div>
            <div className="contact-card">
              <h3 style={{ marginBottom: 16, fontSize: '1rem' }}>Connect with me</h3>
              {/* ↓ EDIT with your real links */}
              {[
                { icon: '📧', label: 'Email', val: 'youremail@example.com', href: 'mailto:youremail@example.com' },
                { icon: '💼', label: 'LinkedIn', val: 'linkedin.com/in/aarya', href: 'https://linkedin.com/in/aarya' },
                { icon: '🐙', label: 'GitHub', val: 'github.com/aarya', href: 'https://github.com/aarya' },
                { icon: '🐦', label: 'Twitter/X', val: '@aarya_dev', href: 'https://x.com/aarya_dev' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-link-row">
                  <span className="contact-icon">{l.icon}</span>
                  <div>
                    <span className="contact-link-label">{l.label}</span>
                    <span className="contact-link-val">{l.val}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-card" style={{ borderLeft: '3px solid var(--green)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ fontWeight: 700 }}>Open to Work</span>
              </div>
              <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {/* ↓ EDIT this */}
                Looking for internships, entry-level roles, and freelance opportunities.
                Especially excited about full-stack, React, and Python roles.
              </p>
            </div>

            <div className="contact-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>⚡</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)' }}>
                Usually replies within
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--accent)' }}>24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
