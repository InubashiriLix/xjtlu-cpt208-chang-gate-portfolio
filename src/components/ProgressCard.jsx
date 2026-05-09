import { Link } from 'react-router-dom';

export default function ProgressCard({ stats }) {
  return (
    <section className="card progress-card">
      <div>
        <p className="eyebrow">Progress overview</p>
        <h3>{stats.progressPercent}% of the walk completed</h3>
        <p>
          You have collected {stats.collectedCount} of {stats.totalSpots} heritage
          stamps and walked about {(stats.walkedMeters / 1000).toFixed(1)} km.
        </p>
      </div>
      <div className="progress-bar" aria-hidden="true">
        <span style={{ width: `${stats.progressPercent}%` }} />
      </div>
      <div className="progress-actions">
        <Link className="text-link" to="/explore">
          Keep walking
        </Link>
        <Link className="text-link" to="/postcard">
          {stats.postcardUnlocked ? 'Open postcard studio' : 'Postcard unlock at 3 stamps'}
        </Link>
      </div>
    </section>
  );
}
