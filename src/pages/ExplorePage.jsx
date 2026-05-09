import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AMapLoader from '@amap/amap-jsapi-loader';
import FilterChips from '../components/FilterChips';
import RouteTimeline from '../components/RouteTimeline';
import SectionTitle from '../components/SectionTitle';
import SpotCard from '../components/SpotCard';
import { useAppState } from '../context/AppStateContext';

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
const AMAP_SECURITY_KEY = import.meta.env.VITE_AMAP_SECURITY_KEY;
const MAP_CENTER = { lng: 120.604, lat: 31.317 };
const NEARBY_THRESHOLD = 400;

const filters = ['Nearby', 'Stories', 'Views', 'Family-friendly'];

function haversineMeters(lng1, lat1, lng2, lat2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ExplorePage() {
  const { spots, walkingRoutes, selectedRoute, selectRoute, progress, isCollected } =
    useAppState();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('Nearby');
  const [gpsStatus, setGpsStatus] = useState('idle'); // idle | locating | ready | error
  const [computedDistances, setComputedDistances] = useState({});

  const spotsWithDistances = useMemo(
    () =>
      spots.map((spot) => ({
        ...spot,
        distanceMeters: computedDistances[spot.id] ?? spot.distanceMeters,
        walkMinutes: computedDistances[spot.id]
          ? Math.max(1, Math.round(computedDistances[spot.id] / 80))
          : spot.walkMinutes,
      })),
    [spots, computedDistances],
  );

  const filteredSpots = useMemo(
    () =>
      spotsWithDistances.filter((spot) =>
        selectedFilter === 'Nearby'
          ? spot.distanceMeters <= NEARBY_THRESHOLD
          : spot.tags.includes(selectedFilter),
      ),
    [selectedFilter, spotsWithDistances],
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

        AMap.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            showMarker: true,
            showCircle: true,
            panToLocation: false,
            zoomToAccuracy: false,
          });

          setGpsStatus('locating');

          geolocation.getCurrentPosition((status, result) => {
            if (destroyed) return;

            if (status === 'complete') {
              const lat = result.position.getLat();
              const lng = result.position.getLng();

              setGpsStatus('ready');
              map.setCenter([lng, lat]);

              const dists = {};
              spots.forEach((spot) => {
                dists[spot.id] = Math.round(
                  haversineMeters(lng, lat, spot.location.lng, spot.location.lat),
                );
              });
              setComputedDistances(dists);
            } else {
              setGpsStatus('error');
            }
          });
        });
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
        return 'Live GPS';
      case 'error':
        return 'GPS unavailable';
      default:
        return 'GPS';
    }
  };

  const gpsDescription = () => {
    switch (gpsStatus) {
      case 'ready':
        return 'Live GPS shows your position and real distances to each stop.';
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
