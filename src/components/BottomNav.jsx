import { NavLink } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';

const navItems = [
  { to: '/', label: 'Home', labelZh: '首页' },
  { to: '/map', label: 'Map', labelZh: '地图' },
  { to: '/gallery', label: 'Gallery', labelZh: '图集' },
  { to: '/postcard', label: 'Postcard', labelZh: '明信片' },
  { to: '/deepseek', label: 'Ask', labelZh: '提问' },
];

export default function BottomNav() {
  const { isChinese } = useAppState();

  return (
    <nav className="bottom-nav" aria-label={isChinese ? '主导航' : 'Primary'}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav-link${isActive ? ' is-active' : ''}`
          }
          end={item.to === '/'}
        >
          <span>{isChinese ? item.labelZh : item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
