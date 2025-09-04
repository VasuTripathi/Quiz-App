import { useState } from 'react';

export default function Admin() {
  const [questions, setQuestions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminQuestions') || '[]');
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({ question: '', options: ['', '', '', ''], correctIndex: 0 });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleOptionChange(idx, value) {
    const opts = [...form.options];
    opts[idx] = value;
    setForm({ ...form, options: opts });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestions = [...questions, { ...form, correctIndex: Number(form.correctIndex) }];
    setQuestions(newQuestions);
    localStorage.setItem('adminQuestions', JSON.stringify(newQuestions));
    setForm({ question: '', options: ['', '', '', ''], correctIndex: 0 });
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(120deg, #1b1b2f 0%, #162447 100%)', padding: 0, fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif' }}>
      <div className="glass-card" style={{ maxWidth: 600, margin: '32px auto', padding: 28, background: 'rgba(34,40,49,0.92)', boxShadow: '0 8px 32px #1f406855', border: '1.5px solid #1f4068', borderRadius: 18, fontFamily: 'inherit', overflow: 'hidden' }}>
        <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 18 }}>Admin Panel: Add/Edit Questions</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#e8eaed', fontWeight: 600 }}>Question:</label><br />
            <input name="question" value={form.question} onChange={handleChange} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #1f4068', marginTop: 4 }} required />
          </div>
          {form.options.map((opt, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <label style={{ color: '#e8eaed', fontWeight: 500 }}>Option {String.fromCharCode(65 + idx)}:</label><br />
              <input value={opt} onChange={e => handleOptionChange(idx, e.target.value)} style={{ width: '100%', padding: 6, borderRadius: 8, border: '1px solid #1f4068', marginTop: 2 }} required />
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#e8eaed', fontWeight: 600 }}>Correct Option:</label><br />
            <select name="correctIndex" value={form.correctIndex} onChange={handleChange} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #1f4068', fontWeight: 500, fontSize: '1em', background: '#162447', color: '#fff', marginTop: 2 }}>
              <option value={0}>A</option>
              <option value={1}>B</option>
              <option value={2}>C</option>
              <option value={3}>D</option>
            </select>
          </div>
          <button type="submit" style={{ background: '#22c55e', color: '#fff', fontWeight: 600, fontSize: '1em', border: 'none', borderRadius: 8, padding: '8px 18px', boxShadow: 'none', letterSpacing: 0.1 }}>Add Question</button>
        </form>
        <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: 10 }}>Current Questions</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {questions.map((q, idx) => (
            <li key={idx} style={{ marginBottom: 12, background: '#162447', borderRadius: 8, padding: '10px 12px', color: '#e8eaed' }}>
              <div style={{ fontWeight: 600 }}>{q.question}</div>
              <div style={{ marginTop: 4 }}>
                {q.options.map((opt, i) => (
                  <span key={i} style={{ marginRight: 10 }}>{String.fromCharCode(65 + i)}. {opt}{i === q.correctIndex && <span style={{ color: '#22c55e', fontWeight: 700 }}> (Correct)</span>}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
