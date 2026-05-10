import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import SpotDetailCard from '../components/SpotDetailCard';
import SpotQuizCard from '../components/SpotQuizCard';
import { useAppState } from '../context/AppStateContext';
import { getNextSpotOnRoute } from '../data/spots';

export default function SpotDetailPage() {
  const { slug } = useParams();
  const { getSpotBySlug, isChinese, selectedRoute, spots } = useAppState();
  const spot = getSpotBySlug(slug);

  if (!spot) {
    return (
      <section className="card empty-card">
        <p className="eyebrow">{isChinese ? '未找到地点' : 'Spot not found'}</p>
        <h2>{isChinese ? '这个故事地点不存在。' : 'This story stop is missing.'}</h2>
        <Link className="button button-primary" to="/map">
          {isChinese ? '返回地图' : 'Return to map'}
        </Link>
      </section>
    );
  }

  const nextSpot = getNextSpotOnRoute(spot.id, selectedRoute, spots);

  return (
    <div className="page-stack">
      <SpotDetailCard
        spot={spot}
      />

      <section className="card detail-section">
        <SectionTitle
          eyebrow={isChinese ? '故事片段' : 'Story snippet'}
          title={spot.storyTitle}
          description={spot.storyBody}
        />
      </section>

      <SpotQuizCard spot={spot} isChinese={isChinese} />

      <section className="section-block">
        <SectionTitle
          eyebrow={isChinese ? '继续探索' : 'Keep exploring'}
          title={nextSpot ? (isChinese ? '路线下一站' : 'Next spot on the route') : (isChinese ? '路线完成' : 'Route complete')}
          description={
            nextSpot
              ? isChinese ? '继续前往阊门步行路线中的下一站。' : 'Continue with the next stop in the planned Chang Gate walking order.'
              : isChinese ? '这是阊门步行路线中的最后一站。' : 'This is the final stop in the planned Chang Gate walking order.'
          }
        />
        {nextSpot ? <SpotCard spot={nextSpot} compact /> : null}
      </section>
    </div>
  );
}
