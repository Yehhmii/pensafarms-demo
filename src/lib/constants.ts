// ─── Camera waypoints ────────────────────────────────────────────
// Each entry is a position + look-at target.
// The camera journeys through these as the user scrolls 0 → 100%.

export const CAMERA_WAYPOINTS = [
  // 0 — Hero: wide establishing shot of the full farm
  { position: [0, 5, 16] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  // 1 — Livestock: drifting toward cattle pasture (right side)
  { position: [5, 2.5, 10] as [number, number, number], target: [2, 0.5, 2] as [number, number, number] },
  // 2 — Products: swings to chicken / coop side (left side)
  { position: [-4, 3, 9] as [number, number, number], target: [-2, 0.5, 0] as [number, number, number] },
  // 3 — Process: close to the barn
  { position: [-5, 2, 4] as [number, number, number], target: [-4, 1, -3] as [number, number, number] },
  // 4 — Sustainability: pulls back to mid-aerial view
  { position: [2, 10, 10] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  // 5 — Contact: high aerial, serene golden view
  { position: [0, 14, 6] as [number, number, number], target: [0, 0, -2] as [number, number, number] },
];

// ─── 3D Scene Layout ──────────────────────────────────────────────

export const TREE_POSITIONS: [number, number, number][] = [
  // Left treeline
  [-11, 0, -10], [-12, 0, -5], [-13, 0, 0], [-12, 0, 5], [-11, 0, 10],
  // Right treeline
  [11, 0, -10], [12, 0, -5], [13, 0, 0], [12, 0, 5], [11, 0, 10],
  // Back treeline
  [-7, 0, -14], [-3.5, 0, -15], [0, 0, -16], [3.5, 0, -15], [7, 0, -14],
  // Scattered accent trees
  [-7, 0, 6], [7, 0, -6], [-5, 0, -7], [5, 0, 8], [1, 0, -11],
  [-9, 0, 11], [9, 0, 11],
];

export const COW_POSITIONS: [number, number, number][] = [
  [3, 0, 3], [4.5, 0, 4.5], [2, 0, 5.5],
  [6, 0, 2.5], [5, 0, 6.5], [1.5, 0, 2],
];

export const CHICKEN_POSITIONS: [number, number, number][] = [
  [-2.5, 0, 1.5], [-1.8, 0, 2.5], [-3, 0, 2], [-1.2, 0, 1],
  [-3.5, 0, 2.8], [-2, 0, 0.5], [-1.5, 0, -0.5], [-2.8, 0, 3.5],
  [-0.8, 0, 2], [-3.2, 0, 1.2],
];

// ─── Brand ────────────────────────────────────────────────────────

export const BRAND = {
  name: 'PensaFarms',
  tagline: 'From Our Pastures to Your Table',
  phone: '+234 800 000 0000',
  email: 'hello@pensafarms.com',
  address: 'PensaFarms Estate, Farm Road, Abuja, Nigeria',
  founded: '2012',
};

// ─── Products ─────────────────────────────────────────────────────

export const PRODUCTS = [
  {
    id: 'eggs',
    emoji: '🥚',
    name: 'Farm Fresh Eggs',
    desc: 'Free-range, hand-collected daily from 8,500 happy hens.',
    tag: 'Most Popular',
  },
  {
    id: 'broiler',
    emoji: '🐔',
    name: 'Broiler Chicken',
    desc: 'Tender, flavourful birds raised on natural grain diets.',
    tag: null,
  },
  {
    id: 'beef',
    emoji: '🐄',
    name: 'Grass-Fed Beef',
    desc: 'Premium cuts from cattle that roam our open pastures.',
    tag: 'Premium',
  },
  {
    id: 'dairy',
    emoji: '🥛',
    name: 'Fresh Dairy',
    desc: 'Pure whole milk, cream and cheese from our dairy herd.',
    tag: null,
  },
  {
    id: 'live',
    emoji: '🌾',
    name: 'Live Livestock',
    desc: 'Healthy, vaccinated animals for resale or personal farms.',
    tag: null,
  },
  {
    id: 'bulk',
    emoji: '📦',
    name: 'Bulk Supply',
    desc: 'Custom wholesale packages for restaurants and retailers.',
    tag: 'B2B',
  },
];

// ─── Livestock stats ──────────────────────────────────────────────

export const LIVESTOCK = [
  { icon: '🐄', name: 'Beef Cattle', count: '240+', label: 'head' },
  { icon: '🐮', name: 'Dairy Cows', count: '80+', label: 'milking' },
  { icon: '🐔', name: 'Broiler Chickens', count: '12,000', label: 'birds' },
  { icon: '🥚', name: 'Layer Hens', count: '8,500', label: 'hens' },
];

// ─── Sustainability stats ─────────────────────────────────────────

export const STATS = [
  { value: 50, suffix: '+', label: 'Acres of Pasture' },
  { value: 20, suffix: 'k+', label: 'Animals Yearly' },
  { value: 12, suffix: ' yrs', label: 'Of Experience' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
];

// ─── Process steps ────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'We Raise With Care',
    desc: 'Every animal on PensaFarms has space, clean water, and the best natural feed. No hormones, no shortcuts.',
    icon: '🌱',
  },
  {
    number: '02',
    title: 'We Harvest With Integrity',
    desc: 'Our humane processing meets the highest standards — from small home orders to large commercial batches.',
    icon: '⚖️',
  },
  {
    number: '03',
    title: 'We Deliver With Pride',
    desc: 'Packed fresh and delivered cold to your door, restaurant, or market stall — anywhere in Nigeria.',
    icon: '🚜',
  },
];
