import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterChips from '../components/FilterChips';
import RouteTimeline from '../components/RouteTimeline';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import { useAppState } from '../context/AppStateContext';

const filters = ['Nearby', 'Stories', 'Views', 'Family-friendly'];

export default function ExplorePage() {
  const { spots, walkingRoutes, selectedRoute, selectRoute, progress, isCollected } =
    useAppState();
  const [selectedFilter, setSelectedFilter] = useState('Nearby');

  const filteredSpots = useMemo(
    () =>
      spots.filter((spot) =>
        selectedFilter === 'Nearby' ? spot.distanceMeters <= 400 : spot.tags.includes(selectedFilter),
      ),
    [selectedFilter, spots],
  );

  const routeSpots = selectedRoute.spotIds
    .map((spotId) => spots.find((spot) => spot.id === spotId))
    .filter(Boolean);

  return (
    <div className="page-stack">
      <section className="card explore-map">
        <div className="section-title">
          <div>
            <p className="eyebrow">Map + list hybrid</p>
            <h2>Nearby story stops around Chang Gate</h2>
            <p className="section-description">
              The distances are simulated, but the interface is shaped to feel
              location-aware and easy to use outdoors.
            </p>
          </div>
          <span className="prototype-pill">Mock GPS nearby</span>
        </div>
        <div className="map-surface" role="img" aria-label="Stylised route map">
          <div className="map-waterway" aria-hidden="true" />
          {spots.map((spot) => (
            <Link
              key={spot.id}
              className={`map-marker${isCollected(spot.id) ? ' is-collected' : ''}`}
              to={`/spots/${spot.slug}`}
              style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
              aria-label={`Open ${spot.name}`}
            >
              <span>{spot.shortName}</span>
            </Link>
          ))}
          <div className="map-user-chip">You are near Chang Gate</div>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Choose a lens"
          title="Filter the walk by how you want to explore"
          description="Use quick chips to switch between close-by stops, stories, views, and family-friendly corners."
        />
        <FilterChips
          options={filters}
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />
        <div className="card-grid">
          {filteredSpots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} collected={isCollected(spot.id)} />
          ))}
        </div>
      </section>

      <section className="split-layout section-block">
        <div className="card route-preview">
          <SectionTitle
            eyebrow="Walking journey"
            title={selectedRoute.name}
            description={`${selectedRoute.duration} · ${selectedRoute.distance}`}
          />
          <p className="section-description">{selectedRoute.description}</p>
          <RouteTimeline
            spots={routeSpots}
            collectedIds={progress.collectedSpotIds}
          />
        </div>

        <div className="route-choice-grid">
          {walkingRoutes.map((route) => (
            <article
              key={route.id}
              className={`card route-card${selectedRoute.id === route.id ? ' is-selected' : ''}`}
            >
              <p className="eyebrow">{route.tone}</p>
              <h3>{route.name}</h3>
              <p>{route.description}</p>
              <div className="route-card-meta">
                <span>{route.duration}</span>
                <span>{route.distance}</span>
              </div>
              <button
                type="button"
                className="button button-secondary button-small"
                onClick={() => selectRoute(route.id)}
                aria-pressed={selectedRoute.id === route.id}
              >
                {selectedRoute.id === route.id ? 'Selected route' : 'Use this route'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
