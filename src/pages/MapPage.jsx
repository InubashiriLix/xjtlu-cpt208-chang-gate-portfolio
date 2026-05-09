import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AMapLoader from '@amap/amap-jsapi-loader';
import { heritageSpots, walkingRoutes } from '../data/spots';

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
const AMAP_SECURITY_KEY = import.meta.env.VITE_AMAP_SECURITY_KEY;

const MAP_CENTER = { lng: 120.604, lat: 31.317 };

const routeStyles = [
  { strokeColor: '#2f8a7d', strokeWeight: 4, strokeOpacity: 0.7, strokeStyle: 'solid' },
  { strokeColor: '#c9872d', strokeWeight: 4, strokeOpacity: 0.7, strokeStyle: 'dashed' },
];

export default function MapPage() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const initMap = useCallback(async () => {
    if (!AMAP_KEY) {
      setError('Missing VITE_AMAP_KEY in .env');
      return;
    }

    try {
      const AMap = await AMapLoader.load({
        key: AMAP_KEY,
        version: '2.0',
        securityJsCode: AMAP_SECURITY_KEY,
      });

      const map = new AMap.Map(mapRef.current, {
        center: [MAP_CENTER.lng, MAP_CENTER.lat],
        zoom: 15,
        mapStyle: 'amap://styles/light',
        resizeEnable: true,
        showIndoorMap: false,
      });

      mapInstance.current = map;
      setLoaded(true);

      heritageSpots.forEach((spot) => {
        const marker = new AMap.Marker({
          position: [spot.location.lng, spot.location.lat],
          title: spot.name,
          label: {
            content: `<strong>${spot.shortName}</strong>`,
            direction: 'top',
            offset: new AMap.Pixel(0, -6),
          },
          extData: spot,
        });

        marker.on('click', () => {
          const info = new AMap.InfoWindow({
            content: `
              <div style="padding:8px 4px;min-width:160px">
                <div style="font-size:0.75rem;color:#d97b35;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:4px">
                  ${spot.category}
                </div>
                <div style="font-size:1.1rem;font-weight:700;margin-bottom:6px;color:#24323a">
                  ${spot.name}
                </div>
                <p style="font-size:0.85rem;color:#5f6b71;margin:0 0 8px;line-height:1.5">
                  ${spot.storySnippet}
                </p>
                <button
                  data-spot-slug="${spot.slug}"
                  style="background:#d97b35;color:white;border:0;border-radius:999px;padding:8px 18px;font-size:0.85rem;font-weight:700;cursor:pointer"
                >
                  View details →
                </button>
              </div>
            `,
            offset: new AMap.Pixel(0, -32),
          });
          info.open(map, marker);
        });

        markersRef.current.push(marker);
        map.add(marker);
      });

      const spotMap = {};
      heritageSpots.forEach((s) => {
        spotMap[s.id] = s;
      });

      walkingRoutes.forEach((route, i) => {
        const path = route.spotIds
          .map((id) => spotMap[id])
          .filter(Boolean)
          .map((s) => [s.location.lng, s.location.lat]);

        if (path.length < 2) return;

        const polyline = new AMap.Polyline({
          path,
          ...routeStyles[i % routeStyles.length],
        });

        polylinesRef.current.push(polyline);
        map.add(polyline);
      });

      map.setFitView(null, false, [60, 60, 60, 60]);
    } catch (err) {
      console.error('AMap init error:', err);
      setError('Failed to load map. Check your API key and network.');
    }
  }, []);

  useEffect(() => {
    initMap();

    return () => {
      markersRef.current.forEach((m) => m.remove?.());
      markersRef.current = [];
      polylinesRef.current.forEach((p) => p.remove?.());
      polylinesRef.current = [];
      mapInstance.current?.destroy();
      mapInstance.current = null;
    };
  }, [initMap]);

  useEffect(() => {
    const handler = (e) => {
      const btn = e.target.closest('button[data-spot-slug]');
      if (btn) {
        navigate(`/spots/${btn.dataset.spotSlug}`);
      }
    };
    const el = mapRef.current;
    el?.addEventListener('click', handler);
    return () => el?.removeEventListener('click', handler);
  }, [loaded, navigate]);

  return (
    <div className="page-stack" style={{ padding: 0 }}>
      {error && (
        <div className="map-error-banner">
          <p>{error}</p>
          <p className="map-error-hint">
            Make sure VITE_AMAP_KEY is set in .env and the key has JS API access enabled.
          </p>
        </div>
      )}
      <div
        ref={mapRef}
        className="amap-container"
        style={{ minHeight: 'calc(100vh - 200px)', width: '100%', borderRadius: '20px', overflow: 'hidden' }}
      />
      <div className="map-legend">
        {walkingRoutes.map((route, i) => (
          <span key={route.id} className="map-legend-item">
            <span
              className="map-legend-line"
              style={{
                background: routeStyles[i].strokeColor,
                height: routeStyles[i % routeStyles.length].strokeWeight,
                borderTop: routeStyles[i % routeStyles.length].strokeStyle === 'dashed' ? `2px dashed ${routeStyles[i].strokeColor}` : 'none',
              }}
            />
            {route.name}
          </span>
        ))}
      </div>
    </div>
  );
}
