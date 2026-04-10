import { Link } from 'react-router-dom';

export default function SectionTitle({
  eyebrow,
  title,
  description,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="section-title">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
      {actionLabel && actionTo ? (
        <Link className="text-link" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

