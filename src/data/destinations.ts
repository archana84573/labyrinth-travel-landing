export type Destination = {
  id: number;
  name: string;
  country: string;
  region: string;
  image: string;
  tagline: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  tags: string[];
  bestTime: string;
  terrain: 'Beach' | 'Hills' | 'Valley';
};

export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Meghalaya',
    country: 'India',
    region: 'Khasi & Jaintia Hills, Northeast India',
    image:
      'https://images.pexels.com/photos/34017584/pexels-photo-34017584.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'Living root bridges grown across jungle rivers',
    description:
      'The Khasi people weave the aerial roots of rubber figs into bridges that take decades to grow and last centuries. Hike past waterfalls to valleys where the rain falls in sheets, where a river runs beneath your feet on a bridge that is still alive.',
    price: 1980,
    duration: '7 nights',
    rating: 4.9,
    reviews: 86,
    tags: ['Valley', 'Living bridges', 'Waterfalls', 'Trekking'],
    bestTime: 'Oct – Apr',
    terrain: 'Valley',
  },
  {
    id: 2,
    name: 'Hà Giang',
    country: 'Vietnam',
    region: 'Northeast frontier, above the Chinese border',
    image:
      'https://images.pexels.com/photos/27404283/pexels-photo-27404283.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'Terraced hills carved into the roof of Vietnam',
    description:
      'The Hà Giang Loop is a zig-zag of cliff-edge road through karst hills stitched with rice terraces. Most travellers never reach this far north. Ride a motorbike past Hmong villages, scale the Flag Tower, and watch the mist peel off the folds of rock at dawn.',
    price: 1640,
    duration: '6 nights',
    rating: 4.8,
    reviews: 124,
    tags: ['Hills', 'Motorbike', 'Rice terraces', 'Frontier'],
    bestTime: 'Sep – Nov',
    terrain: 'Hills',
  },
  {
    id: 3,
    name: 'Munduk',
    country: 'Bali, Indonesia',
    region: 'Central highlands, north of the lakes',
    image:
      'https://images.pexels.com/photos/10740706/pexels-photo-10740706.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'A highland valley of waterfalls and clove farms',
    description:
      'Forget the south. Munduk sits in Bali\'s cool highland spine — a valley where seven waterfalls tumble through coffee, clove and avocado forest, and the morning mist sits so low you can touch it. Trek between falls, swim in rock pools, end the day with a cup picked that morning.',
    price: 1480,
    duration: '5 nights',
    rating: 4.8,
    reviews: 192,
    tags: ['Valley', 'Waterfalls', 'Highlands', 'Coffee'],
    bestTime: 'Apr – Oct',
    terrain: 'Valley',
  },
  {
    id: 4,
    name: 'Paro Taktsang',
    country: 'Bhutan',
    region: 'Paro Valley, western Himalaya',
    image:
      'https://images.pexels.com/photos/34505115/pexels-photo-34505115.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'A monastery clinging to a cliff above the clouds',
    description:
      'The Tiger\'s Nest hangs on a granite wall 900 metres above the Paro Valley — a pocket of prayer flags and gold rooftops reached only on foot. Bhutan measures prosperity in happiness, not GDP, and limits visitors to protect it. Hike up at dawn and sit with monks who arrived before you.',
    price: 4280,
    duration: '8 nights',
    rating: 5.0,
    reviews: 57,
    tags: ['Hills', 'Monastery', 'Himalaya', 'Hiking'],
    bestTime: 'Mar – May',
    terrain: 'Hills',
  },
  {
    id: 5,
    name: 'El Nido',
    country: 'Philippines',
    region: 'Palawan, Bacuit Bay archipelago',
    image:
      'https://images.pexels.com/photos/31337959/pexels-photo-31337959.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'Hidden lagoons walled in by limestone cliffs',
    description:
      'Limestone karsts rise straight out of glass-clear water, hiding lagoons you paddle into through cracks in the rock. Beyond the well-known tours there are beaches with no road, no name, and only a fisherman\'s kayak to reach them. Palawan is what people picture when they imagine paradise — and barely scratch.',
    price: 2240,
    duration: '7 nights',
    rating: 4.9,
    reviews: 248,
    tags: ['Beach', 'Lagoons', 'Islands', 'Kayaking'],
    bestTime: 'Nov – May',
    terrain: 'Beach',
  },
  {
    id: 6,
    name: 'Hampi',
    country: 'India',
    region: 'Karnataka, Vijayanagara ruins',
    image:
      'https://images.pexels.com/photos/29932327/pexels-photo-29932327.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'A boulder-strewn valley of vanished kingdoms',
    description:
      'An empire capital abandoned 500 years ago, its temples and palaces now scattered among hills of round granite boulders that look set there by giants. Ride a coracle across the Tungabhadra, climb to a sunset point, and sleep in a guesthouse among ruins older than the country itself.',
    price: 1340,
    duration: '6 nights',
    rating: 4.7,
    reviews: 175,
    tags: ['Valley', 'Ruins', 'Boulders', 'Temples'],
    bestTime: 'Oct – Feb',
    terrain: 'Valley',
  },
  {
    id: 7,
    name: 'Vang Vieng',
    country: 'Laos',
    region: 'Vientiane Province, central Laos',
    image:
      'https://images.pexels.com/photos/6861657/pexels-photo-6861657.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'Karst peaks reflected in a slow river',
    description:
      'Beyond the old party reputation lies a valley of vertical limestone mountains rising from rice paddies and the Nam Song river. Kayak past caves you can swim into, ride a hot-air balloon over peaks that look like teeth, and sleep in a bungalow where the only sound is geckos.',
    price: 1180,
    duration: '5 nights',
    rating: 4.7,
    reviews: 162,
    tags: ['Valley', 'Karst', 'Caves', 'River'],
    bestTime: 'Nov – Mar',
    terrain: 'Valley',
  },
  {
    id: 8,
    name: 'Ella',
    country: 'Sri Lanka',
    region: 'Uva Province, central highlands',
    image:
      'https://images.pexels.com/photos/19758641/pexels-photo-19758641.jpeg?auto=compress&cs=tinysrgb&w=900',
    tagline: 'Tea hills, cloud forest and a century-old viaduct',
    description:
      'Train through emerald tea hills to a village ringed by peaks. Walk to Little Adam\'s Peak through cloud forest, watch the famous Nine Arch Bridge materialise out of the jungle as the blue train crosses, and finish the day with a cup of single-estate Uva tea grown on the hill above you.',
    price: 1520,
    duration: '6 nights',
    rating: 4.9,
    reviews: 209,
    tags: ['Hills', 'Tea estates', 'Train', 'Hiking'],
    bestTime: 'Dec – Mar',
    terrain: 'Hills',
  },
];
