import SectionTitle from '../components/SectionTitle';
import { galleryViews } from '../data/galleryViews';

export default function GalleryPage() {
  const [featuredView, ...supportingViews] = galleryViews;

  return (
    <div className="page-stack">
      <section className="gallery-hero">
        <img src={featuredView.image} alt={featuredView.alt} />
        <div className="gallery-hero-copy">
          <p className="eyebrow">Field gallery</p>
          <h2>Real views that shape the Chang Gate walk</h2>
          <p>
            These photos ground the prototype in actual site atmosphere: gate,
            wall, canal, trees, and the everyday movement around them.
          </p>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Gallery notes"
          title="Photo moments that support the route story"
          description="Each image is treated as a field observation, so the gallery feels connected to exploration, stamps, and the final postcard memory."
        />
        <div className="gallery-grid">
          {supportingViews.map((view) => (
            <article key={view.id} className="card gallery-card">
              <div className="gallery-card-image">
                <img src={view.image} alt={view.alt} loading="lazy" />
              </div>
              <div className="gallery-card-body">
                <p className="eyebrow">{view.lens}</p>
                <h3>{view.title}</h3>
                <p>{view.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

