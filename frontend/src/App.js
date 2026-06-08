import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Stack from './pages/Stack';
import Projects from './pages/Projects';
import Play from './pages/Play';
import Contact from './pages/Contact';

// Simple footer
const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--border)',
    padding: '32px 24px',
    textAlign: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text3)',
    background: 'var(--bg2)',
  }}>
    <span>Built with React by </span>
    <span style={{ color: 'var(--accent)' }}>Aarya</span>
    <span> · Open Source · </span>
    {/* ↓ Replace with your GitHub link */}
    <a href="https://github.com/aarya" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>GitHub ↗</a>
  </footer>
);

// Scroll to top on route change
const ScrollTop = () => {
  const { pathname } = require('react-router-dom').useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/stack"   element={<Stack />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/play"    element={<Play />} />
          <Route path="/contact" element={<Contact />} />
          {/* 404 fallback */}
          <Route path="*" element={
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: '4rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>404</div>
              <div style={{ color: 'var(--text2)' }}>Page not found.</div>
              <a href="/" className="btn btn-primary">Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
