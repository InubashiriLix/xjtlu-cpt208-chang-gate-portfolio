export const changGateLocation = { lng: 120.605741078035, lat: 31.315099315692006 };
export const demoUserLocation = { lng: 120.60350126096095, lat: 31.314318747226537 };

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
    stamp: {
      name: 'Shantang Seal',
      icon: '◇',
      accent: 'green',
    },
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
    stamp: {
      name: 'Wharf Echo',
      icon: '◎',
      accent: 'amber',
    },
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
    stamp: {
      name: 'Alley Whisper',
      icon: '◟',
      accent: 'teal',
    },
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
    stamp: {
      name: 'Lantern Gate',
      icon: '◌',
      accent: 'amber',
    },
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
    related: ['chang-gate', 'shantang-street'],
    stamp: {
      name: 'Market Seal',
      icon: '◍',
      accent: 'orange',
    },
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
