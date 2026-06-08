import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ============================================================
   GAME 1 — TYPE RACER (type code snippets as fast as possible)
   ============================================================ */
const snippets = [
  `const greet = (name) => \`Hello, \${name}!\`;`,
  `arr.filter(x => x % 2 === 0).map(x => x * 2)`,
  `async function fetchData(url) { const res = await fetch(url); return res.json(); }`,
  `const [count, setCount] = useState(0);`,
  `document.querySelector('.btn').addEventListener('click', handleClick);`,
];

const TypeRacer = () => {
  const [snippet, setSnippet] = useState(snippets[0]);
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [done, setDone] = useState(false);
  const inputRef = useRef();

  const reset = useCallback(() => {
    const next = snippets[Math.floor(Math.random() * snippets.length)];
    setSnippet(next);
    setTyped('');
    setStartTime(null);
    setWpm(null);
    setDone(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleType = (e) => {
    const val = e.target.value;
    if (!startTime && val.length === 1) setStartTime(Date.now());
    setTyped(val);
    if (val === snippet) {
      const mins = (Date.now() - startTime) / 60000;
      const words = snippet.split(' ').length;
      setWpm(Math.round(words / mins));
      setDone(true);
    }
  };

  return (
    <div className="game-box">
      <div className="game-title">⌨️ Code Racer</div>
      <p className="game-desc">Type the code snippet as fast as you can</p>
      <div style={{
        background: 'var(--bg)', borderRadius: 8, padding: '16px 20px',
        fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.7,
        marginBottom: 16, border: '1px solid var(--border)', letterSpacing: 0.3
      }}>
        {snippet.split('').map((ch, i) => {
          let color = 'var(--text3)';
          if (i < typed.length) color = typed[i] === ch ? 'var(--green)' : 'var(--red)';
          if (i === typed.length) color = 'var(--accent)';
          return <span key={i} style={{ color, borderBottom: i === typed.length ? '2px solid var(--accent)' : 'none' }}>{ch}</span>;
        })}
      </div>
      {!done ? (
        <input
          ref={inputRef}
          value={typed}
          onChange={handleType}
          placeholder="Start typing…"
          style={{
            width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '10px 14px', color: 'var(--text)',
            fontFamily: 'var(--font-mono)', fontSize: 14, outline: 'none',
          }}
          autoFocus
        />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)' }}>{wpm} WPM</div>
          <p style={{ color: 'var(--text2)', marginBottom: 16 }}>
            {wpm > 60 ? '🔥 Fast fingers!' : wpm > 40 ? '💪 Solid effort!' : '🌱 Keep practising!'}
          </p>
          <button className="btn btn-primary" onClick={reset}>Try another</button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   GAME 2 — BINARY QUIZ (convert decimal to binary)
   ============================================================ */
const BinaryQuiz = () => {
  const gen = () => Math.floor(Math.random() * 128) + 1;
  const [num, setNum] = useState(gen);
  const [ans, setAns] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const check = () => {
    const correct = num.toString(2);
    const isRight = ans.trim() === correct;
    setResult({ correct, isRight });
    if (isRight) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
  };

  const next = () => {
    setNum(gen());
    setAns('');
    setResult(null);
  };

  return (
    <div className="game-box">
      <div className="game-title">🔢 Binary Converter</div>
      <p className="game-desc">Convert the decimal to binary</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text3)' }}>
          Score: <b style={{ color: 'var(--accent)' }}>{score}</b>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text3)' }}>
          Streak: <b style={{ color: streak > 2 ? 'var(--green)' : 'var(--text2)' }}>{streak} 🔥</b>
        </span>
      </div>
      <div style={{
        fontSize: '4rem', fontWeight: 800, textAlign: 'center',
        color: 'var(--accent)', margin: '24px 0', fontFamily: 'var(--font-mono)',
      }}>{num}</div>
      {!result ? (
        <>
          <input
            value={ans}
            onChange={e => setAns(e.target.value.replace(/[^01]/g, ''))}
            onKeyDown={e => e.key === 'Enter' && ans && check()}
            placeholder="Enter binary (e.g. 1010)…"
            style={{
              width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '10px 14px', color: 'var(--text)',
              fontFamily: 'var(--font-mono)', fontSize: 14, marginBottom: 12, outline: 'none',
            }}
          />
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={check} disabled={!ans}>Check</button>
        </>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>{result.isRight ? '✅' : '❌'}</div>
          {!result.isRight && (
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text2)', marginBottom: 8 }}>
              Correct: <b style={{ color: 'var(--green)' }}>{result.correct}</b>
            </p>
          )}
          <button className="btn btn-primary" onClick={next}>Next number</button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   GAME 3 — BUG FINDER (spot the bug in a code snippet)
   ============================================================ */
const bugs = [
  {
    code: `function add(a, b) {\n  return a - b;  // ← line 2\n}`,
    hint: 'Should be addition, not subtraction',
    line: 2,
    fix: 'return a + b;'
  },
  {
    code: `for (let i = 0; i <= arr.length; i++) {\n  console.log(arr[i]);\n}`,
    hint: 'Off-by-one error — will hit undefined on last iteration',
    line: 1,
    fix: 'i < arr.length'
  },
  {
    code: `const user = null;\nconsole.log(user.name); // ← line 2`,
    hint: 'Cannot read property of null',
    line: 2,
    fix: 'user?.name or check for null first'
  },
  {
    code: `async function getData() {\n  const res = fetch("/api");\n  return res.json();\n}`,
    hint: 'Missing await before fetch',
    line: 2,
    fix: 'const res = await fetch("/api");'
  },
];

const BugFinder = () => {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const bug = bugs[idx];

  const next = (found) => {
    if (found) setScore(s => s + 1);
    setRevealed(false);
    setIdx(i => (i + 1) % bugs.length);
  };

  return (
    <div className="game-box">
      <div className="game-title">🐛 Bug Finder</div>
      <p className="game-desc">Can you spot the bug?  Score: <b style={{ color: 'var(--accent)' }}>{score}</b></p>
      <pre style={{
        background: 'var(--bg)', borderRadius: 8, padding: 16,
        fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8,
        border: '1px solid var(--border)', overflowX: 'auto', marginBottom: 16,
        color: 'var(--text)',
      }}>{bug.code}</pre>
      {!revealed ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" onClick={() => setRevealed(true)} style={{ flex: 1 }}>
            🔍 Reveal Bug
          </button>
          <button className="btn btn-outline" onClick={() => next(false)} style={{ flex: 1 }}>
            Skip
          </button>
        </div>
      ) : (
        <div>
          <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid var(--red)', borderRadius: 8, padding: 14, marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 4 }}>Bug found on line {bug.line}:</div>
            <div style={{ color: 'var(--text)', fontSize: 14 }}>{bug.hint}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', marginTop: 8 }}>Fix → {bug.fix}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={() => next(true)} style={{ flex: 1 }}>
              ✅ Got it!
            </button>
            <button className="btn btn-outline" onClick={() => next(false)} style={{ flex: 1 }}>
              Missed it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   GAME 4 — MEMORY GAME (match tech logos/names)
   ============================================================ */
const CARDS = ['⚛️React', '🐍Python', '🟢Node', '🍃Mongo', '⚡JS', '🐧Linux', '🌿Git', '🐳Docker'];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);

  const init = useCallback(() => {
    const doubled = [...CARDS, ...CARDS]
      .map((v, i) => ({ id: i, val: v }))
      .sort(() => Math.random() - 0.5);
    setCards(doubled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWin(false);
  }, []);

  useEffect(() => { init(); }, [init]);

  const flip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(cards[id]?.val)) return;
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next.map(i => cards[i].val);
      if (a === b) {
        setMatched(m => {
          const nm = [...m, a];
          if (nm.length === CARDS.length) setWin(true);
          return nm;
        });
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || matched.includes(cards[id]?.val);

  return (
    <div className="game-box">
      <div className="game-title">🧠 Tech Memory</div>
      <p className="game-desc">Match the tech pairs! Moves: <b style={{ color: 'var(--accent)' }}>{moves}</b></p>
      {win ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>You won in {moves} moves!</div>
          <p style={{ color: 'var(--text2)', marginBottom: 16 }}>
            {moves < 12 ? '🏆 Excellent memory!' : moves < 18 ? '👍 Not bad!' : '🌱 Keep practising!'}
          </p>
          <button className="btn btn-primary" onClick={init}>Play again</button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8, marginTop: 12,
        }}>
          {cards.map((card, i) => (
            <div
              key={card.id}
              onClick={() => flip(i)}
              style={{
                aspectRatio: '1',
                borderRadius: 8,
                border: `1px solid ${isFlipped(i) ? 'var(--accent)' : 'var(--border)'}`,
                background: isFlipped(i) ? 'rgba(0,229,255,0.08)' : 'var(--bg3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isFlipped(i) ? '1rem' : '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-mono)',
                color: isFlipped(i) ? 'var(--text)' : 'transparent',
                userSelect: 'none',
              }}
            >
              {isFlipped(i) ? (card.val.length > 5 ? card.val.slice(0,2) : card.val) : '?'}
            </div>
          ))}
        </div>
      )}
      {!win && <button className="btn btn-outline" style={{ marginTop: 12, width: '100%' }} onClick={init}>Restart</button>}
    </div>
  );
};

/* ============================================================
   MAIN PLAY PAGE
   ============================================================ */
const Play = () => {
  const [active, setActive] = useState('Type Racer');
  const games = [
    { name: 'Type Racer', component: <TypeRacer /> },
    { name: 'Binary Quiz', component: <BinaryQuiz /> },
    { name: 'Bug Finder', component: <BugFinder /> },
    { name: 'Tech Memory', component: <MemoryGame /> },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <style>{`
        .play-hero {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          padding: 80px 24px;
          text-align: center;
        }
        .game-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin: 40px 0;
        }
        .game-tab {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 10px 22px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg2);
          color: var(--text2);
          cursor: pointer;
          transition: all 0.2s;
        }
        .game-tab:hover { border-color: var(--accent); color: var(--accent); }
        .game-tab.active { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 700; }
        .game-box {
          max-width: 540px;
          margin: 0 auto;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          animation: fadeUp 0.4s ease both;
        }
        .game-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .game-desc {
          color: var(--text2);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
      `}</style>

      <div className="play-hero">
        <div className="section-label" style={{ justifyContent: 'center' }}>Take a break</div>
        <h1 className="section-title">Playground</h1>
        <p style={{ color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          A few mini-games to test your dev reflexes. 
          Actually fun. Actually useful. Actually made by me.
        </p>
      </div>

      <div className="section">
        <div className="game-tabs">
          {games.map(g => (
            <button
              key={g.name}
              className={`game-tab${active === g.name ? ' active' : ''}`}
              onClick={() => setActive(g.name)}
            >
              {g.name}
            </button>
          ))}
        </div>
        {games.find(g => g.name === active)?.component}
      </div>
    </div>
  );
};

export default Play;
