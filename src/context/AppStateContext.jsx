import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoUserLocation, heritageSpots, walkingRoutes } from '../data/spots';

const AppStateContext = createContext(null);
const STORAGE_KEY = 'chang-gate-canal-quest-progress';
const LEGACY_SPOT_IDS = {
  'chang-gate-arrival': 'chang-gate',
  'willow-bridge-view': null,
  'canal-lookout-deck': null,
};
const LEGACY_ROUTE_IDS = {
  'bridge-and-breeze': 'warm-up-loop',
};

const defaultProgress = {
  collectedSpotIds: ['chang-gate', 'market-lane-crossing'],
  selectedRouteId: 'warm-up-loop',
};

const resetProgress = {
  collectedSpotIds: [],
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
  const validSpotIds = new Set(heritageSpots.map((spot) => spot.id));
  const validRouteIds = new Set(walkingRoutes.map((route) => route.id));
  const collectedSpotIds = [
    ...new Set(
      progress.collectedSpotIds
        .map((spotId) => LEGACY_SPOT_IDS[spotId] ?? spotId)
        .filter((spotId) => spotId && validSpotIds.has(spotId)),
    ),
  ];
  const selectedRouteId =
    LEGACY_ROUTE_IDS[progress.selectedRouteId] ?? progress.selectedRouteId;

  return {
    ...progress,
    collectedSpotIds,
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
  const [currentLocation, setCurrentLocation] = useState(demoUserLocation);
  const [locationStatus, setLocationStatus] = useState('ready');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const spotsWithDistances = useMemo(
    () =>
      heritageSpots.map((spot) => {
        if (!currentLocation) {
          return { ...spot, isDistanceLive: false };
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
          ...spot,
          distanceMeters,
          walkMinutes: Math.max(1, Math.round(distanceMeters / 80)),
          isDistanceLive: true,
        };
      }),
    [currentLocation],
  );

  const collectedSpots = useMemo(
    () => heritageSpots.filter((spot) => progress.collectedSpotIds.includes(spot.id)),
    [progress.collectedSpotIds],
  );

  const stats = useMemo(() => {
    const totalSpots = heritageSpots.length;
    const collectedCount = progress.collectedSpotIds.length;
    const progressPercent = Math.round((collectedCount / totalSpots) * 100);
    const walkedMeters = collectedSpots.reduce(
      (sum, spot) => sum + spot.routeLegMeters,
      0,
    );

    return {
      collectedCount,
      totalSpots,
      progressPercent,
      walkedMeters,
      postcardUnlocked: collectedCount >= 3,
    };
  }, [collectedSpots, progress.collectedSpotIds.length]);

  const selectedRoute = useMemo(
    () => walkingRoutes.find((route) => route.id === progress.selectedRouteId) ?? walkingRoutes[0],
    [progress.selectedRouteId],
  );

  const value = useMemo(
    () => ({
      spots: spotsWithDistances,
      walkingRoutes,
      progress,
      collectedSpots,
      selectedRoute,
      stats,
      currentLocation,
      locationStatus,
      updateCurrentLocation: (lng, lat) => {
        setCurrentLocation({ lng, lat });
        setLocationStatus('ready');
      },
      collectStamp: (spotId) =>
        setProgress((current) => {
          if (current.collectedSpotIds.includes(spotId)) {
            return current;
          }

          return {
            ...current,
            collectedSpotIds: [...current.collectedSpotIds, spotId],
          };
        }),
      selectRoute: (routeId) =>
        setProgress((current) => ({
          ...current,
          selectedRouteId: routeId,
        })),
      resetVisitHistory: () => setProgress(resetProgress),
      isCollected: (spotId) => progress.collectedSpotIds.includes(spotId),
      getSpotBySlug: (slug) => spotsWithDistances.find((spot) => spot.slug === slug),
    }),
    [collectedSpots, currentLocation, locationStatus, progress, selectedRoute, spotsWithDistances, stats],
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
