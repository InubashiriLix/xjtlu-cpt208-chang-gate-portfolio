import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppState } from '../context/AppStateContext';

function buildProgressSummary({ spots, progress, selectedRoute, stats, currentLocation }) {
  const collected = spots.filter((spot) => progress.collectedSpotIds.includes(spot.id));
  const remaining = spots.filter((spot) => !progress.collectedSpotIds.includes(spot.id));

  return {
    app: 'Canal Quest at Chang Gate',
    currentLocation,
    selectedRoute: {
      name: selectedRoute.name,
      order: selectedRoute.spotIds,
      duration: selectedRoute.duration,
      distance: selectedRoute.distance,
    },
    progress: {
      collectedCount: stats.collectedCount,
      totalSpots: stats.totalSpots,
      progressPercent: stats.progressPercent,
      walkedMeters: stats.walkedMeters,
      postcardUnlocked: stats.postcardUnlocked,
    },
    collectedStops: collected.map((spot) => ({
      id: spot.id,
      name: spot.name,
      category: spot.category,
      distanceMeters: spot.distanceMeters,
      mission: spot.mission,
    })),
    remainingStops: remaining.map((spot) => ({
      id: spot.id,
      name: spot.name,
      category: spot.category,
      distanceMeters: spot.distanceMeters,
      storySnippet: spot.storySnippet,
      mission: spot.mission,
    })),
  };
}

function buildMessages(progressSummary, userQuestion) {
  return [
    {
      role: 'system',
      content:
        'You are a concise onsite heritage walk assistant for Canal Quest at Chang Gate. Use the supplied live progress JSON as truth. Recommend the next practical stop, explain why it fits the route, and keep advice outdoor-friendly. Do not invent locations outside the provided data. Answer in the same language as the user when possible.',
    },
    {
      role: 'user',
      content: [
        'Visitor progress JSON:',
        JSON.stringify(progressSummary, null, 2),
        '',
        'Visitor request:',
        userQuestion || 'Give me the best next step for this visitor.',
      ].join('\n'),
    },
  ];
}

export default function DeepSeekPage() {
  const { spots, progress, selectedRoute, stats, currentLocation } = useAppState();
  const [question, setQuestion] = useState(
    'Based on my current progress, what should I visit next and what should I notice there?',
  );
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const progressSummary = useMemo(
    () => buildProgressSummary({ spots, progress, selectedRoute, stats, currentLocation }),
    [currentLocation, progress, selectedRoute, spots, stats],
  );

  const remainingCount = progressSummary.remainingStops.length;
  const nextStop = progressSummary.remainingStops[0] ?? progressSummary.collectedStops[0];

  async function askDeepSeek() {
    setStatus('loading');
    setError('');
    setAnswer('');

    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: buildMessages(progressSummary, question),
          temperature: 0.45,
          max_tokens: 650,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'DeepSeek request failed.');
      }

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('DeepSeek returned an empty answer.');
      }

      setAnswer(content);
      setStatus('ready');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <div className="page-stack">
      <section className="card ai-guide-card">
        <SectionTitle
          eyebrow="DeepSeek guide"
          title="Ask for route advice from your current progress"
          description="The assistant receives your collected stamps, remaining stops, route order, and demo position."
        />

        <div className="ai-progress-grid">
          <div className="selection-card">
            <span className="hero-stat-label">Collected</span>
            <strong>{stats.collectedCount}/{stats.totalSpots}</strong>
          </div>
          <div className="selection-card">
            <span className="hero-stat-label">Remaining</span>
            <strong>{remainingCount}</strong>
          </div>
          <div className="selection-card">
            <span className="hero-stat-label">Next route stop</span>
            <strong>{nextStop?.name ?? 'Route complete'}</strong>
          </div>
        </div>

        <label className="selection-block">
          <span className="selection-label">Question</span>
          <textarea
            className="postcard-message-input ai-question-input"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows={4}
          />
        </label>

        <div className="generator-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={askDeepSeek}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Asking DeepSeek...' : 'Ask DeepSeek'}
          </button>
          <p className="generator-note" aria-live="polite">
            {status === 'loading'
              ? 'Sending route progress and prompt to DeepSeek.'
              : 'The prompt includes only route progress and walk context.'}
          </p>
        </div>
      </section>

      {error ? (
        <section className="map-error-banner">
          <p>{error}</p>
          <p className="map-error-hint">Check `.env` API_KEY and network access.</p>
        </section>
      ) : null}

      {answer ? (
        <section className="card ai-answer-card">
          <p className="eyebrow">DeepSeek response</p>
          <div className="ai-answer-text">{answer}</div>
        </section>
      ) : null}
    </div>
  );
}
