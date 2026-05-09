import { Link } from 'react-router-dom';
import canalBadge from '../assets/canal-badge.svg';

export default function HeaderBar({
  title,
  eyebrow,
  description,
  backTo,
  isChinese,
  onToggleLanguage,
}) {
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
          <button
            type="button"
            className="button button-secondary button-small language-toggle"
            onClick={onToggleLanguage}
          >
            {isChinese ? 'English' : '中文'}
          </button>
          {backTo ? (
            <Link className="button button-secondary button-small" to={backTo}>
              {isChinese ? '返回路线' : 'Back to walk'}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
