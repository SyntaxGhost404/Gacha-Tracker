export type Platform = 'Android' | 'iOS' | 'PC' | 'PS5' | 'Switch';
export type Region = 'Global' | 'JP' | 'CN' | 'KR' | 'NA' | 'EU' | 'SEA';
export type GameStatus = 'Released' | 'Pre-registration' | 'In Development' | 'Announced';
export type DevStatus = 'Technical Test' | 'Closed Beta' | 'Open Beta';

export interface GachaGame {
  id: string;
  name: string;
  alternativeName?: string;
  genre: string;
  regions: Region[];
  status: GameStatus;
  devStatus?: DevStatus;
  releaseDate?: string;
  releaseDateConfirmed?: boolean;
  description: string;
  platforms: Platform[];
  engine?: string;
  bannerColor: string;
  iconInitials?: string;
  bannerImage?: string;
  profileImage?: string;
}

export const gachaGames: GachaGame[] = [
  {
    id: 'allfiring',
    name: 'ALLfiring',
    alternativeName: 'Ring of Fire: Prometheus',
    genre: 'Action RPG Gacha',
    regions: ['Global'],
    status: 'Released',
    releaseDate: '2026-05-14',
    releaseDateConfirmed: true,
    description:
      'ALLfiring, formerly known as Ring of Fire: Prometheus, is an anime-style side-scrolling action RPG with voxel sandbox exploration, real-time three-character switching combat, and a dark fantasy world centered on carrying the flame of hope.',
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#1a1208',
    iconInitials: 'AF',
    bannerImage: '/banners/allfiring.png',
    profileImage: '/profiles/allfiring.png',
  },
  {
    id: 'hololive-dreams',
    name: 'hololive Dreams',
    alternativeName: 'holodori',
    genre: 'Rhythm RPG',
    regions: ['Global'],
    status: 'Pre-registration',
    releaseDate: '2026-08-31',
    releaseDateConfirmed: false,
    description:
      'hololive Dreams (also known as holodori) is the first official hololive mobile game, a rhythm RPG developed by QualiArts in collaboration with Cover Corporation. Players enjoy full-fledged rhythm gameplay based on official music videos and live concerts, with over 150 songs at launch including hololive originals and covers. Over 50 hololive VTubers appear as collectible characters.',
    platforms: ['iOS', 'Android'],
    engine: 'N/A',
    bannerColor: '#121a10',
    iconInitials: 'HD',
    bannerImage: '/banners/hololive-dreams.jpg',
    profileImage: '/profiles/hololive-dreams.webp',
  },
  {
    id: 'ananta',
    name: 'ANANTA',
    alternativeName: 'Project Mugen',
    genre: 'Urban Open-World RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Technical Test',
    description:
      "Previously known as Project Mugen, Ananta is a free-to-play urban open-world RPG. Players take on the role of a supernatural investigator called an 'Infinite Trigger,' exploring the city of Nova Inception Urbs, investigating paranormal events, and battling a force known as 'Chaos'. The game has drawn comparisons to an 'anime GTA' and features a blend of exploration, combat, and interaction with a vibrant city.",
    platforms: ['Android', 'iOS', 'PC', 'PS5'],
    engine: 'Unity',
    bannerColor: '#0e1520',
    iconInitials: 'AN',
    bannerImage: '/banners/ananta.png',
    profileImage: '/profiles/ananta.png',
  },
  {
    id: 'azur-promilia',
    name: 'Azur Promilia',
    genre: 'Open-World RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Azur Promilia is a highly anticipated open-world action RPG with a strong emphasis on creature companionship. Developed by Manjuu Games, the creators of Azur Lane, the game is set in a vibrant fantasy world where players can explore diverse landscapes. A core feature is the ability to befriend, tame, and fight alongside a wide variety of creatures called 'Kipipis,' each with unique abilities that aid in both combat and exploration.",
    platforms: ['PC', 'PS5', 'Android', 'iOS'],
    engine: 'Unity',
    bannerColor: '#0a1520',
    iconInitials: 'AP',
    bannerImage: '/banners/azur-promilia.jpeg',
    profileImage: '/profiles/azur-promilia.jpg',
  },
  {
    id: 'chasing-kaleidorider',
    name: 'Chasing Kaleidorider',
    genre: '3D Romance RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "A 'RIDER girl-focused 3D romance RPG' set in the futuristic city of Terminus. Players take on the role of a 'Navigator' and team up with super-powered girls on motorbikes to fight against 'Hysteria'. Pre-registration is open, with information on offline events and testing phases available.",
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#18101a',
    iconInitials: 'CK',
    bannerImage: '/banners/chasing-kaleidorider.jpeg',
    profileImage: '/profiles/chasing-kaleidorider.jpg',
  },
  {
    id: 'codename-bang-bang',
    name: 'Codename: Bang Bang',
    alternativeName: '代号砰砰',
    genre: 'Otome RPG',
    regions: ['CN'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'Codename: Bang Bang is a highly anticipated otome RPG with a dark, mature theme. The game is set in a fictional, mafia-run kingdom where the player takes on the role of the First Duke of Milan, a ruthless female mafia boss. The protagonist is a powerful figure on a quest for revenge, aiming to rebuild her fallen family enterprise through manipulation, power plays, and seduction.',
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#1a0e0e',
    iconInitials: 'BB',
    bannerImage: '/banners/codename-bang-bang.jpeg',
    profileImage: '/profiles/codename-bang-bang.png',
  },
  {
    id: 'digimon-alysion',
    name: 'DIGIMON ALYSION',
    genre: 'Trading Card Game',
    regions: ['Global', 'JP'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "DIGIMON ALYSION is an upcoming mobile TCG that will allow players to play the Digimon Trading Card Game digitally. The game takes place in the same world as the Digimon Liberator web comic. In the metaverse space LACUNA, players encounter new friends and rivals while their love for Digimon grows.",
    platforms: ['iOS', 'Android'],
    engine: 'N/A',
    bannerColor: '#0e1020',
    iconInitials: 'DA',
    bannerImage: '/banners/digimon-alysion.jpg',
    profileImage: '/profiles/digimon-alysion.jpg',
  },
  {
    id: 'honkai-nexus-anima',
    name: 'Honkai: Nexus Anima',
    genre: 'RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'A brand-new role-playing game in the Honkai universe with creature collection and strategy combat. Players bond with Anima — spirits embodying paired concepts like Light & Dark — and use them in both exploration and battle. You play as a traveler exploring a fractured world where the bonds of Nexus have been severed.',
    platforms: ['PC', 'iOS', 'Android'],
    engine: 'N/A',
    bannerColor: '#0c1020',
    iconInitials: 'HN',
    bannerImage: '/banners/honkai-nexus-anima.jpg',
    profileImage: '/profiles/honkai-nexus-anima.jpg',
  },
  {
    id: 'illusion-connect-re',
    name: 'Illusion Connect: Re',
    genre: 'RPG Strategy',
    regions: ['Global', 'SEA', 'NA'],
    status: 'Pre-registration',
    devStatus: 'Closed Beta',
    description:
      'Illusion Connect: Re is the return of the anime strategy RPG where players command Radiants in real-time tactical battles against Nightmares, collect a roster of Live2D characters, build bonds, and decorate a home base between battles.',
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#1a1015',
    iconInitials: 'IC',
    bannerImage: '/banners/illusion-connect-re.jpg',
    profileImage: '/profiles/illusion-connect-re.webp',
  },
  {
    id: 'kings-raid-revival',
    name: "King's Raid (Revival)",
    genre: 'RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Originally developed by Vespa, the service for King's Raid was terminated. However, Masangsoft has acquired the IP and is preparing for a full-scale global relaunch of the popular mobile RPG, known for its real-time 3D battles and player-friendly hero acquisition system.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'Unity',
    bannerColor: '#1a1208',
    iconInitials: 'KR',
    bannerImage: '/banners/kings-raid-revival.jpg',
    profileImage: '/profiles/kings-raid-revival.jpg',
  },
  {
    id: 'last-origin-r-plus',
    name: 'LAST ORIGIN R+',
    genre: 'Turn-Based RPG',
    regions: ['Global', 'NA', 'EU', 'SEA'],
    status: 'Pre-registration',
    description:
      'LAST ORIGIN R+ is the global version of the squad-based RPG in which you command bioroids in a ruined apocalyptic world after humanity was destroyed by machine-parasitizing iron insects. Build squads through resource-based production and fight turn-based battles where abilities and formation changes shape the outcome.',
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#0e1818',
    iconInitials: 'LO',
    bannerImage: '/banners/last-origin-r.webp',
    profileImage: '/profiles/last-origin-r.webp',
  },
  {
    id: 'miresi-invisible-future',
    name: 'MIRESI: Invisible Future',
    genre: 'Tactical RPG',
    regions: ['Global'],
    status: 'Announced',
    description:
      'MIRESI: Invisible Future is a subculture-themed collectible RPG developed by CONTROL9 and published by Smilegate. It is a time-travel RPG where players save the future by navigating themes of time, causality, and fate. The game features anime-style art, collectible characters, and tactical combat combining real-time elements with skill-based positioning.',
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#120e1a',
    iconInitials: 'MI',
    bannerImage: '/banners/miresi-invisible-future.jpeg',
    profileImage: '/profiles/miresi-invisible-future.jpg',
  },
  {
    id: 'monster-hunter-outlanders',
    name: 'Monster Hunter Outlanders',
    genre: 'Open-World Survival RPG',
    regions: ['Global'],
    status: 'Announced',
    description:
      'Mobile spin-off in the Monster Hunter universe focusing on open-world survival-style hunting. Announced with TiMi Studio Group (Tencent) collaborating with Capcom. No release date or app store pages yet.',
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#14100a',
    iconInitials: 'MH',
    bannerImage: '/banners/monster-hunter-outlanders.jpg',
    profileImage: '/profiles/monster-hunter-outlanders.webp',
  },
  {
    id: 'petit-planet',
    name: 'Petit Planet',
    genre: 'Life Simulation',
    regions: ['Global'],
    status: 'Announced',
    description:
      'Petit Planet is a cosmic life simulation game that invites players on a journey fueled by idyllic yet adventurous lifestyles, unique neighbors, and surprising wonders. Players nurture a planet of their own and gradually form a galaxy by connecting with different planets. Features farming, fishing, beachcombing, mining, cooking, crafting, and building relationships with fuzzy Neighbors.',
    platforms: ['iOS', 'Android', 'PC', 'Switch'],
    engine: 'Unity',
    bannerColor: '#0a0e1a',
    iconInitials: 'PP',
    bannerImage: '/banners/petit-planet.jpg',
    profileImage: '/profiles/petit-planet.jpg',
  },
  {
    id: 'project-2-3',
    name: 'Project 2/3',
    genre: 'Open-World RPG',
    regions: ['Global', 'JP'],
    status: 'Announced',
    description:
      'Project 2/3 is an upcoming anime-style, open-world ARPG independently developed by Diversity Game Studio. You will travel across time and space, transitioning between 2D and 3D worlds, embarking on an adventure to rewrite the past. Along the way, you will meet diverse companions, journey through different eras and distinct dimensions.',
    platforms: ['iOS', 'Android', 'PC'],
    engine: 'N/A',
    bannerColor: '#0e1418',
    iconInitials: 'P2',
    bannerImage: '/banners/project-2-3.jpg',
    profileImage: '/profiles/project-2-3.jpg',
  },
  {
    id: 'rewinding-cadence',
    name: 'Rewinding Cadence',
    genre: 'Open-World RPG',
    regions: ['Global', 'CN'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'Rewinding Cadence is an open-world action RPG that features a time-loop at the core of its gameplay and narrative. Players are tasked to overturn the prophecy of the Sunblight Tide within a 42-day window. The game features hand-drawn anime-style 2D graphics, spirit companions, gliding mechanics, and a D20 dice roll system for narrative choices.',
    platforms: ['iOS', 'Android', 'PC'],
    engine: 'N/A',
    bannerColor: '#14100e',
    iconInitials: 'RC',
    bannerImage: '/banners/rewinding-cadence.png',
    profileImage: '/profiles/rewinding-cadence.jpg',
  },
  {
    id: 'scarlet-tide-zeroera',
    name: 'Scarlet Tide: ZeroERA',
    genre: 'Open-World RPG',
    regions: ['Global', 'CN'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Scarlet Tide: ZeroERA is an upcoming open-world RPG and a spin-off of the 'Art of War: Red Tides' IP. Set in a post-apocalyptic world where past environmental destruction triggered the 'Scarlet Tide,' which altered human genetics. Players explore this visually striking anime-inspired world.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#1a0c0c',
    iconInitials: 'ST',
    bannerImage: '/banners/scarlet-tide-zeroera.jpg',
    profileImage: '/profiles/scarlet-tide-zeroera.jpg',
  },
  {
    id: 'silver-palace',
    name: 'Silver Palace',
    genre: 'Open-World Action RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Silver Palace is a fantasy adventure action RPG built with Unreal Engine 5, set in the prosperous, Victorian-themed metropolis of Silvernia. Players assume the role of a 'Detective' who returns to the city after a three-year absence to investigate crimes and uncover the truth behind a loved one's death.",
    platforms: ['PC', 'Android', 'iOS'],
    engine: 'Unreal Engine 5',
    bannerColor: '#141210',
    iconInitials: 'SP',
    bannerImage: '/banners/silver-palace.jpg',
    profileImage: '/profiles/silver-palace.jpg',
  },
  {
    id: 'terbis',
    name: 'Terbis',
    genre: '2D Anime RTS',
    regions: ['Global', 'KR'],
    status: 'Announced',
    description:
      'A 2D anime-style RPG with side-scrolling real-time strategy (RTS) mechanics. The game is set in a decaying world and promises a rich narrative with high-quality animations. A teaser and opening PV have been released, with a full release expected to follow.',
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#0e1410',
    iconInitials: 'TB',
    bannerImage: '/banners/terbis.jpg',
    profileImage: '/profiles/terbis.jpg',
  },
];

export const statusColors: Record<GameStatus, string> = {
  Released: 'var(--ongoing-dot-color)',
  'Pre-registration': 'var(--not-yet-aired-indicator-color)',
  'In Development': 'var(--completed-indicator-color)',
  Announced: 'var(--default-indicator-color)',
};

export const STATUS_LABELS: Record<GameStatus, string> = {
  Released: 'RELEASED',
  'Pre-registration': 'PRE-REGISTRATION',
  'In Development': 'IN DEVELOPMENT',
  Announced: 'ANNOUNCED',
};

export const REGION_COLORS: Record<Region, string> = {
  Global: '#4a9eff',
  JP: '#ff6b6b',
  CN: '#ff6b6b',
  KR: '#4ecdc4',
  NA: '#74b9ff',
  EU: '#74b9ff',
  SEA: '#55efc4',
};

export const PLATFORM_ICONS: Record<Platform, string> = {
  Android: '⬥',
  iOS: '',
  PC: '⊡',
  PS5: '⬡',
  Switch: '◈',
};
