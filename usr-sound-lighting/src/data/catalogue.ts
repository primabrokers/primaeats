/**
 * Hire catalogue.
 *
 * SAMPLE CONTENT: products, specs and prices are realistic examples written for
 * the redesign. Replace them with USR's real inventory and rates before launch.
 * `image` can point at a real photo; by default it uses the 3D render generated
 * by `npm run renders`.
 */

export type Category = "sound" | "lighting" | "staging" | "effects";

export type ModelKind =
  | "speakerPair"
  | "speakerStack"
  | "lineArray"
  | "mics"
  | "djBooth"
  | "uplighter"
  | "movingHead"
  | "discoRig"
  | "stageWash"
  | "gobo"
  | "danceFloor"
  | "stageDecks"
  | "truss"
  | "lowFog"
  | "sparks"
  | "hazer";

export type EventType = "Weddings" | "Parties" | "Corporate" | "Concerts" | "Community";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  model: ModelKind;
  summary: string;
  description: string[];
  /** Price for one event day, in pounds. */
  dayRate: number;
  /** Shown instead of "/ day" when the price works differently. */
  unit?: string;
  capacity?: string;
  inTheBox: string[];
  specs: [string, string][];
  goodFor: EventType[];
  /** Can be collected and returned without our crew. */
  dryHire: boolean;
  /** Always supplied with an engineer or operator. */
  crewed: boolean;
  /** Lighting the customer can set to a colour. */
  colourPick?: boolean;
  /** Priced once per event rather than per hire day. */
  perEvent?: boolean;
  featured?: boolean;
  image?: string;
}

export const categories: Record<Category, { label: string; gel: string; blurb: string }> = {
  sound: {
    label: "Sound",
    gel: "var(--gel-sound)",
    blurb: "From a mic for the speeches to a line array for a thousand people.",
  },
  lighting: {
    label: "Lighting",
    gel: "var(--gel-lighting)",
    blurb: "Uplighting in your colours, moving heads, stage washes and monogram gobos.",
  },
  staging: {
    label: "Staging & floors",
    gel: "var(--gel-staging)",
    blurb: "Stage decks, truss and starlit LED dance floors.",
  },
  effects: {
    label: "Effects",
    gel: "var(--gel-effects)",
    blurb: "Low fog for the first dance, cold sparks and haze.",
  },
};

export const hireLengths = [
  { id: "day", label: "One day", multiplier: 1 },
  { id: "weekend", label: "Weekend (Fri–Mon)", multiplier: 1.5 },
  { id: "week", label: "Week", multiplier: 3 },
] as const;

export type HireLength = (typeof hireLengths)[number]["id"];

export const serviceLevels = [
  {
    id: "collect",
    label: "Collect and return",
    detail: "You collect from Prestwich and bring it back. Dry-hire kit only.",
    fee: 0,
  },
  {
    id: "delivered",
    label: "Delivered and set up",
    detail: "We deliver, rig, test and take everything away after the event.",
    fee: 85,
  },
  {
    id: "crewed",
    label: "Delivered, set up and run",
    detail: "As above, plus a technician on site for the whole event.",
    fee: 85 + 220,
  },
] as const;

export type ServiceLevel = (typeof serviceLevels)[number]["id"];

export const products: Product[] = [
  // ——— Sound ———
  {
    slug: "party-pa",
    name: "Party PA system",
    category: "sound",
    model: "speakerPair",
    summary: "Two 12-inch speakers on stands with a compact mixer. Plug in a phone or a mic and go.",
    description: [
      "Our most-booked system for birthdays, engagement parties and smaller receptions. Two 12-inch active speakers give clear, full sound without overpowering the room.",
      "The compact mixer takes Bluetooth, a laptop or a DJ controller, and a microphone for speeches at the same time.",
    ],
    dayRate: 95,
    capacity: "Up to 120 guests",
    inTheBox: [
      "2 × 12-inch active speakers",
      "2 × speaker stands",
      "4-channel mixer with Bluetooth",
      "1 × wired microphone and stand",
      "All cables and a power strip",
    ],
    specs: [
      ["Power", "2 × 1,000 W peak"],
      ["Inputs", "Bluetooth, 2 × XLR/jack combo, stereo RCA, 3.5 mm"],
      ["Speaker weight", "17 kg each"],
      ["Power needed", "One 13 A socket"],
      ["Set-up time", "20 minutes"],
    ],
    goodFor: ["Parties", "Weddings", "Community"],
    dryHire: true,
    crewed: false,
    featured: true,
  },
  {
    slug: "club-pa",
    name: "Club PA with subwoofers",
    category: "sound",
    model: "speakerStack",
    summary: "Two 15-inch tops over two 18-inch subs, for dance floors that need to be felt.",
    description: [
      "When the evening turns into a party, this is the system that carries it. The 18-inch subwoofers add real low end that small speakers can't reach, while the tops keep vocals and speeches clear.",
      "We tune the system to the room on arrival and set sensible limits so the venue's sound limiter never cuts you off mid-song.",
    ],
    dayRate: 240,
    capacity: "Up to 300 guests",
    inTheBox: [
      "2 × 15-inch active tops",
      "2 × 18-inch active subwoofers",
      "Pole mounts",
      "8-channel digital mixer",
      "2 × wired microphones",
      "All cables",
    ],
    specs: [
      ["Power", "Tops 2 × 1,400 W, subs 2 × 2,000 W"],
      ["Frequency range", "35 Hz – 20 kHz"],
      ["Footprint", "Two stacks, 60 × 70 cm each"],
      ["Power needed", "Two 13 A sockets on separate circuits"],
      ["Set-up time", "45 minutes"],
    ],
    goodFor: ["Weddings", "Parties", "Community"],
    dryHire: true,
    crewed: false,
    featured: true,
  },
  {
    slug: "line-array",
    name: "Line array concert system",
    category: "sound",
    model: "lineArray",
    summary: "Flown line array with subwoofers and a digital desk, run by our sound engineer.",
    description: [
      "For concerts, festivals and large halls where every seat needs the same clear sound. Line array cabinets throw sound evenly to the back of the room without deafening the front row.",
      "Priced with a sound engineer, monitors for the performers and a digital desk. We'll visit the venue beforehand to plan where it flies from.",
    ],
    dayRate: 1250,
    capacity: "300 – 1,000 guests",
    inTheBox: [
      "8 × line array cabinets on flying frames",
      "4 × dual 18-inch subwoofers",
      "Digital mixing desk with stage box",
      "4 × stage monitor wedges",
      "Sound engineer for the event",
    ],
    specs: [
      ["Coverage", "Up to 40 m throw"],
      ["Channels", "32 inputs, 12 mixes"],
      ["Power needed", "32 A single-phase or 2 × 16 A"],
      ["Site visit", "Included"],
      ["Set-up time", "3 – 4 hours"],
    ],
    goodFor: ["Concerts", "Corporate", "Community"],
    dryHire: false,
    crewed: true,
  },
  {
    slug: "wireless-mics",
    name: "Wireless microphone kit",
    category: "sound",
    model: "mics",
    summary: "Two handheld radio mics with a dual receiver, for speeches, ceremonies and quizzes.",
    description: [
      "Reliable UHF handheld mics that work anywhere in the room, so speeches can happen at the top table and the best man can wander.",
      "Plugs into any of our systems or most venue sound systems. Fresh batteries fitted and spares in the case.",
    ],
    dayRate: 40,
    inTheBox: [
      "2 × handheld UHF microphones",
      "Dual-channel receiver",
      "XLR and jack cables",
      "Spare batteries",
    ],
    specs: [
      ["Range", "Up to 60 m line of sight"],
      ["Battery life", "About 8 hours"],
      ["Output", "XLR balanced and 6.35 mm jack"],
    ],
    goodFor: ["Weddings", "Corporate", "Parties", "Community"],
    dryHire: true,
    crewed: false,
  },
  {
    slug: "dj-booth",
    name: "DJ booth and decks",
    category: "sound",
    model: "djBooth",
    summary: "An LED-lit booth front with two media players, a four-channel mixer and a monitor.",
    description: [
      "Everything a DJ needs behind a clean, lit booth front that matches the rest of your lighting. The media players read USB sticks, so your DJ can arrive with just their music.",
      "Pair it with the Club PA for a complete party set-up.",
    ],
    dayRate: 165,
    inTheBox: [
      "Folding booth with LED-lit front panel",
      "2 × media players",
      "4-channel DJ mixer",
      "Booth monitor speaker",
      "Headphones on request",
    ],
    specs: [
      ["Booth size", "1.5 m wide, 1.1 m tall"],
      ["Front panel", "White fabric, lit to any colour"],
      ["Power needed", "One 13 A socket"],
    ],
    goodFor: ["Weddings", "Parties"],
    dryHire: true,
    crewed: false,
    colourPick: true,
  },

  // ——— Lighting ———
  {
    slug: "wireless-uplighters",
    name: "Wireless LED uplighters (set of 8)",
    category: "lighting",
    model: "uplighter",
    summary: "Battery uplighters that wash walls and pillars in your colour, with no cables to hide.",
    description: [
      "The quickest way to transform a venue. Place them against walls, pillars or under tables and the room takes on your colour scheme. They run all night on battery, so there are no trailing cables for guests to trip on.",
      "Choose any colour, or ask us to fade between colours as the evening moves from dinner to dancing.",
    ],
    dayRate: 140,
    unit: "per set of 8",
    inTheBox: [
      "8 × battery LED uplighters",
      "Wireless remote",
      "Charging flight case",
    ],
    specs: [
      ["Battery life", "12+ hours at full colour"],
      ["Colours", "Any RGB + amber + white mix"],
      ["Control", "Remote or wireless DMX"],
      ["Size", "18 × 12 × 12 cm each"],
    ],
    goodFor: ["Weddings", "Corporate", "Parties"],
    dryHire: true,
    crewed: false,
    colourPick: true,
    featured: true,
  },
  {
    slug: "moving-heads",
    name: "Moving head pair",
    category: "lighting",
    model: "movingHead",
    summary: "Two beam/spot moving heads with a controller loaded with ready-made shows.",
    description: [
      "Moving heads throw tight beams across the room and sweep in time with the music. With a little haze, they're the difference between a room with lights and a light show.",
      "They come with a simple controller loaded with shows we've programmed, so there's nothing to learn. Want it run properly? Add a technician when you book.",
    ],
    dayRate: 130,
    unit: "per pair",
    inTheBox: [
      "2 × beam/spot moving heads",
      "Stands or T-bar",
      "Controller with preset shows",
      "Safety bonds and cables",
    ],
    specs: [
      ["Source", "150 W LED"],
      ["Effects", "14 colours, 2 gobo wheels, prism"],
      ["Movement", "540° pan, 270° tilt"],
      ["Power needed", "One 13 A socket"],
    ],
    goodFor: ["Weddings", "Parties", "Concerts"],
    dryHire: true,
    crewed: false,
    colourPick: true,
    featured: true,
  },
  {
    slug: "disco-package",
    name: "Disco lighting package",
    category: "lighting",
    model: "discoRig",
    summary: "Four moving heads, four LED pars and a hazer on T-bars, synced to the music.",
    description: [
      "A complete dance-floor lighting rig that reacts to the music. Two T-bar stands each carry a pair of moving heads and a pair of wash lights, with a hazer to show off the beams.",
      "It's the lighting half of most of our party packages.",
    ],
    dayRate: 210,
    inTheBox: [
      "4 × moving heads",
      "4 × LED par washes",
      "2 × T-bar stands",
      "Hazer and fluid",
      "Sound-to-light controller",
    ],
    specs: [
      ["Footprint", "Two stands, 1.2 m wide each"],
      ["Height", "Up to 3 m"],
      ["Power needed", "Two 13 A sockets"],
      ["Set-up time", "40 minutes"],
    ],
    goodFor: ["Parties", "Weddings"],
    dryHire: true,
    crewed: false,
    colourPick: true,
  },
  {
    slug: "stage-wash",
    name: "Stage wash on truss",
    category: "lighting",
    model: "stageWash",
    summary: "LED pars and moving heads on a goalpost truss, with a lighting operator.",
    description: [
      "Proper stage lighting for bands, awards nights and presentations. Eight LED pars light the performers evenly from the front while moving heads add movement behind them.",
      "Includes the goalpost truss, a lighting desk and an operator who follows the running order.",
    ],
    dayRate: 420,
    inTheBox: [
      "6 m goalpost truss",
      "8 × LED par washes",
      "4 × moving heads",
      "Lighting desk",
      "Lighting operator for the event",
    ],
    specs: [
      ["Truss", "6 m wide × 3.5 m high"],
      ["Power needed", "Two 16 A or four 13 A sockets"],
      ["Set-up time", "2 hours"],
    ],
    goodFor: ["Concerts", "Corporate", "Community"],
    dryHire: false,
    crewed: true,
    colourPick: true,
  },
  {
    slug: "gobo-projector",
    name: "Monogram gobo projector",
    category: "lighting",
    model: "gobo",
    summary: "Projects your names, initials or logo onto the dance floor or a wall.",
    description: [
      "Send us your names, a monogram or a company logo and we'll have a custom metal gobo cut. It's projected crisp and bright onto the dance floor, a wall or the ceiling.",
      "Glass colour gobos are available if the design needs more than one colour. Allow ten working days for the gobo to be made.",
    ],
    dayRate: 120,
    unit: "per event, gobo included",
    inTheBox: [
      "LED gobo projector with focus lens",
      "Custom-cut steel gobo (yours to keep)",
      "Mounting clamp or floor stand",
    ],
    specs: [
      ["Projection size", "1 – 4 m wide"],
      ["Lead time", "10 working days for the gobo"],
      ["Power needed", "One 13 A socket"],
    ],
    goodFor: ["Weddings", "Corporate"],
    dryHire: false,
    crewed: false,
    perEvent: true,
    colourPick: true,
  },

  // ——— Staging & floors ———
  {
    slug: "starlit-dance-floor",
    name: "Starlit LED dance floor",
    category: "staging",
    model: "danceFloor",
    summary: "Gloss black or white panels with hundreds of twinkling LEDs. Sizes from 12 × 12 ft.",
    description: [
      "The centrepiece of a wedding reception. Each panel is set with twinkling white LEDs under a high-gloss finish, so the floor sparkles under the lighting.",
      "The price is for a 16 × 16 ft floor, which suits about 150 guests. We'll confirm the right size for your venue when we quote.",
    ],
    dayRate: 450,
    unit: "16 × 16 ft floor",
    capacity: "Around 150 guests",
    inTheBox: [
      "Starlit panels in black or white",
      "Ramped edging on all sides",
      "Installation and removal by our crew",
    ],
    specs: [
      ["Sizes", "12 × 12 ft to 24 × 24 ft"],
      ["Finish", "Gloss black or gloss white"],
      ["Power needed", "One 13 A socket"],
      ["Set-up time", "1 hour"],
    ],
    goodFor: ["Weddings", "Parties", "Corporate"],
    dryHire: false,
    crewed: false,
    featured: true,
  },
  {
    slug: "stage-decks",
    name: "Stage platform decks",
    category: "staging",
    model: "stageDecks",
    summary: "8 × 4 ft stage decks on adjustable legs, with skirting and steps.",
    description: [
      "Build a stage for a band, a top table or a speaker. Each deck is 8 × 4 ft and stands on legs from 40 cm to 1 m high.",
      "Priced per deck. Six decks make a 24 × 8 ft stage, which fits a five-piece band. Black skirting and steps are included.",
    ],
    dayRate: 38,
    unit: "per deck",
    inTheBox: ["8 × 4 ft deck", "Legs at your chosen height", "Black skirting", "Steps (one set per stage)"],
    specs: [
      ["Deck size", "2.44 × 1.22 m"],
      ["Heights", "40, 60, 80 or 100 cm"],
      ["Load rating", "750 kg/m²"],
    ],
    goodFor: ["Concerts", "Corporate", "Community", "Weddings"],
    dryHire: false,
    crewed: false,
  },
  {
    slug: "goalpost-truss",
    name: "Goalpost truss (6 m)",
    category: "staging",
    model: "truss",
    summary: "A free-standing box-truss frame for lights, banners or a backdrop.",
    description: [
      "Aluminium box truss that frames a stage or a dance floor and gives lights somewhere to hang. Add a black or white drape to create a backdrop.",
    ],
    dayRate: 140,
    inTheBox: ["2 × 3.5 m uprights with base plates", "6 m cross-beam", "Couplers and safety pins"],
    specs: [
      ["Size", "6 m wide × 3.5 m high"],
      ["Truss", "290 mm box truss"],
      ["Set-up time", "1 hour with two crew"],
    ],
    goodFor: ["Concerts", "Corporate", "Weddings"],
    dryHire: false,
    crewed: false,
  },

  // ——— Effects ———
  {
    slug: "low-fog",
    name: "Low fog for the first dance",
    category: "effects",
    model: "lowFog",
    summary: "Thick, low-lying fog that hugs the floor, so it looks like you're dancing on clouds.",
    description: [
      "Made with chilled fog so it stays at ankle height and doesn't set off smoke alarms in most venues. It fades within a few minutes and leaves no residue.",
      "An operator times it to your first dance. We check with your venue before booking.",
    ],
    dayRate: 175,
    unit: "per dance",
    inTheBox: ["Low fog machine", "Operator for the moment", "Venue check"],
    specs: [
      ["Coverage", "Up to 24 × 24 ft floor"],
      ["Duration", "About 3 minutes per burst"],
      ["Residue", "None"],
    ],
    goodFor: ["Weddings"],
    dryHire: false,
    crewed: true,
    perEvent: true,
    featured: true,
  },
  {
    slug: "cold-sparks",
    name: "Cold spark fountains (pair)",
    category: "effects",
    model: "sparks",
    summary: "Indoor-safe spark fountains for entrances, first dances and big reveals.",
    description: [
      "Cold spark machines create a fountain of sparks that are cool to the touch, with no smoke or smell. Most venues allow them where pyrotechnics aren't permitted.",
      "Triggered by our operator on cue. Heights from 1 to 5 metres.",
    ],
    dayRate: 230,
    unit: "per pair",
    inTheBox: ["2 × cold spark machines", "Spark granules", "Wireless trigger", "Operator"],
    specs: [
      ["Height", "1 – 5 m"],
      ["Burst length", "Up to 30 seconds"],
      ["Safety", "Cool-touch sparks, no smoke"],
    ],
    goodFor: ["Weddings", "Corporate", "Concerts"],
    dryHire: false,
    crewed: true,
    perEvent: true,
  },
  {
    slug: "hazer",
    name: "Haze machine",
    category: "effects",
    model: "hazer",
    summary: "A fine, even haze that makes lighting beams visible across the room.",
    description: [
      "Haze is what makes beams visible in the air. This hazer produces a fine, even mist that hangs in the room without looking like smoke.",
      "Water-based fluid. Check your venue's smoke detection before booking — we can advise.",
    ],
    dayRate: 40,
    inTheBox: ["Hazer", "Fluid for the event", "Timer remote"],
    specs: [
      ["Fluid", "Water-based"],
      ["Output", "Adjustable, continuous"],
      ["Power needed", "One 13 A socket"],
    ],
    goodFor: ["Parties", "Concerts", "Weddings"],
    dryHire: true,
    crewed: false,
  },
];

export interface Package {
  slug: string;
  name: string;
  forWho: string;
  from: number;
  gel: string;
  includes: { slug?: string; label: string }[];
  notes: string;
}

export const packages: Package[] = [
  {
    slug: "wedding",
    name: "Wedding day",
    forWho: "Ceremony, speeches and the evening party, all from one team.",
    from: 1150,
    gel: "var(--gel-lighting)",
    includes: [
      { slug: "wireless-mics", label: "Wireless mics for the ceremony and speeches" },
      { slug: "club-pa", label: "Club PA for the evening" },
      { slug: "wireless-uplighters", label: "16 uplighters in your colours" },
      { slug: "starlit-dance-floor", label: "16 × 16 ft starlit dance floor" },
      { slug: "moving-heads", label: "Moving head pair over the floor" },
      { label: "Technician through the speeches and first dance" },
    ],
    notes: "Add low fog for the first dance or a monogram gobo with your initials.",
  },
  {
    slug: "party",
    name: "Party and celebration",
    forWho: "Birthdays, bar and bat mitzvahs, anniversaries and engagement parties.",
    from: 640,
    gel: "var(--gel-staging)",
    includes: [
      { slug: "party-pa", label: "Party PA with a microphone" },
      { slug: "disco-package", label: "Disco lighting package" },
      { slug: "wireless-uplighters", label: "8 uplighters" },
      { label: "12 × 12 ft starlit dance floor" },
      { label: "Delivery, set-up and take-down" },
    ],
    notes: "Upgrade to the Club PA for more than 120 guests.",
  },
  {
    slug: "live",
    name: "Live band and concert",
    forWho: "Gigs, school shows and community concerts with a proper stage.",
    from: 2350,
    gel: "var(--gel-sound)",
    includes: [
      { slug: "line-array", label: "Line array system with sound engineer" },
      { slug: "stage-decks", label: "24 × 8 ft stage (six decks)" },
      { slug: "stage-wash", label: "Stage wash on truss with operator" },
      { slug: "hazer", label: "Haze" },
    ],
    notes: "Smaller rooms can use the Club PA instead, which brings the price down.",
  },
  {
    slug: "corporate",
    name: "Conference and awards",
    forWho: "Presentations, product launches, dinners and award ceremonies.",
    from: 780,
    gel: "var(--gel-effects)",
    includes: [
      { slug: "party-pa", label: "Speech PA" },
      { slug: "wireless-mics", label: "Four wireless microphones" },
      { slug: "wireless-uplighters", label: "Uplighting in your brand colour" },
      { slug: "gobo-projector", label: "Logo gobo projection" },
      { label: "Technician for the running order" },
    ],
    notes: "Add a stage and screen support on request.",
  },
];

export const lightColours = [
  // the first three are the logo's own colours; the rest are common theme requests
  { name: "USR purple", hex: "#9a4de0" },
  { name: "Orchid", hex: "#c589e3" },
  { name: "White", hex: "#f2eef6" },
  { name: "Ice blue", hex: "#8fd3ff" },
  { name: "Pink", hex: "#ff7ad0" },
  { name: "Amber", hex: "#ffa630" },
] as const;

/** A colour name mid-sentence: "USR purple" keeps its capitals, "Magenta" becomes "magenta". */
export const colourPhrase = (name: string) => (/^[A-Z]{2,}/.test(name) ? name : name.toLowerCase());

/** Colour a model's lights show before anyone picks one. */
export const defaultLightColour: Record<Category, string> = {
  sound: "#f2eef6",
  lighting: "#9a4de0",
  staging: "#c589e3",
  effects: "#f2eef6",
};

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const packageBySlug = (slug: string) => packages.find((p) => p.slug === slug);
export const productImage = (p: Product) => p.image ?? `/renders/${p.slug}.png`;
