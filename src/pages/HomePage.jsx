import { Link } from 'react-router-dom';
import FeatureGrid from '../components/FeatureGrid';
import HeroSection from '../components/HeroSection';
import RouteTimeline from '../components/RouteTimeline';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import { useAppState } from '../context/AppStateContext';
import { featureCards } from '../data/spots';

const chineseFeatureCards = [
  {
    title: '轻量步行体验',
    detail: '用短故事和清晰提示帮助游客在现场快速理解地点。',
    accent: 'teal',
  },
  {
    title: '记忆明信片',
    detail: '把路线、心情和最喜欢的地点转化为可保存的纪念卡片。',
    accent: 'green',
  },
];

export default function HomePage() {
  const { isChinese, spots, selectedRoute } = useAppState();
  const nearbySpots = spots.slice(0, 3);
  const routeSpots = selectedRoute.spotIds
    .map((spotId) => spots.find((spot) => spot.id === spotId))
    .filter(Boolean);

  return (
    <div className="page-stack">
      <HeroSection />

      <section className="section-block">
        <SectionTitle
          eyebrow={isChinese ? '附近地点' : 'Nearby now'}
          title={isChinese ? '从适合步行的轻量地点开始' : 'Start with easy, outdoor-friendly stops'}
          description={
            isChinese
              ? '每个地点都提供短故事、观察提示和适合现场完成的小任务。'
              : 'Each place gives you a short story snippet, something to notice, and a playful mission.'
          }
          actionLabel={isChinese ? '打开地图' : 'Open map'}
          actionTo="/map"
        />
        <div className="card-grid">
          {nearbySpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow={isChinese ? '我们的目标' : 'We Aim at'}
          title={isChinese ? '为步行、记录与回忆而设计' : 'Built for walking, collecting, and remembering'}
          description={
            isChinese
              ? '让文化遗产内容保持简短、适合移动端，并通过互动形成更自然的参与感。'
              : 'Heritage content kept short and mobile, with interactions that feel playful and rewarding.'
          }
        />
        <FeatureGrid items={isChinese ? chineseFeatureCards : featureCards} />
      </section>

      <section className="split-layout section-block">
        <div className="card route-preview">
          <SectionTitle
            eyebrow={isChinese ? '路线预览' : 'Route preview'}
            title={selectedRoute.name}
            description={`${selectedRoute.duration} · ${selectedRoute.distance} · ${selectedRoute.tone}`}
          />
          <p className="section-description">{selectedRoute.description}</p>
          <RouteTimeline
            spots={routeSpots}
          />
        </div>

        <div className="card postcard-teaser">
          <p className="eyebrow">{isChinese ? '纪念预览' : 'Souvenir teaser'}</p>
          <h2>{isChinese ? '把步行体验变成一张明亮的记忆明信片' : 'Turn the walk into a bright memory postcard'}</h2>
          <p>
            {isChinese
              ? '用一张温暖的旅行卡片记录阊门运河片区的步行记忆。'
              : 'Turn the walk into a bright keepsake — a warm travel card capturing the Chang Gate canal district.'}
          </p>
          <div className="postcard-mini">
            <div className="postcard-mini-art" aria-hidden="true" />
            <div>
              <p className="postcard-mini-title">{isChinese ? '明信片氛围预览' : 'Postcard mood preview'}</p>
              <p>{isChinese ? '水岸、城门与一段属于阊门的小故事。' : 'Water, crossings, and a small personal story from Chang Gate.'}</p>
            </div>
          </div>
          <Link className="button button-primary" to="/postcard">
            {isChinese ? '制作明信片' : 'Create postcard'}
          </Link>
        </div>
      </section>
    </div>
  );
}
