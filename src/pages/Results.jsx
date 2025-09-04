import { useLocation, useNavigate } from 'react-router-dom'

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const answers = state?.answers ?? [];
  const total = state?.total ?? 0;
  const score = state?.score ?? 0;

  // Score header
  let headerText = '';
  if (score === total) {
    headerText = `Excellent! You scored ${score}/${total}`;
  } else if (score >= Math.ceil(total * 0.7)) {
    headerText = `Good job! You scored ${score}/${total}`;
  } else {
    headerText = `Keep practicing! You scored ${score}/${total}`;
  }

  // Explanations for each question
  const explanations = [
    "Total marbles = 12. Ways to choose 3 marbles = 220. Ways to choose 3 black marbles = 20. Probability = 20/220 = 1/11.",
    "Let first term = a, common difference = d. Second term: a+d=8. 8th term: a+7d=26. Solving gives d=3, a=5. Sum = 10[10+57]=670.",
    "A's 1 day work = 1/20, A+B's 1 day work = 1/12. B's 1 day work = 1/12 - 1/20 = 1/30. So, B alone takes 30 days.",
    "Total marks = 270, max = 400. Percentage = (270/400)*100 = 67.5%.",
    "Total weight of 10 students = 450 kg. New total = 506 kg. New student's weight = 506 - 450 = 56 kg."
  ];

  return (
    <div style={{ width: '100%', padding: 16 }}>
      <div className="glass-card" style={{ maxWidth: 700, margin: '32px auto', padding: 28, background: 'rgba(34,40,49,0.92)', boxShadow: '0 8px 32px #1f406855', border: '1.5px solid #1f4068', borderRadius: 18, fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif', overflow: 'hidden' }}>
        <header style={{ textAlign: 'center', marginBottom: 18 }}>
          <h1 className="header-title" style={{ color: '#fff', fontSize: '1.5em', fontWeight: 700, letterSpacing: 0.5 }}>{headerText}</h1>
          <div className="subtle-text" style={{ fontWeight: 600, fontSize: '1em', color: '#e43f5a', marginTop: 6 }}>Best so far: <strong>{localStorage.getItem('highScore') || 0}</strong></div>
        </header>

        <ol style={{ paddingLeft: 18, marginTop: 18 }}>
          {answers.map((a, idx) => {
            const correct = a.selectedIndex === a.correctIndex;
            return (
              <li key={idx} style={{ marginBottom: 18, background: correct ? '#1f4068' : '#e43f5a22', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 600, marginBottom: 6, color: '#fff' }}>{a.question}</div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: '#e8eaed' }}>Your pick: </span>
                  <span style={{ color: correct ? '#22c55e' : '#e43f5a', fontWeight: 600 }}>{a.options[a.selectedIndex]}</span>
                </div>
                {!correct && (
                  <div>
                    <span style={{ color: '#e8eaed' }}>Correct answer: </span>
                    <span style={{ color: '#22c55e', fontWeight: 600 }}>{a.options[a.correctIndex]}</span>
                    <div style={{ marginTop: 6, color: '#ffd700', fontSize: '0.98em' }}>
                      <strong>Explanation:</strong> {explanations[idx]}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <footer style={{ display: 'flex', gap: 10, marginTop: 22, justifyContent: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: '#1f4068', color: '#fff', fontWeight: 500, fontSize: '1em', border: 'none', borderRadius: 8, padding: '8px 18px', boxShadow: 'none', letterSpacing: 0.1 }}>Go Home</button>
          <button onClick={() => navigate(0)} style={{ background: '#e43f5a', color: '#fff', fontWeight: 500, fontSize: '1em', border: 'none', borderRadius: 8, padding: '8px 18px', boxShadow: 'none', letterSpacing: 0.1 }}>Try Again</button>
          <button onClick={() => navigate('/review', { state })} style={{ background: '#22c55e', color: '#fff', fontWeight: 500, fontSize: '1em', border: 'none', borderRadius: 8, padding: '8px 18px', boxShadow: 'none', letterSpacing: 0.1 }}>Review Answers</button>
        </footer>
      </div>
    </div>
  );
}


