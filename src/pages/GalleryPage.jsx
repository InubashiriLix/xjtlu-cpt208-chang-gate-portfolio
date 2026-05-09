import SectionTitle from '../components/SectionTitle';
import { useAppState } from '../context/AppStateContext';
import { galleryViews, localizeGalleryView } from '../data/galleryViews';

export default function GalleryPage() {
  const { isChinese, language } = useAppState();
  const [featuredView, ...supportingViews] = galleryViews.map((view) =>
    localizeGalleryView(view, language),
  );

  return (
    <div className="page-stack">
      <section className="gallery-hero">
        <img src={featuredView.image} alt={featuredView.alt} />
        <div className="gallery-hero-copy">
          <p className="eyebrow">{isChinese ? '现场图集' : 'Field gallery'}</p>
          <h2>{isChinese ? '塑造阊门步行体验的真实视角' : 'Real views that shape the Chang Gate walk'}</h2>
          <p>
            {isChinese
              ? '这些照片让体验扎根于真实场地氛围：城门、城墙、运河、树木，以及围绕它们发生的日常流动。'
              : 'These photos ground the experience in actual site atmosphere: gate, wall, canal, trees, and the everyday movement around them.'}
          </p>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow={isChinese ? '图集注释' : 'Gallery notes'}
          title={isChinese ? '支撑路线故事的照片瞬间' : 'Photo moments that support the route story'}
          description={
            isChinese
              ? '每张图片都被视为现场观察，让图集与探索过程和最终明信片记忆保持连接。'
              : 'Each image is treated as a field observation, so the gallery feels connected to exploration and the final postcard memory.'
          }
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
