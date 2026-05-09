import { useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import BottomNav from './BottomNav';
import HeaderBar from './HeaderBar';

function getHeaderMeta(pathname, isChinese) {
  if (pathname.startsWith('/map')) {
    return isChinese ? {
      title: '互动地图',
      eyebrow: '路线视图',
      description: '在地图上查看阊门周边的文化遗产点。',
    } : {
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
    return isChinese ? {
      title: '故事地点',
      eyebrow: '遗产细节',
      description: '短故事、观察提示和地点信息。',
      backTo: '/map',
    } : {
      title: 'Story Spot',
      eyebrow: 'Heritage detail',
      description: 'Short story, mission, and site details.',
      backTo: '/map',
    };
  }

  if (pathname.startsWith('/gallery')) {
    return isChinese ? {
      title: '图集',
      eyebrow: '现场视角',
      description: '用真实照片连接路线、记忆和明信片氛围。',
    } : {
      title: 'Gallery',
      eyebrow: 'Field views',
      description: 'Real photos that connect the route, memories, and postcard mood.',
    };
  }

  if (pathname.startsWith('/postcard')) {
    return isChinese ? {
      title: '记忆明信片',
      eyebrow: '纪念品工作室',
      description: '把步行路线变成明亮的纪念卡片。',
    } : {
      title: 'Memory Postcard',
      eyebrow: 'Souvenir studio',
      description: 'Turn the walk into a bright keepsake.',
    };
  }

  if (pathname.startsWith('/deepseek')) {
    return isChinese ? {
      title: '提问',
      eyebrow: '路线助手',
      description: '根据当前路线进度获取步行建议。',
    } : {
      title: 'Ask',
      eyebrow: 'Route helper',
      description: 'Ask for advice based on current route progress.',
    };
  }

  if (pathname.startsWith('/about')) {
    return {
      title: 'About this application',
      eyebrow: 'Project info',
      description: 'Why the experience exists and what comes next.',
    };
  }

  return isChinese ? {
    title: '阊门遗产',
    eyebrow: 'Chang Gate / 阊门',
    description: '面向游客与居民的轻量文化遗产探索。',
  } : {
    title: 'Chang Gate Heritage',
    eyebrow: 'Chang Gate / 阊门',
    description: 'Playful heritage exploration for visitors and residents.',
  };
}

export default function AppLayout({ children }) {
  const location = useLocation();
  const { isChinese, toggleLanguage } = useAppState();
  const headerMeta = getHeaderMeta(location.pathname, isChinese);

  return (
    <div className="app-shell">
      <div className="ambient-shape ambient-shape-left" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-right" aria-hidden="true" />
      <HeaderBar
        {...headerMeta}
        isChinese={isChinese}
        onToggleLanguage={toggleLanguage}
      />
      <main className="page app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
