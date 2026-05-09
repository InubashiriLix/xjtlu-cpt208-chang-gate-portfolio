export default function PostcardPreview({ theme, favoriteSpot, collectedSpots }) {
  return (
    <article className="card postcard-preview">
      <div
        className="postcard-art"
        style={{
          background: `linear-gradient(145deg, ${theme.palette[0]}, ${theme.palette[1]})`,
        }}
      >
        <div className="postcard-art-badge">Chang Gate / 阊门</div>
        <div className="postcard-art-copy">
          <p className="eyebrow">Generated souvenir concept</p>
          <h3>{theme.name}</h3>
          <p>{theme.caption}</p>
        </div>
      </div>
      <div className="postcard-body">
        <p className="eyebrow">Route memory</p>
        <h3>{favoriteSpot.name} became the anchor of this walk.</h3>
        <p>
          Built from {collectedSpots.length} visited stops and a {theme.mood.toLowerCase()}
          mood selection, this postcard is a unique keepsake with a
          warm editorial look.
        </p>
        <p className="postcard-signoff">
          “From Chang Gate, with water, crossings, and small discoveries.”
        </p>
      </div>
    </article>
  );
}

