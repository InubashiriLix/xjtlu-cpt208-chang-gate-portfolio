export const heritageSpots = [
  {
    id: 'chang-gate-arrival',
    slug: 'chang-gate-arrival',
    name: 'Chang Gate Arrival Court',
    shortName: 'Arrival Court',
    category: 'Gateway',
    distanceMeters: 120,
    routeLegMeters: 120,
    walkMinutes: 2,
    status: 'Open now',
    imageLabel: 'Warm stone gate framing the old quarter',
    storyTitle: 'A threshold that still feels lived-in',
    storySnippet:
      'Begin where the old city edge still works like a real crossing, not just a backdrop.',
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
    related: ['market-lane-crossing', 'willow-bridge-view'],
    stamp: {
      name: 'Lantern Gate',
      icon: '◌',
      accent: 'amber',
    },
    coords: { x: 24, y: 46 },
  },
  {
    id: 'market-lane-crossing',
    slug: 'market-lane-crossing',
    name: 'Market Lane Crossing',
    shortName: 'Market Lane',
    category: 'Street Life',
    distanceMeters: 230,
    routeLegMeters: 140,
    walkMinutes: 4,
    status: 'Busy and lively',
    imageLabel: 'Narrow lane with shop signs and soft awnings',
    storyTitle: 'Where errands, snacks, and stories overlap',
    storySnippet:
      'This corner hints at how trade routes become social routes over time.',
    storyBody:
      'A heritage site is not only made of monuments. Lanes like this keep everyday energy visible. The story here is about overlap: practical shopping, chance conversations, and the memory of markets that once relied on the canal moving goods and people nearby.',
    notice: [
      'Watch how stalls, signs, and doorways compress the street into a slower walking pace.',
      'Notice the small transitions from public lane to private threshold.',
      'Listen for the contrast between shop sounds and the quieter canal edge.',
    ],
    mission:
      'Find one tiny detail that feels handmade and sketch it or describe it in one sentence.',
    tags: ['Nearby', 'Stories', 'Family-friendly'],
    related: ['chang-gate-arrival', 'waterside-alley-walk'],
    stamp: {
      name: 'Market Seal',
      icon: '◍',
      accent: 'orange',
    },
    coords: { x: 48, y: 34 },
  },
  {
    id: 'canal-lookout-deck',
    slug: 'canal-lookout-deck',
    name: 'Canal Lookout Deck',
    shortName: 'Lookout Deck',
    category: 'Viewpoint',
    distanceMeters: 360,
    routeLegMeters: 180,
    walkMinutes: 6,
    status: 'Best in soft daylight',
    imageLabel: 'Canal edge with low railing and broad water view',
    storyTitle: 'A broad pause in the walking rhythm',
    storySnippet:
      'The canal opens up here, making it easier to imagine goods, weather, and daily timing shaping the district.',
    storyBody:
      'This stop is about orientation. Looking across the water helps visitors imagine Chang Gate as part of a larger network rather than a single isolated landmark. The canal becomes an organizing line for movement, trade, and memory.',
    notice: [
      'Look at how reflections soften the edges of buildings and trees.',
      'Notice where people naturally slow down to look, rest, or take photos.',
      'Compare the openness of the water with the compression of the nearby streets.',
    ],
    mission:
      'Take a 10-second still pause. What changes first: the soundscape, the light on the water, or your walking pace?',
    tags: ['Nearby', 'Views'],
    related: ['willow-bridge-view', 'wharf-steps-corner'],
    stamp: {
      name: 'Canal Ripple',
      icon: '◜',
      accent: 'teal',
    },
    coords: { x: 68, y: 54 },
  },
  {
    id: 'willow-bridge-view',
    slug: 'willow-bridge-view',
    name: 'Willow Bridge View',
    shortName: 'Willow Bridge',
    category: 'Bridge',
    distanceMeters: 540,
    routeLegMeters: 190,
    walkMinutes: 8,
    status: 'Gentle route',
    imageLabel: 'Stone bridge with willow branches near the canal',
    storyTitle: 'Crossings are stories too',
    storySnippet:
      'Bridges do more than connect two sides. They shape how people pause, look back, and continue.',
    storyBody:
      'At a bridge, movement becomes visible from both directions. You can watch approach, crossing, and departure in one glance. That makes this a strong place to compare the heritage landscape with the present-day habit of wandering, photographing, and meeting.',
    notice: [
      'Look for the best point where you can see both the bridge curve and water beneath it.',
      'Notice whether people walk across quickly or stop halfway to look around.',
      'Watch for framed views back toward the lanes and forward along the canal.',
    ],
    mission:
      'Find the midpoint of the crossing and choose a direction that feels more inviting. Why?',
    tags: ['Views', 'Stories', 'Family-friendly'],
    related: ['canal-lookout-deck', 'waterside-alley-walk'],
    stamp: {
      name: 'Bridge Arc',
      icon: '◠',
      accent: 'green',
    },
    coords: { x: 76, y: 30 },
  },
  {
    id: 'waterside-alley-walk',
    slug: 'waterside-alley-walk',
    name: 'Waterside Alley Walk',
    shortName: 'Waterside Alley',
    category: 'Old Street',
    distanceMeters: 460,
    routeLegMeters: 160,
    walkMinutes: 7,
    status: 'Shaded and calm',
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
      'Choose three words that describe the atmosphere here, then compare them with the canal deck.',
    tags: ['Stories', 'Family-friendly'],
    related: ['market-lane-crossing', 'wharf-steps-corner'],
    stamp: {
      name: 'Alley Whisper',
      icon: '◟',
      accent: 'teal',
    },
    coords: { x: 39, y: 66 },
  },
  {
    id: 'wharf-steps-corner',
    slug: 'wharf-steps-corner',
    name: 'Wharf Steps Corner',
    shortName: 'Wharf Steps',
    category: 'Canal Edge',
    distanceMeters: 620,
    routeLegMeters: 210,
    walkMinutes: 10,
    status: 'Good final stop',
    imageLabel: 'Stone steps leading to a quieter canal edge',
    storyTitle: 'End with a memory, not only a fact',
    storySnippet:
      'Stone steps by the water make a natural ending point for reflection and souvenir-making.',
    storyBody:
      'This final stop suits the postcard moment. Steps by the canal invite a pause, a look back across the route, and a personal interpretation of the walk. It is less about proving knowledge and more about turning observation into a lasting memory.',
    notice: [
      'Look at how the step edges meet the water line and nearby masonry.',
      'Notice where people choose to stop rather than keep moving onward.',
      'Think about which earlier stop this place connects back to emotionally.',
    ],
    mission:
      'Pick the stop that changed your mood the most and prepare a postcard caption from here.',
    tags: ['Views', 'Stories'],
    related: ['canal-lookout-deck', 'waterside-alley-walk'],
    stamp: {
      name: 'Wharf Echo',
      icon: '◎',
      accent: 'amber',
    },
    coords: { x: 84, y: 72 },
  },
];

export const walkingRoutes = [
  {
    id: 'warm-up-loop',
    name: 'Warm-Up Canal Loop',
    duration: '18 min',
    distance: '0.9 km',
    tone: 'Easy first walk',
    description:
      'A short route for first-time visitors who want a clear start, one lively lane, and a strong canal viewpoint.',
    spotIds: ['chang-gate-arrival', 'market-lane-crossing', 'canal-lookout-deck'],
  },
  {
    id: 'bridge-and-breeze',
    name: 'Bridge & Breeze Trail',
    duration: '24 min',
    distance: '1.3 km',
    tone: 'Views and calm corners',
    description:
      'A slightly longer walk that mixes bridge views, quieter textures, and a reflective waterside ending.',
    spotIds: ['canal-lookout-deck', 'willow-bridge-view', 'waterside-alley-walk', 'wharf-steps-corner'],
  },
];

export const featureCards = [
  {
    title: 'Story Hunt',
    detail: 'Short outdoor-friendly story snippets turn each stop into a playful prompt instead of a dense info page.',
    accent: 'teal',
  },
  {
    title: 'Memory Stamps',
    detail: 'Every stop has a collectible mark so progress feels visible and rewarding.',
    accent: 'amber',
  },
  {
    title: 'Souvenir Postcard',
    detail: 'A postcard that turns mood, route, and favorite place into a keepsake at the end of the walk.',
    accent: 'green',
  },
];

export const rewardMilestones = [
  {
    count: 1,
    title: 'First Impression',
    reward: 'The stamp booklet starts filling in.',
  },
  {
    count: 3,
    title: 'Souvenir Ready',
    reward: 'The postcard generator unlocks.',
  },
  {
    count: 5,
    title: 'Canal Storykeeper',
    reward: 'The full route feels complete as a personal heritage journey.',
  },
];

