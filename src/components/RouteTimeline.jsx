export default function RouteTimeline({ spots, collectedIds }) {
  return (
    <ol className="timeline">
      {spots.map((spot) => {
        const isCollected = collectedIds.includes(spot.id);

        return (
          <li key={spot.id} className={`timeline-item${isCollected ? ' is-complete' : ''}`}>
            <span className="timeline-dot" aria-hidden="true" />
            <div>
              <h3>{spot.shortName}</h3>
              <p>
                {spot.walkMinutes} min · {spot.category}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

