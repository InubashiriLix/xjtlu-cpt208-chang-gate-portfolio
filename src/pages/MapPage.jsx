import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useAppState } from '../context/AppStateContext';
import { changGateLocation, getNextSpotOnRoute } from '../data/spots';

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
const AMAP_SECURITY_KEY = import.meta.env.VITE_AMAP_SECURITY_KEY;

const MAP_CENTER = changGateLocation;
const MAX_MAP_ZOOM = 20;

const routeStyles = [
  { strokeColor: '#2f8a7d', strokeWeight: 4, strokeOpacity: 0.7, strokeStyle: 'solid' },
  { strokeColor: '#c9872d', strokeWeight: 4, strokeOpacity: 0.7, strokeStyle: 'dashed' },
];

export default function MapPage() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const polylinesRef = useRef([]);
  const infoRef = useRef(null);
  const AMapRef = useRef(null);
  const navigate = useNavigate();
  const { isChinese, spots: heritageSpots, walkingRoutes } = useAppState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  function makeInfoContent(spot) {
    const nextSpot = getNextSpotOnRoute(spot.id, walkingRoutes[0], heritageSpots);

    return `
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
        <p style="font-size:0.8rem;color:#2f8a7d;margin:0 0 10px;line-height:1.45;font-weight:700">
          ${nextSpot ? `${isChinese ? '路线下一站' : 'Next on route'}: ${nextSpot.name}` : isChinese ? '这是路线最后一站' : 'Final stop on this route'}
        </p>
        <button
          data-spot-slug="${spot.slug}"
          style="background:#d97b35;color:white;border:0;border-radius:999px;padding:8px 18px;font-size:0.85rem;font-weight:700;cursor:pointer"
        >
          ${isChinese ? '打开地点' : 'Open spot'} →
        </button>
      </div>
    `;
  }

  const guideToSpot = useCallback((spot) => {
    const map = mapInstance.current;
    const marker = markersRef.current[spot.id];
    if (!map || !marker) return;

    infoRef.current?.close();
    const info = new (AMapRef.current.InfoWindow)({
      content: makeInfoContent(spot),
      offset: new (AMapRef.current.Pixel)(0, -32),
    });
    info.open(map, marker);
    infoRef.current = info;

    map.setZoom(MAX_MAP_ZOOM);
    map.panTo([spot.location.lng, spot.location.lat]);
  }, [isChinese]);

  const initMap = useCallback(async () => {
    if (!AMAP_KEY) {
      setError(isChinese ? '缺少 .env 中的 VITE_AMAP_KEY' : 'Missing VITE_AMAP_KEY in .env');
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
        zoom: MAX_MAP_ZOOM,
        zooms: [3, MAX_MAP_ZOOM],
        mapStyle: 'amap://styles/light',
        resizeEnable: true,
        showIndoorMap: false,
      });

      mapInstance.current = map;
      AMapRef.current = AMap;
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
            content: makeInfoContent(spot),
            offset: new AMap.Pixel(0, -32),
          });
          infoRef.current?.close();
          info.open(map, marker);
          infoRef.current = info;
        });

        markersRef.current[spot.id] = marker;
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

      map.setZoomAndCenter(MAX_MAP_ZOOM, [MAP_CENTER.lng, MAP_CENTER.lat]);
    } catch (err) {
      console.error('AMap init error:', err);
      setError(isChinese ? '地图加载失败。请检查 API key 和网络。' : 'Failed to load map. Check your API key and network.');
    }
  }, [heritageSpots, isChinese, walkingRoutes]);

  useEffect(() => {
    initMap();

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove?.());
      markersRef.current = {};
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

  function handleSpotClick(spot) {
    guideToSpot(spot);
  }

  return (
    <div className="page-stack" style={{ padding: 0 }}>
      {error && (
        <div className="map-error-banner">
          <p>{error}</p>
          <p className="map-error-hint">
            {isChinese
              ? '请确认 .env 已设置 VITE_AMAP_KEY，并且 key 已启用 JS API。'
              : 'Make sure VITE_AMAP_KEY is set in .env and the key has JS API access enabled.'}
          </p>
        </div>
      )}
      <div
        ref={mapRef}
        className="amap-container"
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

      <section className="section-block">
        <h2 className="map-spotlist-title">
          <span className="eyebrow">{isChinese ? '步行路线' : 'Walking route'}</span>
          {isChinese ? '所有地点顺序' : 'All Stops in Order'}
        </h2>
        <ol className="map-spotlist">
          {heritageSpots.map((spot, i) => {
            const nextSpot = getNextSpotOnRoute(spot.id, walkingRoutes[0], heritageSpots);

            return (
              <li
                key={spot.id}
                className="map-spotlist-item is-unvisited"
                onClick={() => handleSpotClick(spot)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSpotClick(spot); }}
              >
                <span className="map-spotlist-number">{i + 1}</span>
                <div className="map-spotlist-body">
                  <div className="map-spotlist-top">
                    <span className="spot-category">{spot.category}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="tag-chip">{isChinese ? `${spot.walkMinutes} 分钟` : `${spot.walkMinutes} min`} · {spot.distanceMeters}m</span>
                    </div>
                  </div>
                  <h3 className="map-spotlist-name">{spot.name}</h3>
                  <p className="map-spotlist-snippet">{spot.storySnippet}</p>
                  <p className="map-spotlist-next">
                    {nextSpot ? `${isChinese ? '下一站' : 'Next spot'}: ${nextSpot.name}` : isChinese ? '这是路线最后一站' : 'Final spot on this route'}
                  </p>
                  <div className="map-spotlist-footer">
                    <a className="button button-primary button-small map-spotlist-open" href={`/spots/${spot.slug}`}
                       onClick={(e) => { e.preventDefault(); navigate(`/spots/${spot.slug}`); }}>
                      {isChinese ? '打开地点' : 'Open spot'}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
