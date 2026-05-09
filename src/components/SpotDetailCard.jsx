import { useAppState } from '../context/AppStateContext';

function formatDistance(meters) {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${meters} m`;
}

export default function SpotDetailCard({ spot }) {
  const { isChinese } = useAppState();
  const distancePrefix = spot.isDistanceLive
    ? isChinese ? '当前位置距离' : 'Current distance'
    : isChinese ? '约从阊门出发' : 'Approx. from Chang Gate';

  return (
    <section
      className="detail-hero"
      style={spot.image ? {
        backgroundImage: `url(${spot.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="detail-hero-overlay" />
      <div className="detail-hero-content">
        <div className="detail-hero-meta">
          <span className="spot-category">{spot.category}</span>
          <span className="status-pill">{spot.status}</span>
        </div>
        <h2>{spot.name}</h2>
        <p className="detail-distance">
          {distancePrefix}: {formatDistance(spot.distanceMeters)} · {isChinese ? `步行约 ${spot.walkMinutes} 分钟` : `around ${spot.walkMinutes} minutes on foot`}
        </p>
        <p className="detail-story-lead">{spot.storySnippet}</p>
      </div>
    </section>
  );
}
