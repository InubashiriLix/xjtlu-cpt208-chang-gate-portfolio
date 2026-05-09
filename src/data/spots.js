import shantangImg from '../../raw_img/shantangStreet.jpg';
import wharfImg from '../assets/spots/wharf-steps-corner.jpg';
import waterwayImg from '../assets/spots/waterside-alley-walk.jpg';
import changGateImg from '../assets/spots/chang-gate.jpg';
import marketImg from '../../raw_img/changmen_conmercial.jpg';

export const changGateLocation = { lng: 120.605741078035, lat: 31.315099315692006 };
export const demoUserLocation = { lng: 120.60350126096095, lat: 31.314318747226537 };
export const appDisplayName = 'Chang Gate Heritage';

export const heritageSpots = [
  {
    id: 'shantang-street',
    slug: 'shantang-street',
    name: 'Shantang Street',
    shortName: 'Shantang Street',
    category: 'Historic Street',
    distanceMeters: 242,
    routeLegMeters: 0,
    walkMinutes: 3,
    status: 'Historic street walk',
    image: shantangImg,
    imageLabel: 'Historic street frontage near the canal district',
    storyTitle: 'A street where canal memory stays busy',
    storySnippet:
      'Shantang Street keeps the Chang Gate walk connected to everyday heritage, shops, and canal-side memory.',
    storyBody:
      'Shantang Street turns the heritage route from a landmark visit into a lived street experience. Shopfronts, small thresholds, and passing visitors make the canal district feel active rather than frozen in time.',
    notice: [
      'Look for how storefronts, signs, and paving guide the pace of walking.',
      'Notice where people stop to browse, photograph, or orient themselves.',
      'Compare the street energy here with the quieter waterside stops nearby.',
    ],
    mission:
      'Choose one street detail that feels strongly local and turn it into a one-line postcard caption.',
    tags: ['Views', 'Stories', 'Family-friendly'],
    related: ['wharf-steps-corner', 'market-lane-crossing'],
    coords: { x: 76, y: 30 },
    location: { lng: 120.60344132167292, lat: 31.31493897464855 },
  },
  {
    id: 'wharf-steps-corner',
    slug: 'wharf-steps-corner',
    name: 'Wharf Steps Corner',
    shortName: 'Wharf Steps',
    category: 'Canal Edge',
    distanceMeters: 182,
    routeLegMeters: 67,
    walkMinutes: 2,
    status: 'Quiet waterside pause',
    image: wharfImg,
    imageLabel: 'Stone steps leading to a quieter canal edge',
    storyTitle: 'A waterside pause for noticing details',
    storySnippet:
      'Stone steps by the water create a small pause between Shantang Street and the quieter alley.',
    storyBody:
      'The wharf steps slow the route down after the street energy of Shantang. They invite visitors to notice water level, masonry, and the small working edges that make the canal district feel lived-in.',
    notice: [
      'Look at how the step edges meet the water line and nearby masonry.',
      'Notice where people choose to stop rather than keep moving onward.',
      'Think about which earlier stop this place connects back to emotionally.',
    ],
    mission:
      'Pause at the steps and choose one texture that could become a postcard detail later.',
    tags: ['Views', 'Stories'],
    related: ['shantang-street', 'waterside-alley-walk'],
    coords: { x: 84, y: 72 },
    location: { lng: 120.60407124598505, lat: 31.315209129712553 },
  },
  {
    id: 'waterside-alley-walk',
    slug: 'waterside-alley-walk',
    name: 'Waterside Alley Walk',
    shortName: 'Waterside Alley',
    category: 'Old Street',
    distanceMeters: 125,
    routeLegMeters: 57,
    walkMinutes: 2,
    status: 'Shaded and calm',
    image: waterwayImg,
    imageLabel: 'Narrow waterside passage with textured walls',
    storyTitle: 'Quiet edges reveal a different tempo',
    storySnippet:
      'This smaller path shifts the experience from landmark hunting to noticing atmosphere.',
    storyBody:
      'Not every heritage moment announces itself. This alley is about texture, shade, and rhythm. It suggests how an exploration app can reward quieter noticing, not just major viewpoints, by inviting people to slow down and read atmosphere as part of place.',
    notice: [
      'Look for wall textures, drains, stone steps, and traces of daily maintenance.',
      'Notice how light changes from bright canal edge to shaded alley depth.',
      'See whether sound becomes more enclosed here than at the open water.',
    ],
    mission:
      'Choose three words that describe the atmosphere here, then compare them with Shantang Street.',
    tags: ['Stories', 'Family-friendly'],
    related: ['wharf-steps-corner', 'chang-gate'],
    coords: { x: 39, y: 66 },
    location: { lng: 120.60466116593481, lat: 31.315119162538565 },
  },
  {
    id: 'chang-gate',
    slug: 'chang-gate',
    name: 'Chang Gate',
    shortName: 'Chang Gate',
    category: 'Gateway',
    distanceMeters: 0,
    routeLegMeters: 103,
    walkMinutes: 1,
    status: 'Open now',
    image: changGateImg,
    imageLabel: 'Warm stone gate framing the old quarter',
    storyTitle: 'A threshold that still feels lived-in',
    storySnippet:
      'Stand where the old city edge still works like a real crossing, not just a backdrop.',
    storyBody:
      'At Chang Gate, the most meaningful detail is movement. Locals pass through, visitors pause, and the canal rhythm quietly shapes both. This stop frames the heritage walk as something living and everyday rather than a distant history lesson.',
    notice: [
      'Look for stone textures, tiled roofs, and the way the gate frames people moving through it.',
      'Compare the pace of passing bikes and walkers with the slower canal atmosphere nearby.',
      'Notice how the entry feels like both a meeting point and a wayfinding landmark.',
    ],
    mission:
      'Capture a past-meets-present moment by photographing the gate with today’s street life in the frame.',
    tags: ['Nearby', 'Stories', 'Views'],
    related: ['waterside-alley-walk', 'market-lane-crossing'],
    coords: { x: 24, y: 46 },
    location: changGateLocation,
  },
  {
    id: 'market-lane-crossing',
    slug: 'market-lane-crossing',
    name: 'Market Lane Crossing',
    shortName: 'Market Lane',
    category: 'Street Life',
    distanceMeters: 30,
    routeLegMeters: 53,
    walkMinutes: 1,
    status: 'Busy and lively',
    image: marketImg,
    imageLabel: 'Commercial street frontage near Chang Gate with shops, signs, and everyday movement',
    storyTitle: 'Where commerce keeps the gate area active',
    storySnippet:
      'The commercial street near Chang Gate shows how heritage stays connected to shopping, signs, and daily movement.',
    storyBody:
      'Chang Gate is not only a historic landmark. The commercial frontage around it keeps the area useful in the present, with shop signs, passing customers, and quick errands turning the old gateway into part of an everyday urban route.',
    notice: [
      'Watch how shop signs, storefronts, and passing people shape the street rhythm.',
      'Notice where the heritage landmark gives way to practical daily commerce.',
      'Compare the commercial street energy with the quieter canal-side stops.',
    ],
    mission:
      'Find one shopfront detail that shows how the old gate area still works as a living commercial place.',
    tags: ['Nearby', 'Stories', 'Family-friendly'],
    related: ['chang-gate', 'shantang-street'],
    coords: { x: 48, y: 34 },
    location: { lng: 120.60629106299358, lat: 31.315169442945678 },
  },
];

export const walkingRoutes = [
  {
    id: 'warm-up-loop',
    name: 'Warm-Up Canal Loop',
    duration: '5 min',
    distance: '0.3 km',
    tone: 'Classic line order',
    description:
      'A compact line connecting Shantang Street, Wharf Steps, Waterside Alley, Chang Gate, and Market Lane in the required order.',
    spotIds: ['shantang-street', 'wharf-steps-corner', 'waterside-alley-walk', 'chang-gate', 'market-lane-crossing'],
  },
];

const spotTranslations = {
  'shantang-street': {
    name: '山塘街',
    shortName: '山塘街',
    category: '历史街区',
    status: '历史街巷步行',
    imageLabel: '运河街区附近的历史街面',
    storyTitle: '运河记忆仍然热闹的街道',
    storySnippet: '山塘街把阊门步行路线与日常生活、店铺和运河边的记忆连接起来。',
    storyBody: '山塘街让这条遗产路线不只是参观地标，而是进入一段真实的街巷体验。店面、门槛和来往的人让运河片区显得鲜活，而不是停在过去。',
    notice: [
      '观察店面、招牌和铺地如何影响行走节奏。',
      '留意人们在哪里停下来浏览、拍照或确认方向。',
      '把这里的街巷活力与后面更安静的水边地点作比较。',
    ],
    mission: '选择一个很有本地感的街巷细节，把它写成一句明信片标题。',
    tags: ['景观', '故事', '亲子友好'],
  },
  'wharf-steps-corner': {
    name: '码头台阶角',
    shortName: '码头台阶',
    category: '运河边缘',
    status: '安静的水边停留',
    imageLabel: '通向安静水边的石台阶',
    storyTitle: '适合观察细节的水边停顿',
    storySnippet: '水边石阶在山塘街的热闹和更安静的小巷之间形成短暂的停顿。',
    storyBody: '码头台阶让路线从山塘街的热闹节奏慢下来。这里适合观察水位、石砌边缘和运河片区仍然带有生活痕迹的工作性边界。',
    notice: [
      '观察台阶边缘如何接近水线和周围石砌结构。',
      '留意人们选择停下来的位置，而不是继续向前走。',
      '想一想这里在情绪上与前一个地点如何连接。',
    ],
    mission: '在台阶边停留片刻，选择一种可以放进明信片的质感。',
    tags: ['景观', '故事'],
  },
  'waterside-alley-walk': {
    name: '水边小巷步道',
    shortName: '水边小巷',
    category: '老街巷',
    status: '阴凉安静',
    imageLabel: '带有墙面纹理的狭窄水边通道',
    storyTitle: '安静边缘呈现另一种节奏',
    storySnippet: '这条更小的路径把体验从寻找地标转向感受氛围。',
    storyBody: '并不是每个遗产时刻都会高声出现。这条小巷关于质感、阴影和节奏。它提醒我们，探索应用可以奖励安静的观察，而不只关注主要景点。',
    notice: [
      '寻找墙面纹理、排水口、石阶和日常维护的痕迹。',
      '观察光线如何从明亮水边过渡到阴影小巷。',
      '听一听这里的声音是否比开阔水边更收拢。',
    ],
    mission: '选择三个词描述这里的氛围，再与山塘街作比较。',
    tags: ['故事', '亲子友好'],
  },
  'chang-gate': {
    name: '阊门',
    shortName: '阊门',
    category: '城门',
    status: '开放中',
    imageLabel: '温暖石质城门框住老城片区',
    storyTitle: '仍然有生活感的门槛',
    storySnippet: '站在老城边界仍像真实通道一样运作的地方，而不只是把它当成背景。',
    storyBody: '在阊门，最有意义的细节是流动。当地人穿行，游客停留，运河的节奏也悄悄影响两者。这个地点把遗产步行理解为日常生活的一部分。',
    notice: [
      '观察石材纹理、屋顶瓦片，以及城门如何框住穿行的人。',
      '比较自行车和行人的速度与旁边较慢的运河氛围。',
      '留意这里如何同时像集合点和方向标识。',
    ],
    mission: '拍下一张城门与当代街道生活同框的照片，记录过去与现在相遇的瞬间。',
    tags: ['附近', '故事', '景观'],
  },
  'market-lane-crossing': {
    name: '市巷路口',
    shortName: '市巷',
    category: '街巷生活',
    status: '热闹繁忙',
    imageLabel: '阊门附近带有店铺、招牌和日常人流的商业街面',
    storyTitle: '商业活力让城门片区保持日常使用',
    storySnippet: '阊门附近的商业街面展示了遗产如何与购物、招牌和日常流动保持连接。',
    storyBody: '阊门不只是历史地标。它周边的商业街面让这个片区在当下仍然有用：店铺招牌、来往顾客和短暂停留的日常事务，把老城门重新放回真实的城市路线中。',
    notice: [
      '观察店铺招牌、街面和来往人群如何形成商业街的节奏。',
      '留意历史地标如何过渡到实际的日常消费空间。',
      '把这里的商业活力与更安静的运河边地点作比较。',
    ],
    mission: '找一个店面细节，说明老城门片区如何仍然作为生活中的商业空间运作。',
    tags: ['附近', '故事', '亲子友好'],
  },
};

const routeTranslations = {
  'warm-up-loop': {
    name: '阊门运河短线',
    duration: '5 分钟',
    distance: '0.3 公里',
    tone: '经典顺序路线',
    description: '按要求顺序连接山塘街、码头台阶、水边小巷、阊门和市巷的紧凑路线。',
  },
};

const favoriteSpotPostcardLines = {
  en: {
    'shantang-street': 'Shantang Street gave this walk its busy canal-side opening.',
    'wharf-steps-corner': 'Wharf Steps Corner became the quiet pause in this route memory.',
    'waterside-alley-walk': 'Waterside Alley Walk turned shade, texture, and sound into the keepsake detail.',
    'chang-gate': 'Chang Gate held the walk together as its living threshold.',
    'market-lane-crossing': 'Market Lane Crossing carried the walk into everyday street life.',
  },
  zh: {
    'shantang-street': '山塘街为这段步行打开了热闹的运河记忆。',
    'wharf-steps-corner': '码头台阶角成为这段路线里安静停顿的记忆。',
    'waterside-alley-walk': '水边小巷把阴影、质感和声音变成了纪念细节。',
    'chang-gate': '阊门像仍在生活中的门槛，把整段步行串联起来。',
    'market-lane-crossing': '市巷路口把这段步行带入真实的日常街巷生活。',
  },
};

export function localizeSpot(spot, language = 'en') {
  if (language !== 'zh') {
    return spot;
  }

  return {
    ...spot,
    ...spotTranslations[spot.id],
  };
}

export function localizeRoute(route, language = 'en') {
  if (language !== 'zh') {
    return route;
  }

  return {
    ...route,
    ...routeTranslations[route.id],
  };
}

export function getNextSpotOnRoute(currentSpotId, route = walkingRoutes[0], spots = heritageSpots) {
  const currentIndex = route.spotIds.indexOf(currentSpotId);

  if (currentIndex === -1 || currentIndex >= route.spotIds.length - 1) {
    return null;
  }

  const nextSpotId = route.spotIds[currentIndex + 1];
  return spots.find((spot) => spot.id === nextSpotId) ?? null;
}

export function getFavoriteSpotPostcardLine(spot, language = 'en') {
  const lines = favoriteSpotPostcardLines[language] ?? favoriteSpotPostcardLines.en;
  const fallback =
    language === 'zh'
      ? `${spot.name}把这段步行变成了一段个人路线记忆。`
      : `${spot.name} shaped this walk into a personal route memory.`;

  return lines[spot.id] ?? fallback;
}

export const featureCards = [
  {
    title: 'Story Hunt',
    detail: 'Short outdoor-friendly story snippets turn each stop into a playful prompt instead of a dense info page.',
    accent: 'teal',
  },
  {
    title: 'Souvenir Postcard',
    detail: 'A postcard that turns mood, route, and favorite place into a keepsake at the end of the walk.',
    accent: 'green',
  },
];
