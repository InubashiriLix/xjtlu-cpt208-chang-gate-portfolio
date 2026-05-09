import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/map', label: 'Map' },
  { to: '/explore', label: 'Explore' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/stamps', label: 'Stamps' },
  { to: '/postcard', label: 'Postcard' },
  { to: '/about', label: 'About' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `bottom-nav-link${isActive ? ' is-active' : ''}`
          }
          end={item.to === '/'}
        >
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
