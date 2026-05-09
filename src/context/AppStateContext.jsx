import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { heritageSpots, walkingRoutes } from '../data/spots';

const AppStateContext = createContext(null);
const STORAGE_KEY = 'chang-gate-canal-quest-progress';

const defaultProgress = {
  collectedSpotIds: ['chang-gate-arrival', 'market-lane-crossing'],
  selectedRouteId: 'warm-up-loop',
};

function readStoredProgress() {
  if (typeof window === 'undefined') {
    return defaultProgress;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function AppStateProvider({ children }) {
  const [progress, setProgress] = useState(readStoredProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

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
      spots: heritageSpots,
      walkingRoutes,
      progress,
      collectedSpots,
      selectedRoute,
      stats,
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
      isCollected: (spotId) => progress.collectedSpotIds.includes(spotId),
      getSpotBySlug: (slug) => heritageSpots.find((spot) => spot.slug === slug),
    }),
    [collectedSpots, progress, selectedRoute, stats],
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

