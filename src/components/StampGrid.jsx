export default function StampGrid({ spots, collectedIds }) {
  return (
    <div className="stamp-grid">
      {spots.map((spot) => {
        const isCollected = collectedIds.includes(spot.id);

        return (
          <article
            key={spot.id}
            className={`card stamp-card${isCollected ? ' is-collected' : ' is-locked'}`}
          >
            <div className="stamp-card-mark" aria-hidden="true">
              {isCollected ? spot.stamp.icon : '○'}
            </div>
            <h3>{spot.stamp.name}</h3>
            <p>{spot.shortName}</p>
            <span className="status-pill">
              {isCollected ? 'Collected' : 'Locked until visit'}
            </span>
          </article>
        );
      })}
    </div>
  );
}

