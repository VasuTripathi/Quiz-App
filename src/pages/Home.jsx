import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [difficulty, setDifficulty] = useState('medium');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    setHistory(h.reverse());
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(120deg, #1b1b2f 0%, #162447 100%)', padding: 0, fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '36px 0 18px 0', background: '#162447', boxShadow: '0 2px 12px #1f406855' }}>
        <img src="/quiz.svg" alt="Quiz App" style={{ width: 54, marginBottom: 8 }} />
        <h1 style={{ fontSize: '2.1em', margin: 0, color: '#fff', fontWeight: 700, letterSpacing: 0.5 }}>College Quiz Portal</h1>
        <p style={{ fontSize: '1.08em', color: '#e8eaed', marginTop: 8 }}>Sharpen your mind. Practice. Succeed.</p>
      </header>
      <main style={{ maxWidth: 520, margin: '0 auto', padding: '28px 12px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        {history.length > 0 && (
          <div style={{ marginBottom: 18, background: '#162447', borderRadius: 10, padding: '12px 16px', color: '#e8eaed' }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Quiz History</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {history.slice(0, 5).map((h, idx) => (
                <li key={idx} style={{ marginBottom: 4, fontSize: '0.98em' }}>
                  {h.date}: <span style={{ color: '#22c55e', fontWeight: 600 }}>{h.score}/{h.total}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ marginBottom: 18, textAlign: 'center' }}>
          <label htmlFor="difficulty" style={{ color: '#e8eaed', fontWeight: 600, marginRight: 10 }}>Select Difficulty:</label>
          <select id="difficulty" value={difficulty} onChange={e => setDifficulty(e.target.value)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #1f4068', fontWeight: 500, fontSize: '1em', background: '#162447', color: '#fff' }}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <Link to={`/quiz/quants?difficulty=${difficulty}`} style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '16px 0', fontSize: '1.08em', fontWeight: 600, borderRadius: 10, background: '#1f4068', color: '#fff', marginBottom: 8, boxShadow: '0 2px 8px #1f406855', border: 'none', letterSpacing: 0.2 }}>Start Quiz</button>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '16px 0', fontSize: '1.08em', fontWeight: 600, borderRadius: 10, background: '#e43f5a', color: '#fff', marginBottom: 8, boxShadow: '0 2px 8px #e43f5a55', border: 'none', letterSpacing: 0.2 }}>Choose Category</button>
        </Link>
        <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '16px 0', fontSize: '1.08em', fontWeight: 600, borderRadius: 10, background: '#162447', color: '#fff', marginBottom: 8, boxShadow: '0 2px 8px #16244755', border: 'none', letterSpacing: 0.2 }}>Leaderboard</button>
        </Link>
        <Link to="/settings" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '16px 0', fontSize: '1.08em', fontWeight: 600, borderRadius: 10, background: '#1b1b2f', color: '#fff', marginBottom: 8, boxShadow: '0 2px 8px #1b1b2f55', border: 'none', letterSpacing: 0.2 }}>Settings</button>
        </Link>
        <Link to="/admin" style={{ textDecoration: 'none' }}>
          <button style={{ width: '100%', padding: '16px 0', fontSize: '1.08em', fontWeight: 600, borderRadius: 10, background: '#22c55e', color: '#fff', marginBottom: 8, boxShadow: '0 2px 8px #22c55e55', border: 'none', letterSpacing: 0.2 }}>Admin Panel</button>
        </Link>
      </main>
    </div>
  );
}


