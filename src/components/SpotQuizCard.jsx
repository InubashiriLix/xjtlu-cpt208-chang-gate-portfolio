import { useState } from 'react';

export default function SpotQuizCard({ spot, isChinese }) {
  const lang = isChinese ? 'zh' : 'en';
  const { question, options, answerIndex } = spot.quiz[lang];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = submitted && selectedIndex === answerIndex;
  const isWrong = submitted && selectedIndex !== answerIndex;

  function handleSubmit() {
    if (selectedIndex === null) return;
    setSubmitted(true);
  }

  function handleRetry() {
    setSelectedIndex(null);
    setSubmitted(false);
  }

  function getOptionStyle(index) {
    const base = {
      width: '100%',
      textAlign: 'left',
      justifyContent: 'flex-start',
      padding: '12px 16px',
      marginBottom: '8px',
      borderRadius: '12px',
    };

    if (submitted) {
      if (index === answerIndex) {
        return { ...base, background: '#d4edda', border: '1px solid #28a745', color: '#155724' };
      }
      if (index === selectedIndex) {
        return { ...base, background: '#f8d7da', border: '1px solid #dc3545', color: '#721c24' };
      }
      return { ...base, opacity: 0.5 };
    }

    if (index === selectedIndex) {
      return { ...base, border: '2px solid var(--orange)' };
    }

    return base;
  }

  return (
    <section className="card detail-section">
      <p className="eyebrow">{isChinese ? '知识问答' : 'Quick quiz'}</p>
      <h2>{question}</h2>
      <div style={{ marginTop: '16px' }}>
        {options.map((option, i) => (
          <button
            key={i}
            className="button button-secondary"
            style={getOptionStyle(i)}
            onClick={() => !submitted && setSelectedIndex(i)}
            disabled={submitted}
          >
            {option}
          </button>
        ))}
      </div>

      {!submitted && (
        <button
          className="button button-primary"
          style={{ marginTop: '12px' }}
          onClick={handleSubmit}
          disabled={selectedIndex === null}
        >
          {isChinese ? '提交答案' : 'Submit answer'}
        </button>
      )}

      {isCorrect && (
        <p style={{ color: '#28a745', fontWeight: 700, marginTop: '12px', fontSize: '1.05rem' }}>
          ✓ {isChinese ? '回答正确！' : 'Correct!'}
        </p>
      )}

      {isWrong && (
        <div style={{ marginTop: '12px' }}>
          <p style={{ color: '#dc3545', fontWeight: 700, fontSize: '1.05rem' }}>
            ✗ {isChinese ? '回答错误，再试一次' : 'Not quite, try again'}
          </p>
          <button className="button button-secondary button-small" onClick={handleRetry} style={{ marginTop: '8px' }}>
            {isChinese ? '重试' : 'Retry'}
          </button>
        </div>
      )}
    </section>
  );
}
