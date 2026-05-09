function formatDistance(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${meters} m`;
}

export default function SpotDetailCard({ spot, collected, onCollect }) {
  const distancePrefix = spot.isDistanceLive ? 'Current distance' : 'Approx. from Chang Gate';

  return (
    <section className="card detail-hero">
      <div className="detail-hero-meta">
        <span className="spot-category">{spot.category}</span>
        <span className="status-pill">{spot.status}</span>
      </div>
      <h2>{spot.name}</h2>
      <p className="detail-distance">
        {distancePrefix}: {formatDistance(spot.distanceMeters)} · around {spot.walkMinutes} minutes on foot
      </p>
      <p className="detail-story-lead">{spot.storySnippet}</p>
      <div className="detail-hero-actions">
        <button
          className={`button ${collected ? 'button-secondary' : 'button-primary'}`}
          type="button"
          onClick={() => onCollect(spot.id)}
          disabled={collected}
          aria-label={collected ? 'Stamp already collected' : 'Collect memory stamp'}
        >
          {collected ? 'Stamp already collected' : 'Collect memory stamp'}
        </button>
        <span className="status-pill">Stamp: {spot.stamp.name}</span>
      </div>
    </section>
  );
}
