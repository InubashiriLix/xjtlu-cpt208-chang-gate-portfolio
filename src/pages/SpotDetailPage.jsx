import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import SpotDetailCard from '../components/SpotDetailCard';
import { useAppState } from '../context/AppStateContext';

export default function SpotDetailPage() {
  const { slug } = useParams();
  const { getSpotBySlug, collectStamp, isCollected, spots } = useAppState();
  const spot = getSpotBySlug(slug);

  if (!spot) {
    return (
      <section className="card empty-card">
        <p className="eyebrow">Spot not found</p>
        <h2>This story stop is missing from the prototype data.</h2>
        <Link className="button button-primary" to="/explore">
          Return to explore
        </Link>
      </section>
    );
  }

  const relatedSpots = spot.related
    .map((spotId) => spots.find((item) => item.id === spotId))
    .filter(Boolean);

  return (
    <div className="page-stack">
      <SpotDetailCard
        spot={spot}
        collected={isCollected(spot.id)}
        onCollect={collectStamp}
      />

      <section className="card detail-section">
        <SectionTitle
          eyebrow="Story snippet"
          title={spot.storyTitle}
          description={spot.storyBody}
        />
      </section>

      <section className="detail-grid">
        <article className="card detail-section">
          <SectionTitle
            eyebrow="What to notice"
            title="Observe the place in short, simple prompts"
          />
          <ul className="detail-list">
            {spot.notice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card detail-section mission-card">
          <SectionTitle
            eyebrow="Playful mission"
            title="Try this on-site challenge"
            description={spot.mission}
          />
          <div className="mission-foot">
            <span className="prototype-pill">Outdoor friendly</span>
            <span className="prototype-pill">1 minute task</span>
          </div>
        </article>
      </section>

      <section className="card xr-placeholder">
        <p className="eyebrow">Future XR module</p>
        <h2>Historic overlay preview</h2>
        <p>
          A future layer could place a visual comparison over this viewpoint,
          helping visitors compare present-day textures with an interpretive
          heritage overlay.
        </p>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Keep exploring"
          title="Related story spots nearby"
          description="Continue the walk with connected places that shift from gateway energy to water-side reflection."
        />
        <div className="card-grid">
          {relatedSpots.map((item) => (
            <SpotCard key={item.id} spot={item} collected={isCollected(item.id)} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

