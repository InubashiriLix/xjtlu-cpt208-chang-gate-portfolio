import SectionTitle from '../components/SectionTitle';
import { aboutCards, futureModules } from '../data/appContent';

export default function AboutPage() {
  return (
    <div className="page-stack">
      <section className="card about-hero">
        <p className="eyebrow">Project overview</p>
        <h2>Playful heritage exploration for Chang Gate</h2>
        <p>
          This experience is a mobile companion for visitors and residents who
          want a warmer, more personal way to explore the Suzhou Grand Canal area at
          Chang Gate. The design prioritises short outdoor-friendly content,
          collectible progress, and memorable end-of-journey output.
        </p>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Design goals"
          title="Human-centric qualities built into the frontend"
          description="The experience is intentionally low-friction, bright, and inviting."
        />
        <div className="feature-grid">
          {aboutCards.map((card) => (
            <article key={card.title} className="card feature-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          eyebrow="Development roadmap"
          title="What is planned for future versions"
          description="The current build is structured so future modules can plug in without a redesign."
        />
        <div className="milestone-grid">
          {futureModules.map((module) => (
            <article key={module.title} className="card milestone-card">
              <h3>{module.title}</h3>
              <p>{module.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

