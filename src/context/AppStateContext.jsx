import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  demoUserLocation,
  heritageSpots,
  localizeRoute,
  localizeSpot,
  walkingRoutes,
} from '../data/spots';

const AppStateContext = createContext(null);
const STORAGE_KEY = 'chang-gate-canal-quest-progress';
const LANGUAGE_STORAGE_KEY = 'chang-gate-heritage-language';
const LEGACY_ROUTE_IDS = {
  'bridge-and-breeze': 'warm-up-loop',
};

const defaultProgress = {
  selectedRouteId: 'warm-up-loop',
};

const resetProgress = {
  selectedRouteId: defaultProgress.selectedRouteId,
};

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

function sanitizeProgress(progress) {
  const validRouteIds = new Set(walkingRoutes.map((route) => route.id));
  const selectedRouteId =
    LEGACY_ROUTE_IDS[progress.selectedRouteId] ?? progress.selectedRouteId;

  return {
    ...progress,
    selectedRouteId: validRouteIds.has(selectedRouteId)
      ? selectedRouteId
      : defaultProgress.selectedRouteId,
  };
}

function readStoredProgress() {
  if (typeof window === 'undefined') {
    return defaultProgress;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return sanitizeProgress(
      saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress,
    );
  } catch {
    return defaultProgress;
  }
}

export function AppStateProvider({ children }) {
  const [progress, setProgress] = useState(readStoredProgress);
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'zh' ? 'zh' : 'en';
  });
  const [currentLocation, setCurrentLocation] = useState(demoUserLocation);
  const [locationStatus, setLocationStatus] = useState('ready');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const spotsWithDistances = useMemo(
    () =>
      heritageSpots.map((spot) => {
        if (!currentLocation) {
          return { ...localizeSpot(spot, language), isDistanceLive: false };
        }

        const distanceMeters = Math.round(
          haversineMeters(
            currentLocation.lng,
            currentLocation.lat,
            spot.location.lng,
            spot.location.lat,
          ),
        );

        return {
          ...localizeSpot(spot, language),
          distanceMeters,
          walkMinutes: Math.max(1, Math.round(distanceMeters / 80)),
          isDistanceLive: true,
        };
      }),
    [currentLocation, language],
  );

  const stats = useMemo(() => {
    const totalSpots = heritageSpots.length;
    const walkedMeters = spotsWithDistances.reduce(
      (sum, spot) => sum + spot.routeLegMeters,
      0,
    );

    return {
      totalSpots,
      walkedMeters,
    };
  }, [spotsWithDistances]);

  const selectedRoute = useMemo(
    () =>
      localizeRoute(
        walkingRoutes.find((route) => route.id === progress.selectedRouteId) ?? walkingRoutes[0],
        language,
      ),
    [language, progress.selectedRouteId],
  );

  const localizedRoutes = useMemo(
    () => walkingRoutes.map((route) => localizeRoute(route, language)),
    [language],
  );

  const value = useMemo(
    () => ({
      spots: spotsWithDistances,
      walkingRoutes: localizedRoutes,
      progress,
      selectedRoute,
      stats,
      currentLocation,
      locationStatus,
      language,
      isChinese: language === 'zh',
      toggleLanguage: () =>
        setLanguage((current) => (current === 'zh' ? 'en' : 'zh')),
      chatMessages,
      setChatMessages,
      updateCurrentLocation: (lng, lat) => {
        setCurrentLocation({ lng, lat });
        setLocationStatus('ready');
      },
      selectRoute: (routeId) =>
        setProgress((current) => ({
          ...current,
          selectedRouteId: routeId,
        })),
      resetVisitHistory: () => setProgress(resetProgress),
      getSpotBySlug: (slug) => spotsWithDistances.find((spot) => spot.slug === slug),
    }),
    [chatMessages, currentLocation, language, localizedRoutes, locationStatus, progress, selectedRoute, spotsWithDistances, stats],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return context;
}
