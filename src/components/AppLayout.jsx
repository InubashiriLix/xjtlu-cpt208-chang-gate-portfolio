import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import HeaderBar from './HeaderBar';

function getHeaderMeta(pathname) {
  if (pathname.startsWith('/map')) {
    return {
      title: 'Interactive Map',
      eyebrow: 'Satellite view',
      description: 'Explore heritage spots around Chang Gate on the map.',
    };
  }

  if (pathname.startsWith('/explore')) {
    return {
      title: 'Explore the Walk',
      eyebrow: 'Onsite route',
      description: 'Nearby stops, story prompts, and soft route guidance.',
    };
  }

  if (pathname.startsWith('/spots/')) {
    return {
      title: 'Story Spot',
      eyebrow: 'Heritage detail',
      description: 'Short story, mission, and collectible stamp.',
      backTo: '/explore',
    };
  }

  if (pathname.startsWith('/gallery')) {
    return {
      title: 'Gallery',
      eyebrow: 'Field views',
      description: 'Real photos that connect the route, memories, and postcard mood.',
    };
  }

  if (pathname.startsWith('/stamps')) {
    return {
      title: 'Stamp Booklet',
      eyebrow: 'Collection',
      description: 'Track progress and unlock the postcard reward.',
    };
  }

  if (pathname.startsWith('/postcard')) {
    return {
      title: 'Memory Postcard',
      eyebrow: 'Souvenir studio',
      description: 'Turn the walk into a bright keepsake.',
    };
  }

  if (pathname.startsWith('/about')) {
    return {
      title: 'About this application',
      eyebrow: 'Project info',
      description: 'Why the experience exists and what comes next.',
    };
  }

  return {
    title: 'Canal Quest',
    eyebrow: 'Chang Gate / 阊门',
    description: 'Playful heritage exploration for visitors and residents.',
  };
}

export default function AppLayout({ children }) {
  const location = useLocation();
  const headerMeta = getHeaderMeta(location.pathname);

  return (
    <div className="app-shell">
      <div className="ambient-shape ambient-shape-left" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-right" aria-hidden="true" />
      <HeaderBar {...headerMeta} />
      <main className="page app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
