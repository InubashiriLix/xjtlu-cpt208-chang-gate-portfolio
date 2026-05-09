import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import SpotDetailCard from '../components/SpotDetailCard';
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

      <section className="card detail-section">
        <SectionTitle
          eyebrow={isChinese ? '观察提示' : 'What to notice'}
          title={isChinese ? '用简短提示观察这个地点' : 'Observe the place in short, simple prompts'}
        />
        <ul className="detail-list">
          {spot.notice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card historic-overlay-card">
        <p className="eyebrow">{isChinese ? '历史叠加' : 'Historic overlay'}</p>
        <h2>{isChinese ? '在同一视角比较过去与现在' : 'Compare past and present at this viewpoint'}</h2>
        <p>
          {isChinese
            ? '视觉比较层可以帮助游客把当下的空间质感与同一停留点的遗产解读画面对照。'
            : 'A visual comparison layer lets visitors match present-day textures with an interpretive heritage overlay from the same stopping point.'}
        </p>
      </section>

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
