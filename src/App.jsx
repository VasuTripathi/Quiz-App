import { useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './App.css'

function decodeHtml(html) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = html
  return textArea.value
}

function App() {
  const navigate = useNavigate()
  const { subject } = useParams()
  const [questions, setQuestions] = useState([])
  const [shuffled, setShuffled] = useState(false)
  const [timer, setTimer] = useState(30)
  const timerRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true)
        const path = subject ? `/questions/${subject}.json` : '/questions.json'
        const res = await fetch(path)
        if (!res.ok) throw new Error('Failed to load questions')
        let data = await res.json()
        // Shuffle questions
        data = data.sort(() => Math.random() - 0.5)
        setQuestions(data)
        setShuffled(true)
      } catch (e) {
        setError('Unable to load quiz. Please refresh.')
      } finally {
        setLoading(false)
      }
    }
    loadQuestions()
  }, [subject])

  // Timer logic
  useEffect(() => {
    if (!shuffled || loading || error) return;
    setTimer(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, shuffled, loading, error]);

  const progress = useMemo(() => {
    if (questions.length === 0) return 'Question 0 of 0'
    return `Question ${currentIndex + 1} of ${questions.length} – You’ve got this!`
  }, [currentIndex, questions.length])

  function handleSelect(index) {
    setSelectedOptionIndex(index)
  }

  function handleNext() {
    if (selectedOptionIndex === null) return
    const currentQuestion = questions[currentIndex]
    const isCorrect = selectedOptionIndex === currentQuestion.correctIndex
    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        options: currentQuestion.options,
        correctIndex: currentQuestion.correctIndex,
        selectedIndex: selectedOptionIndex,
      },
    ]
    setAnswers(updatedAnswers)
    setSelectedOptionIndex(null)

    const nextIndex = currentIndex + 1
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex)
    } else {
      const score = updatedAnswers.reduce(
        (acc, a) => acc + (a.selectedIndex === a.correctIndex ? 1 : 0),
        0,
      )
      const prevHigh = Number(localStorage.getItem('highScore') || 0)
  if (score > prevHigh) localStorage.setItem('highScore', String(score))
  // Store quiz history
  const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  history.push({ date: new Date().toLocaleString(), score, total: questions.length });
  localStorage.setItem('quizHistory', JSON.stringify(history));
  navigate('/results', { state: { answers: updatedAnswers, total: questions.length, score } })
    }
  }

  function handlePrev() {
    if (currentIndex === 0) return
    const prevAnswers = answers.slice(0, -1)
    const prevIndex = currentIndex - 1
    setAnswers(prevAnswers)
    setCurrentIndex(prevIndex)
    const prevSelected = prevAnswers[prevIndex]?.selectedIndex ?? null
    setSelectedOptionIndex(prevSelected)
  }

  if (loading) return <div style={{ padding: 16, color: '#ffd200', fontWeight: 700, fontSize: '1.2em' }}>⏳ Warming up your quiz...</div>;
  if (error) return <div style={{ padding: 16, color: '#ef4444', fontWeight: 700 }}>We couldn't load the quiz questions. Please check your connection and refresh.</div>;
  if (questions.length === 0) return <div style={{ padding: 16, color: '#ffd200', fontWeight: 700 }}>No quiz questions found.</div>;

  const q = questions[currentIndex]

  // Emojis for options
  const optionLabels = ['A', 'B', 'C', 'D'];
  // Formal encouragements
  const encouragements = [
    'Stay focused and do your best.',
    'Read carefully before answering.',
    'Keep going, you are doing great!',
  ];
  const encouragement = encouragements[currentIndex % encouragements.length];

  return (
    <div style={{ width: '100%', padding: 16 }}>
      <div className="glass-card" style={{
        maxWidth: 700,
        margin: '32px auto',
        padding: 28,
        background: 'rgba(34,40,49,0.92)',
        boxShadow: '0 8px 32px #1f406855',
        border: '1.5px solid #1f4068',
        borderRadius: 18,
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h1 className="header-title" style={{ color: '#fff', fontSize: '1.6em', fontWeight: 700, letterSpacing: 0.5 }}>{subject ? `${subject.toUpperCase()} Quiz` : 'Quiz'}</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div className="subtle-text" style={{ fontWeight: 600, fontSize: '1em', color: '#e43f5a' }}>{progress}</div>
            <div style={{ color: timer <= 5 ? '#e43f5a' : '#22c55e', fontWeight: 700, fontSize: '1.1em', marginTop: 2 }}>Time left: {timer}s</div>
          </div>
        </header>

        <section>
          <div style={{ marginBottom: 10, fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: 0.2 }}>{decodeHtml(q.question)}</div>
          <div className="subtle-text" style={{ marginBottom: 14, color: '#1f4068', fontWeight: 500 }}>{encouragement}</div>
          <div role="list" aria-label="options" style={{ marginBottom: 14 }}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  aria-pressed={isSelected}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  style={{
                    background: isSelected ? '#e43f5a' : '#162447',
                    color: isSelected ? '#fff' : '#e8eaed',
                    fontWeight: 500,
                    fontSize: '1em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    border: '1px solid #1f4068',
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontWeight: 700, marginRight: 8 }}>{optionLabels[idx]}.</span>
                  <span>{decodeHtml(opt)}</span>
                </button>
              );
            })}
          </div>
        </section>

        <footer style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button onClick={handlePrev} disabled={currentIndex === 0} style={{ background: '#1f4068', color: '#fff', fontWeight: 500, fontSize: '1em', border: 'none', borderRadius: 8, padding: '8px 18px', boxShadow: 'none', letterSpacing: 0.1 }}>Back</button>
          <button onClick={handleNext} disabled={selectedOptionIndex === null} style={{ background: '#e43f5a', color: '#fff', fontWeight: 500, fontSize: '1em', border: 'none', borderRadius: 8, padding: '8px 18px', boxShadow: 'none', letterSpacing: 0.1 }}>{currentIndex === questions.length - 1 ? 'See results' : 'Next'}</button>
        </footer>
      </div>
    </div>
  );
}

export default App
