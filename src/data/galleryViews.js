import gateWallApproach from '../../raw_img/微信图片_20260418153846_54_49.jpg';
import cityThroughWall from '../../raw_img/微信图片_20260418153856_57_49.jpg';
import wallWorkingEdge from '../../raw_img/微信图片_20260418153905_59_49.jpg';
import greenGateArch from '../../raw_img/微信图片_20260418153910_60_49.jpg';
import canalUnderArch from '../../raw_img/微信图片_20260418153915_61_49.jpg';
import changGateFacade from '../../raw_img/微信图片_20260418153928_62_49.jpg';
import arrivalAtGate from '../../raw_img/微信图片_20260418153931_64_49.jpg';
import acrossTheCanal from '../../raw_img/微信图片_20260418153934_65_49.jpg';

export const galleryViews = [
  {
    id: 'chang-gate-facade',
    title: 'Chang Gate Facade',
    lens: 'Landmark anchor',
    image: changGateFacade,
    alt: 'Chang Gate facade with three arched openings below a traditional pavilion roof',
    description:
      'The three openings and pavilion create the strongest landmark view, useful as the route anchor image.',
  },
  {
    id: 'across-the-canal',
    title: 'Across the Canal',
    lens: 'Closing memory',
    image: acrossTheCanal,
    alt: 'Canal-side buildings, trees, boats, and water seen from across the canal',
    description:
      'The canal-side panorama connects water, boats, trees, and old buildings into the calmest closing memory.',
  },
  {
    id: 'gate-wall-approach',
    title: 'Gate Wall Approach',
    lens: 'Route threshold',
    image: gateWallApproach,
    alt: 'Upper walkway leading along the city wall toward the Chang Gate pavilion',
    description:
      'The upper walkway leads visitors toward the pavilion, making Chang Gate feel like a clear starting threshold.',
  },
  {
    id: 'city-through-wall',
    title: 'City Seen Through the Wall',
    lens: 'Past meets present',
    image: cityThroughWall,
    alt: 'Street life, trees, and modern towers framed by brick wall openings',
    description:
      'A brick opening frames street life, trees, and modern towers, showing the old gate still connected to daily movement.',
  },
  {
    id: 'wall-working-edge',
    title: 'Wall, Sky, and Working Edge',
    lens: 'Urban contrast',
    image: wallWorkingEdge,
    alt: 'Old city wall and pavilion beside present-day paths and construction edges',
    description:
      'The old wall stands beside present-day paths and working edges, giving the route a visible past-meets-present contrast.',
  },
  {
    id: 'green-gate-arch',
    title: 'Green Gate Arch',
    lens: 'Shaded passage',
    image: greenGateArch,
    alt: 'Ivy-covered stone arch with the pavilion visible above it',
    description:
      'Ivy softens the stone arch and makes this passage feel shaded, slower, and more intimate.',
  },
  {
    id: 'canal-under-arch',
    title: 'Canal Under the Arch',
    lens: 'Water rhythm',
    image: canalUnderArch,
    alt: 'Canal boats and willow trees viewed from beneath a leafy arch',
    description:
      'From the shaded arch, boats and water become the main rhythm of the walk.',
  },
  {
    id: 'arrival-at-the-gate',
    title: 'Arrival at the Gate',
    lens: 'Active crossing',
    image: arrivalAtGate,
    alt: 'Street-level view of Chang Gate with cars and pedestrians passing through',
    description:
      'A busier street-level view shows the gate as an active crossing rather than a static monument.',
  },
];

const galleryTranslations = {
  'chang-gate-facade': {
    title: '阊门立面',
    lens: '地标核心',
    alt: '传统亭阁屋顶下方带有三个拱门开口的阊门立面',
    description: '三个开口和亭阁构成最强的地标视角，适合作为路线的核心图像。',
  },
  'across-the-canal': {
    title: '运河对岸',
    lens: '收束记忆',
    alt: '从运河对岸看到的临水建筑、树木、船只和水面',
    description: '运河边的全景把水、船、树和老建筑连接成最安静的结尾记忆。',
  },
  'gate-wall-approach': {
    title: '走向城墙与城门',
    lens: '路线门槛',
    alt: '沿城墙通向阊门亭阁的上层步道',
    description: '上层步道把游客引向亭阁，让阊门成为清晰的起点门槛。',
  },
  'city-through-wall': {
    title: '从城墙看城市',
    lens: '过去与现在',
    alt: '砖墙开口中框住街道生活、树木和现代高楼',
    description: '砖墙开口框住街道生活、树木和现代高楼，显示老城门仍与日常流动相连。',
  },
  'wall-working-edge': {
    title: '城墙、天空与工作边界',
    lens: '城市对比',
    alt: '老城墙和亭阁旁边是当代路径与施工边界',
    description: '老城墙与当代路径和工作边界并置，让路线呈现可见的古今对照。',
  },
  'green-gate-arch': {
    title: '绿色城门拱',
    lens: '阴凉通道',
    alt: '藤蔓覆盖的石拱，上方可见亭阁',
    description: '藤蔓柔化了石拱，使这个通道显得更阴凉、缓慢和亲近。',
  },
  'canal-under-arch': {
    title: '拱下运河',
    lens: '水的节奏',
    alt: '从绿荫拱门下看到的运河船只和柳树',
    description: '从阴影拱门下看，船和水成为步行的主要节奏。',
  },
  'arrival-at-the-gate': {
    title: '到达城门',
    lens: '活跃穿行',
    alt: '街面视角下车辆和行人穿过阊门',
    description: '更繁忙的街面视角显示，城门是活跃通道，而不是静态纪念物。',
  },
};

export function localizeGalleryView(view, language = 'en') {
  if (language !== 'zh') {
    return view;
  }

  return {
    ...view,
    ...galleryTranslations[view.id],
  };
}
