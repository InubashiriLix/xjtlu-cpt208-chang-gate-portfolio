import { Link } from 'react-router-dom';

function formatDistance(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${meters} m`;
}

export default function SpotCard({ spot, collected, compact = false }) {
  const distanceLabel = spot.isDistanceLive
    ? `Current distance: ${formatDistance(spot.distanceMeters)}`
    : `Approx. ${formatDistance(spot.distanceMeters)} from Chang Gate`;

  return (
    <article className={`card spot-card${compact ? ' is-compact' : ''}`}>
      <div className="spot-card-top">
        <span className="spot-category">{spot.category}</span>
        <span className={`status-pill${collected ? ' is-collected' : ''}`}>
          {collected ? 'Stamp collected' : `${spot.walkMinutes} min away`}
        </span>
      </div>
      <h3>{spot.name}</h3>
      <p className="spot-distance">{distanceLabel}</p>
      <p className="spot-snippet">{spot.storySnippet}</p>
      <div className="spot-tags" aria-label="Tags">
        {spot.tags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>
      <div className="spot-card-footer">
        <span className="stamp-mark" aria-hidden="true">
          {spot.stamp.icon}
        </span>
        <span>{spot.stamp.name}</span>
        <Link className="button button-secondary button-small" to={`/spots/${spot.slug}`}>
          Open spot
        </Link>
      </div>
    </article>
  );
}
