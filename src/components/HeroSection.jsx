import { Link } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

export default function HeroSection() {
  const { isChinese } = useAppState();

  return (
    <section className="hero card">
      <div className="hero-copy">
        <p className="eyebrow">{isChinese ? '遗产步行 + 轻量发现' : 'Heritage walk + playful discovery'}</p>
        <h2>{isChinese ? '阊门遗产' : 'Discover Chang Gate'}</h2>
        <p className="hero-description">
          {isChinese
            ? '一个面向移动端的阊门运河片区步行助手，帮助游客观察、记录并留下记忆。'
            : 'A bright, mobile-first companion for walking, noticing, collecting, and remembering the Chang Gate canal district.'}
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/spots/shantang-street">
            {isChinese ? '开始探索' : 'Start Explore'}
          </Link>
        </div>
      </div>
    </section>
  );
}
