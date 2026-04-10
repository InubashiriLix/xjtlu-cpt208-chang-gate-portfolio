import { Link } from 'react-router-dom';
import ProgressCard from '../components/ProgressCard';
import SectionTitle from '../components/SectionTitle';
import StampGrid from '../components/StampGrid';
import { useAppState } from '../context/AppStateContext';
import { rewardMilestones } from '../data/spots';

export default function StampsPage() {
  const { spots, progress, stats } = useAppState();

  return (
    <div className="page-stack">
      <ProgressCard stats={stats} />

      <section className="card booklet-card">
        <SectionTitle
          eyebrow="Stamp booklet"
          title="Collect visual memories from each heritage stop"
          description="Collected stamps stay visible while locked stamps hint at where to walk next."
        />
        <StampGrid spots={spots} collectedIds={progress.collectedSpotIds} />
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Reward milestones"
          title="Visible progress makes the journey feel playful"
          description="The UI uses simple unlock logic so a demo audience can quickly understand the reward loop."
        />
        <div className="milestone-grid">
          {rewardMilestones.map((milestone) => {
            const isUnlocked = stats.collectedCount >= milestone.count;

            return (
              <article
                key={milestone.count}
                className={`card milestone-card${isUnlocked ? ' is-unlocked' : ''}`}
              >
                <p className="eyebrow">{milestone.count} stamps</p>
                <h3>{milestone.title}</h3>
                <p>{milestone.reward}</p>
                <span className="status-pill">
                  {isUnlocked ? 'Unlocked' : 'Still to unlock'}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="card postcard-unlock-card">
        <p className="eyebrow">Next reward</p>
        <h2>
          {stats.postcardUnlocked
            ? 'The postcard generator is now open.'
            : 'Collect one more stamp to unlock the postcard generator.'}
        </h2>
        <p>
          The final souvenir is designed to help visitors leave with a personal
          memory, not just a list of places.
        </p>
        <Link className="button button-primary" to="/postcard">
          Go to postcard studio
        </Link>
      </section>
    </div>
  );
}

