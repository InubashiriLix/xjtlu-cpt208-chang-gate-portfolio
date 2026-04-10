import { Link } from 'react-router-dom';
import canalBadge from '../assets/canal-badge.svg';

export default function HeaderBar({ title, eyebrow, description, backTo }) {
  return (
    <header className="header-bar">
      <div className="page header-bar-inner">
        <div className="header-brand">
          <img className="header-logo" src={canalBadge} alt="" />
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="header-title">{title}</h1>
            <p className="header-description">{description}</p>
          </div>
        </div>
        <div className="header-actions">
          {backTo ? (
            <Link className="button button-secondary button-small" to={backTo}>
              Back to walk
            </Link>
          ) : (
            <span className="prototype-pill">Static prototype</span>
          )}
        </div>
      </div>
    </header>
  );
}

