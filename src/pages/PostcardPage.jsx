import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostcardPreview from '../components/PostcardPreview';
import SectionTitle from '../components/SectionTitle';
import { useAppState } from '../context/AppStateContext';
import { postcardThemes } from '../data/postcardThemes';

export default function PostcardPage() {
  const { collectedSpots, selectedRoute, stats } = useAppState();
  const [selectedThemeId, setSelectedThemeId] = useState(postcardThemes[0].id);
  const [favoriteSpotId, setFavoriteSpotId] = useState(collectedSpots[0]?.id ?? '');
  const [status, setStatus] = useState('idle');
  const [helperMessage, setHelperMessage] = useState('');

  const selectedTheme =
    postcardThemes.find((theme) => theme.id === selectedThemeId) ?? postcardThemes[0];
  const favoriteSpot =
    collectedSpots.find((spot) => spot.id === favoriteSpotId) ?? collectedSpots[0];

  useEffect(() => {
    if (!favoriteSpotId && collectedSpots[0]) {
      setFavoriteSpotId(collectedSpots[0].id);
    }
  }, [collectedSpots, favoriteSpotId]);

  useEffect(() => {
    if (status !== 'loading') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus('ready');
    }, 1600);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const routeSummary = useMemo(
    () => `${selectedRoute.name} · ${selectedRoute.duration} · ${selectedRoute.distance}`,
    [selectedRoute],
  );

  if (!stats.postcardUnlocked) {
    return (
      <div className="page-stack">
        <section className="card postcard-locked">
          <p className="eyebrow">Unlock required</p>
          <h2>Collect 3 stamps before generating a souvenir postcard.</h2>
          <p>
            You currently have {stats.collectedCount} of {stats.totalSpots} stamps.
            Walk one more stop to unlock the final keepsake flow.
          </p>
          <div className="locked-actions">
            <Link className="button button-primary" to="/explore">
              Continue exploring
            </Link>
            <Link className="button button-secondary" to="/stamps">
              Review booklet
            </Link>
          </div>
        </section>

        <section className="card collected-preview">
          <SectionTitle
            eyebrow="Already visited"
            title="Current route memories"
            description="These collected stops will shape the postcard once the studio unlocks."
          />
          <div className="collected-chip-row">
            {collectedSpots.map((spot) => (
              <span key={spot.id} className="tag-chip">
                {spot.shortName}
              </span>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="card postcard-controls">
        <SectionTitle
          eyebrow="Souvenir setup"
          title="Generate a bright keepsake from the walk"
          description="This is a frontend simulation of a future AI postcard flow shaped by route, mood, and favorite stop."
        />

        <div className="selection-block">
          <p className="selection-label">Selected route</p>
          <div className="selection-card">
            <strong>{selectedRoute.name}</strong>
            <span>{routeSummary}</span>
          </div>
        </div>

        <div className="selection-block">
          <p className="selection-label">Choose a mood theme</p>
          <div className="theme-grid">
            {postcardThemes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                className={`theme-card${selectedThemeId === theme.id ? ' is-selected' : ''}`}
                onClick={() => setSelectedThemeId(theme.id)}
                aria-pressed={selectedThemeId === theme.id}
              >
                <div
                  className="theme-swatches"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(135deg, ${theme.palette[0]}, ${theme.palette[1]}, ${theme.palette[2]})`,
                  }}
                />
                <strong>{theme.name}</strong>
                <span>{theme.mood}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="selection-block">
          <p className="selection-label">Pick a favorite visited spot</p>
          <div className="favorite-grid">
            {collectedSpots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                className={`favorite-chip${favoriteSpotId === spot.id ? ' is-selected' : ''}`}
                onClick={() => setFavoriteSpotId(spot.id)}
                aria-pressed={favoriteSpotId === spot.id}
              >
                {spot.shortName}
              </button>
            ))}
          </div>
        </div>

        <div className="generator-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setHelperMessage('');
              setStatus('loading');
            }}
            disabled={!favoriteSpot}
          >
            {status === 'loading' ? 'Generating postcard...' : 'Generate postcard'}
          </button>
          <p className="generator-note" aria-live="polite">
            {status === 'loading'
              ? 'Composing a route memory, selecting tone, and building the souvenir layout.'
              : 'Prototype generation uses local mock data only.'}
          </p>
        </div>
      </section>

      {status === 'ready' && favoriteSpot ? (
        <section className="page-stack">
          <PostcardPreview
            theme={selectedTheme}
            favoriteSpot={favoriteSpot}
            collectedSpots={collectedSpots}
          />

          <div className="card postcard-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() =>
                setHelperMessage('Share flow is a prototype placeholder in this static version.')
              }
            >
              Share preview
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() =>
                setHelperMessage('Download export is a future enhancement for the final system.')
              }
            >
              Download mockup
            </button>
            {helperMessage ? <p className="generator-note">{helperMessage}</p> : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
