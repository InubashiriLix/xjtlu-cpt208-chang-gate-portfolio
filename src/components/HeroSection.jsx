import { Link } from 'react-router-dom';

export default function HeroSection({ nextSpot, stats, onReset }) {
  const isComplete = stats.collectedCount >= stats.totalSpots;

  return (
    <section className="hero card">
      <div className="hero-copy">
        <p className="eyebrow">Heritage walk + playful discovery</p>
        <h2>Canal Quest at Chang Gate</h2>
        <p className="hero-description">
          A bright, mobile-first companion for walking, noticing, collecting, and
          remembering the Chang Gate canal district.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/explore">
            Start exploring
          </Link>
          <Link className="button button-secondary" to="/stamps">
            View stamps
          </Link>
        </div>
      </div>
      <div className="hero-panel">
        <div className="hero-stat">
          <span className="hero-stat-label">Collected</span>
          <strong>
            {stats.collectedCount}/{stats.totalSpots}
          </strong>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-label">Walked</span>
          <strong>{(stats.walkedMeters / 1000).toFixed(1)} km</strong>
        </div>
        <div className="hero-next-stop">
          <p className="eyebrow">{isComplete ? 'Walk complete' : 'Continue with'}</p>
          <h3>{nextSpot.name}</h3>
          <p>
            {nextSpot.walkMinutes} min away · {nextSpot.category}
          </p>
          <p className="hero-next-story">{nextSpot.storySnippet}</p>
          {isComplete && onReset ? (
            <button
              type="button"
              className="button button-primary hero-reset-button"
              onClick={onReset}
            >
              Reset route
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
