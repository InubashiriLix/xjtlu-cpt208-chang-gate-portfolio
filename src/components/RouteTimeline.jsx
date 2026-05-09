import { useAppState } from '../context/AppStateContext';

export default function RouteTimeline({ spots }) {
  const { isChinese } = useAppState();

  return (
    <ol className="timeline">
      {spots.map((spot) => (
        <li key={spot.id} className="timeline-item">
          <span className="timeline-dot" aria-hidden="true" />
          <div>
            <h3>{spot.shortName}</h3>
            <p>
              {isChinese ? `${spot.walkMinutes} 分钟` : `${spot.walkMinutes} min`} · {spot.category}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
