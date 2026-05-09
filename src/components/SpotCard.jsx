import { Link } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

function formatDistance(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${meters} m`;
}

export default function SpotCard({ spot, compact = false }) {
  const { isChinese } = useAppState();
  const distanceLabel = spot.isDistanceLive
    ? `${isChinese ? '当前位置距离' : 'Current distance'}: ${formatDistance(spot.distanceMeters)}`
    : isChinese
      ? `约 ${formatDistance(spot.distanceMeters)}，从阊门出发`
      : `Approx. ${formatDistance(spot.distanceMeters)} from Chang Gate`;

  return (
    <article className={`card spot-card${compact ? ' is-compact' : ''}`}>
      <div className="spot-card-top">
        <span className="spot-category">{spot.category}</span>
        <span className="status-pill">{isChinese ? `${spot.walkMinutes} 分钟` : `${spot.walkMinutes} min away`}</span>
      </div>
      <h3>{spot.name}</h3>
      <p className="spot-distance">{distanceLabel}</p>
      <p className="spot-snippet">{spot.storySnippet}</p>
      <div className="spot-tags" aria-label={isChinese ? '标签' : 'Tags'}>
        {spot.tags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>
      <div className="spot-card-footer">
        <Link className="button button-secondary button-small" to={`/spots/${spot.slug}`}>
          {isChinese ? '打开地点' : 'Open spot'}
        </Link>
      </div>
    </article>
  );
}
