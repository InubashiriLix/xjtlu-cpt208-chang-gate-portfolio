import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AMapLoader from '@amap/amap-jsapi-loader';
import FilterChips from '../components/FilterChips';
import RouteTimeline from '../components/RouteTimeline';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import { demoUserLocation } from '../data/spots';
import { useAppState } from '../context/AppStateContext';

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
const AMAP_SECURITY_KEY = import.meta.env.VITE_AMAP_SECURITY_KEY;
const MAP_CENTER = demoUserLocation;
const NEARBY_THRESHOLD = 400;
const ROUTE_LINE_STYLE = {
  strokeColor: '#2f8a7d',
  strokeWeight: 4,
  strokeOpacity: 0.76,
  strokeStyle: 'solid',
};

const filters = ['Nearby', 'Stories', 'Views', 'Family-friendly'];

export default function ExplorePage() {
  const { spots, walkingRoutes, selectedRoute, selectRoute, progress, isCollected } =
    useAppState();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('Nearby');
  const [gpsStatus, setGpsStatus] = useState('ready'); // ready | error

  const filteredSpots = useMemo(
    () =>
      spots.filter((spot) =>
        selectedFilter === 'Nearby'
          ? spot.distanceMeters <= NEARBY_THRESHOLD
          : spot.tags.includes(selectedFilter),
      ),
    [selectedFilter, spots],
  );

  const routeSpots = selectedRoute.spotIds
    .map((spotId) => spots.find((spot) => spot.id === spotId))
    .filter(Boolean);

  useEffect(() => {
    let destroyed = false;

    async function initMap() {
      if (!AMAP_KEY) {
        setGpsStatus('error');
        return;
      }

      try {
        const AMap = await AMapLoader.load({
          key: AMAP_KEY,
          version: '2.0',
          securityJsCode: AMAP_SECURITY_KEY,
        });

        if (destroyed) return;

        const map = new AMap.Map(mapRef.current, {
          center: [MAP_CENTER.lng, MAP_CENTER.lat],
          zoom: 15,
          mapStyle: 'amap://styles/light',
          resizeEnable: true,
          showIndoorMap: false,
        });

        mapInstance.current = map;

        spots.forEach((spot) => {
          const marker = new AMap.Marker({
            position: [spot.location.lng, spot.location.lat],
            title: spot.name,
            label: {
              content: `<strong>${spot.shortName}</strong>`,
              direction: 'top',
              offset: new AMap.Pixel(0, -6),
            },
          });
          marker.on('click', () => navigate(`/spots/${spot.slug}`));
          map.add(marker);
        });

        const spotMap = {};
        spots.forEach((spot) => {
          spotMap[spot.id] = spot;
        });
        const routePath = selectedRoute.spotIds
          .map((spotId) => spotMap[spotId])
          .filter(Boolean)
          .map((spot) => [spot.location.lng, spot.location.lat]);

        if (routePath.length > 1) {
          map.add(new AMap.Polyline({ path: routePath, ...ROUTE_LINE_STYLE }));
        }

        const demoMarker = new AMap.Marker({
          position: [demoUserLocation.lng, demoUserLocation.lat],
          title: 'Demo position',
          label: {
            content: '<strong>Demo position</strong>',
            direction: 'top',
            offset: new AMap.Pixel(0, -6),
          },
        });
        map.add(demoMarker);
        map.setZoomAndCenter(16, [demoUserLocation.lng, demoUserLocation.lat]);
      } catch (err) {
        console.error('AMap init error:', err);
        setGpsStatus('error');
      }
    }

    initMap();
    return () => {
      destroyed = true;
      mapInstance.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gpsLabel = () => {
    switch (gpsStatus) {
      case 'locating':
        return 'Locating…';
      case 'ready':
        return 'Demo position';
      case 'error':
        return 'GPS unavailable';
      default:
        return 'GPS';
    }
  };

  const gpsDescription = () => {
    switch (gpsStatus) {
      case 'ready':
        return 'Demo position is used for current distances during the presentation.';
      case 'locating':
        return 'Detecting your GPS position…';
      case 'error':
        return 'Unable to get GPS position. Showing approximate distances. Position services may still work on a mobile device with GPS.';
      default:
        return 'Initialising map…';
    }
  };

  return (
    <div className="page-stack">
      <section className="card explore-map">
        <div className="section-title">
          <div>
            <p className="eyebrow">Map + list hybrid</p>
            <h2>Nearby story stops around Chang Gate</h2>
            <p className="section-description">{gpsDescription()}</p>
          </div>
          <span className={`prototype-pill${gpsStatus === 'ready' ? ' gps-live' : ''}`}>
            {gpsLabel()}
          </span>
        </div>
        <div
          ref={mapRef}
          className="amap-container"
          style={{ minHeight: 360, width: '100%', borderRadius: 28, overflow: 'hidden' }}
        />
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
