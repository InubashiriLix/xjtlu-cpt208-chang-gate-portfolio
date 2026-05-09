import { Link } from 'react-router-dom';
import FeatureGrid from '../components/FeatureGrid';
import HeroSection from '../components/HeroSection';
import ProgressCard from '../components/ProgressCard';
import RouteTimeline from '../components/RouteTimeline';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import { useAppState } from '../context/AppStateContext';
import { featureCards } from '../data/spots';

export default function HomePage() {
  const { spots, selectedRoute, stats, progress, isCollected } = useAppState();
  const nextSpot = spots.find((spot) => !progress.collectedSpotIds.includes(spot.id)) ?? spots[0];
  const nearbySpots = spots.slice(0, 3);
  const routeSpots = selectedRoute.spotIds
    .map((spotId) => spots.find((spot) => spot.id === spotId))
    .filter(Boolean);

  return (
    <div className="page-stack">
      <HeroSection nextSpot={nextSpot} stats={stats} />

      <ProgressCard stats={stats} />

      <section className="section-block">
        <SectionTitle
          eyebrow="Nearby now"
          title="Start with easy, outdoor-friendly stops"
          description="Each place gives you a short story snippet, something to notice, and a playful mission."
          actionLabel="Open map"
          actionTo="/explore"
        />
        <div className="card-grid">
          {nearbySpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} collected={isCollected(spot.id)} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Core features"
          title="Built for walking, collecting, and remembering"
          description="Heritage content kept short and mobile, with interactions that feel playful and rewarding."
        />
        <FeatureGrid items={featureCards} />
      </section>

      <section className="split-layout section-block">
        <div className="card route-preview">
          <SectionTitle
            eyebrow="Route preview"
            title={selectedRoute.name}
            description={`${selectedRoute.duration} · ${selectedRoute.distance} · ${selectedRoute.tone}`}
          />
          <p className="section-description">{selectedRoute.description}</p>
          <RouteTimeline
            spots={routeSpots}
            collectedIds={progress.collectedSpotIds}
          />
        </div>

        <div className="card postcard-teaser">
          <p className="eyebrow">Souvenir teaser</p>
          <h2>Turn the walk into a bright memory postcard</h2>
          <p>
            Unlock the postcard studio after 3 collected stamps. The final keepsake
            is designed to feel like a warm travel card, not a generic AI output.
          </p>
          <div className="postcard-mini">
            <div className="postcard-mini-art" aria-hidden="true" />
            <div>
              <p className="postcard-mini-title">Postcard mood preview</p>
              <p>Water, crossings, and a small personal story from Chang Gate.</p>
            </div>
          </div>
          <Link className="button button-primary" to="/postcard">
            {stats.postcardUnlocked ? 'Create postcard' : 'See postcard unlock'}
          </Link>
        </div>
      </section>

      <section className="card historic-overlay-card">
        <p className="eyebrow">Historic overlay</p>
        <h2>Compare past and present at the same viewpoint</h2>
        <p>
          An on-site visual layer lets visitors compare today’s walk with
          interpretive heritage views from the same stopping point.
        </p>
      </section>
    </div>
  );
}

