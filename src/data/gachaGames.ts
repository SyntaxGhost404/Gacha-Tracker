export type Platform = 'Android' | 'iOS' | 'PC' | 'PS5' | 'Switch';
export type Region = 'Global' | 'JP' | 'CN' | 'KR' | 'NA' | 'EU' | 'SEA';
export type GameStatus = 'Released' | 'Pre-registration' | 'In Development' | 'Announced';
export type DevStatus = 'Technical Test' | 'Closed Beta' | 'Open Beta';

export interface PreRegistrationLink {
  label: string;
  url?: string;
  iconType: 'globe' | 'bootstrap';
  iconClass?: string;
  disabled?: boolean;
}

export interface SocialLinks {
  website?: string;
  twitter?: string;
  youtube?: string;
  reddit?: string;
  discord?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

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
  preRegistrationLinks?: PreRegistrationLink[];
  socialLinks?: SocialLinks;
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
      'ALLfiring, formerly known as Ring of Fire: Prometheus, delivers a visually striking side-scrolling action RPG experience set on a crumbling post-apocalyptic canvas. Players explore voxel sandbox environments, master real-time three-character combat formations, and confront anomalous threats to carry the flame of human hope. The game features stylized anime rendering paired with deep mechanical personalization.',
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#1a1208',
    iconInitials: 'AF',
    bannerImage: '/banners/allfiring.png',
    profileImage: '/profiles/allfiring.png',
    socialLinks: {
      website: 'https://allfiring.genmugame.com/',
      twitter: 'https://x.com/ALLfiring2026',
      discord: 'https://discord.gg/Bps5JRkSgQ',
      facebook: 'https://www.facebook.com/profile.php?id=61585042701755'
    }
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
      'hololive Dreams is the first-party rhythm RPG developed by Cover Corporation and QualiArts. Launching tentatively in August 2026, it features over fifty active hololive VTubers as collectible characters and more than 150 songs at launch. Players build intricate skill trees, collect high-tier support cards, and acquire premium cosmetic outfits, all driven by intense, immersive parasocial fan devotion.',
    platforms: ['iOS', 'Android'],
    engine: 'N/A',
    bannerColor: '#121a10',
    iconInitials: 'HD',
    bannerImage: '/banners/hololive-dreams.jpg',
    profileImage: '/profiles/hololive-dreams.webp',
    preRegistrationLinks: [
      {
        label: 'Official Website',
        url: 'https://hololive-dreams.com/en',
        iconType: 'globe'
      },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=game.qualiarts.hololive.dreams.com',
        iconType: 'bootstrap',
        iconClass: 'bi bi-google-play'
      },
      {
        label: 'App Store',
        url: 'https://apps.apple.com/us/app/hololive-dreams/id6756641249',
        iconType: 'bootstrap',
        iconClass: 'bi bi-apple'
      }
    ],
    socialLinks: {
      website: 'https://hololive-dreams.com/en',
      twitter: 'https://x.com/holo_dreams_en',
      youtube: 'https://youtube.com/@hololivedreams?si=ly6hmx5h6buj6jZR'
    }
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
      "Set in the procedurally generated city of Nova Inception Urbs, Ananta casts players as an elite supernatural investigator called the Infinite Trigger. Players master a unique zero-stamina traversal system featuring rooftops parkour and grappling to battle the anomalous force of Chaos. NetEase's ambitious RPG departs from traditional gacha by unlocking all characters through main gameplay progression.",
    platforms: ['Android', 'iOS', 'PC', 'PS5'],
    engine: 'Unity',
    bannerColor: '#0e1520',
    iconInitials: 'AN',
    bannerImage: '/banners/ananta.png',
    profileImage: '/profiles/ananta.png',
    socialLinks: {
      website: 'https://www.anantagame.com/en/m/',
      twitter: 'https://x.com/Ananta_EN',
      youtube: 'https://www.youtube.com/@Ananta_Game',
      reddit: 'https://www.reddit.com/r/AnantaOfficial/',
      discord: 'https://discord.gg/ananta',
      instagram: 'https://www.instagram.com/ananta.global/',
      tiktok: 'https://www.tiktok.com/@ananta_en',
      facebook: 'https://www.facebook.com/ananta.en/'
    }
  },
  {
    id: 'azur-promilia',
    name: 'Azur Promilia',
    genre: 'Open-World RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Azur Promilia is a stunning, fantasy open-world RPG developed by Manjuu Co. that blends action combat with creature taming. Players traverse lush, vibrant ecosystems, capturing and training magical beasts known as Kipipis to aid them in battle and exploration. Leveraging deep character attachment and interactive mechanics, the game offers a rich, comforting live-service adventure.",
    platforms: ['PC', 'PS5', 'Android', 'iOS'],
    engine: 'Unity',
    bannerColor: '#0a1520',
    iconInitials: 'AP',
    bannerImage: '/banners/azur-promilia.jpeg',
    profileImage: '/profiles/azur-promilia.jpg',
    socialLinks: {
      website: 'https://azurpromilia.com/en/',
      twitter: 'https://x.com/AzurPromilia',
      youtube: 'https://www.youtube.com/@azurpromilia'
    }
  },
  {
    id: 'chasing-kaleidorider',
    name: 'Chasing Kaleidorider',
    genre: '3D Romance RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Chasing Kaleidorider is a futuristic 3D romance RPG set in the vibrant neon metropolis of Terminus. As a Navigator, players guide super-powered girls who ride high-tech motorcycles, combatting malevolent Hysteria entities threatening society. The card-driven tactical battle system integrates customizable bikes directly into skill animations, offering a thrilling fusion of mecha and racing.",
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#18101a',
    iconInitials: 'CK',
    bannerImage: '/banners/chasing-kaleidorider.jpeg',
    profileImage: '/profiles/chasing-kaleidorider.jpg',
    socialLinks: {
      website: 'https://kaleidorider.com/',
      twitter: 'https://x.com/KaleidoRIDER_EN',
      youtube: 'https://www.youtube.com/@ChasingKaleidorider'
    }
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
      "Codename: Bang Bang is a dark, mature otome RPG set in a fictional mafia-ruled kingdom. Stepping into the shoes of the ruthless female First Duke of Milan, players orchestrate strategy and revenge to rebuild a collapsed family empire. Seduce, manipulate, and coordinate deep power plays with a customizable host of male targets, breaking away from traditional lighthearted dating simulations.",
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#1a0e0e',
    iconInitials: 'BB',
    bannerImage: '/banners/codename-bang-bang.jpeg',
    profileImage: '/profiles/codename-bang-bang.png',
    socialLinks: {
      website: 'https://peng.happymaker.com.cn/'
    }
  },
  {
    id: 'digimon-alysion',
    name: 'DIGIMON ALYSION',
    genre: 'Trading Card Game',
    regions: ['Global', 'JP'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "DIGIMON ALYSION brings the physical Digimon Trading Card Game to mobile devices in a highly polished digital environment. Set within the futuristic metaverse of LACUNA and tying into the Digimon Liberator web comic narrative, players collect cards, challenge rival duelists, and explore digital zones. Featuring a theme song by VTuber Enna Alouette, it bridges vintage charm with modern action.",
    platforms: ['iOS', 'Android'],
    engine: 'N/A',
    bannerColor: '#0e1020',
    iconInitials: 'DA',
    bannerImage: '/banners/digimon-alysion.jpg',
    profileImage: '/profiles/digimon-alysion.jpg',
    socialLinks: {
      website: 'https://www.digimon-alysion.com/en/',
      twitter: 'https://x.com/DIGIMON_ALYSION',
      instagram: 'https://www.instagram.com/digimon_alysion',
      facebook: 'https://www.facebook.com/profile.php?id=61573960307458'
    }
  },
  {
    id: 'ete-shattered-skie',
    name: 'E.T.E: Shattered Skie',
    genre: '3D Action RPG',
    regions: ['Global', 'SEA'],
    status: 'Pre-registration',
    description:
      "E.T.E: Shattered Skie is an immersive 3D mecha action RPG set in a dark post-apocalyptic future ruled by powerful corporate chaebols. As an executive Nexecutor commanding custom tactical E.T.E exoskeletons, players deploy elite Syncer pilots across dynamic land, sea, and aerial battlefields. Powered by Unity, the game blends intense tri-environmental combat with deep, personalized simulator dormitory life.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'Unity',
    bannerColor: '#10141a',
    iconInitials: 'ET',
    bannerImage: '/banners/ete-shattered-skie.webp',
    profileImage: '/profiles/ete-shattered-skie.webp',
    preRegistrationLinks: [
      {
        label: 'Official Website',
        iconType: 'globe',
        disabled: true
      },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.kr.chens.ete2024',
        iconType: 'bootstrap',
        iconClass: 'bi bi-google-play'
      },
      {
        label: 'App Store',
        iconType: 'bootstrap',
        iconClass: 'bi bi-apple',
        disabled: true
      }
    ]
  },
  {
    id: 'honkai-nexus-anima',
    name: 'Honkai: Nexus Anima',
    genre: 'RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Honkai: Nexus Anima is HoYoverse's bold foray into the creature-collection genre. Operating within the expansive Honkai universe, the game lets players bond with Animas—mystical spirits embodying paired dualities like Light and Darkness. Players customize their heroes and venture through a fractured, beautiful world to repair the severed bonds of Nexus in deep, real-time tactical combat.",
    platforms: ['PC', 'iOS', 'Android'],
    engine: 'N/A',
    bannerColor: '#0c1020',
    iconInitials: 'HN',
    bannerImage: '/banners/honkai-nexus-anima.jpg',
    profileImage: '/profiles/honkai-nexus-anima.jpg',
    socialLinks: {
      website: 'https://hna.hoyoverse.com/',
      twitter: 'https://x.com/HonkaiNA',
      youtube: 'https://www.youtube.com/@HonkaiNA',
      discord: 'https://discord.com/invite/honkainexusanima',
      instagram: 'https://www.instagram.com/honkaina/',
      tiktok: 'https://www.tiktok.com/@honkaina_en',
      facebook: 'https://www.facebook.com/HonkaiNA/'
    }
  },
  {
    id: 'illusion-connect-re',
    name: 'Illusion Connect: Re',
    genre: 'RPG Strategy',
    regions: ['Global', 'SEA', 'NA'],
    status: 'Pre-registration',
    devStatus: 'Closed Beta',
    description:
      "Illusion Connect: Re resurrects the classic anime strategy RPG experience on mobile platforms. Spearheaded by Sugargame, players command high-fidelity Radiants in real-time tactical grid battles against malevolent Nightmares. It brings back popular Live2D interactions, custom base decorative elements, and the beloved original voice cast featuring Ai Kayano, Yui Ishikawa, and Saori Hayami.",
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#1a1015',
    iconInitials: 'IC',
    bannerImage: '/banners/illusion-connect-re.jpg',
    profileImage: '/profiles/illusion-connect-re.webp',
    preRegistrationLinks: [
      {
        label: 'Official Website',
        url: 'https://www.illusionconnectgame.com',
        iconType: 'globe'
      },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store',
        iconType: 'bootstrap',
        iconClass: 'bi bi-google-play'
      },
      {
        label: 'App Store',
        url: 'https://apps.apple.com',
        iconType: 'bootstrap',
        iconClass: 'bi bi-apple'
      }
    ],
    socialLinks: {
      website: 'https://www.sugargame.hk/',
      discord: 'https://discord.gg/hXfJJcKGu2',
      facebook: 'https://www.facebook.com/IllusionConnectRe'
    }
  },
  {
    id: 'kings-raid-revival',
    name: "King's Raid (Revival)",
    genre: 'RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "King's Raid (Revival) brings back the legendary real-time 3D mobile battle RPG under new publisher Masangsoft. Renowned for its friendly, gacha-free direct character acquisition framework, this corporate resurrection expands cooperative gameplay. Players challenge giant bosses in reworked, modern raids, optimizing hero lineups across fully synchronized PC and mobile cross-play avenues.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'Unity',
    bannerColor: '#1a1208',
    iconInitials: 'KR',
    bannerImage: '/banners/kings-raid-revival.jpg',
    profileImage: '/profiles/kings-raid-revival.jpg',
    socialLinks: {
      website: 'https://kr.masanggames.com/',
      twitter: 'https://x.com/kingsraid_msg',
      discord: 'https://discord.gg/TyvYcF4gjn',
      facebook: 'https://www.facebook.com/Kingsraid.EN'
    }
  },
  {
    id: 'last-origin-r-plus',
    name: 'LAST ORIGIN R+',
    genre: 'Turn-Based RPG',
    regions: ['Global', 'NA', 'EU', 'SEA'],
    status: 'Released',
    releaseDate: '2026-05-21',
    releaseDateConfirmed: true,
    description:
      "LAST ORIGIN R+ presents a highly strategic, turn-based squad RPG set in a bleak apocalyptic future. After parasitizing mechanical insects eradicate human existence, players become the final commander of a bioengineered female task force known as Bioroids. Optimize tactical grid formations, activate powerful skills, and build specialized squads to reclaim Earth in deep apocalyptic combat.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#0e1818',
    iconInitials: 'LO',
    bannerImage: '/banners/last-origin-r.webp',
    profileImage: '/profiles/last-origin-r.webp',
    socialLinks: {
      twitter: 'https://x.com/lastorigin_info'
    }
  },
  {
    id: 'miresi-invisible-future',
    name: 'MIRESI: Invisible Future',
    genre: 'Tactical RPG',
    regions: ['Global'],
    status: 'Announced',
    description:
      "MIRESI: Invisible Future is a captivating time-travel tactical RPG published by Smilegate. To save a collapsing future, players navigate changing eras to restore causality. Boasting character designs by famed artist Hyung-seop Kim (Nikke), it merges beautiful subculture aesthetics with real-time strategic combat that demands strict, positional skill planning for absolute battlefield control.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#120e1a',
    iconInitials: 'MI',
    bannerImage: '/banners/miresi-invisible-future.jpeg',
    profileImage: '/profiles/miresi-invisible-future.jpg',
    socialLinks: {
      website: 'https://miresi.onstove.com/en',
      twitter: 'https://x.com/Miresi_en',
      youtube: 'https://www.youtube.com/@Miresi_EN',
      reddit: 'https://www.reddit.com/r/Miresi'
    }
  },
  {
    id: 'monster-hunter-outlanders',
    name: 'Monster Hunter Outlanders',
    genre: 'Open-World Survival RPG',
    regions: ['Global'],
    status: 'Announced',
    description:
      "Monster Hunter Outlanders is an open-world survival RPG co-developed by Tencent's TiMi Studio and Capcom. Set on the uncharted continent of AESOLAND, players hunt massive Radiant beasts—monsters frenzied by aggressive native minerals. Players gather materials, craft survival facilities, and utilize iconic weapons like the Lance in fluid, beautifully optimized mobile action environments.",
    platforms: ['Android', 'iOS'],
    engine: 'N/A',
    bannerColor: '#14100a',
    iconInitials: 'MH',
    bannerImage: '/banners/monster-hunter-outlanders.jpg',
    profileImage: '/profiles/monster-hunter-outlanders.webp',
    socialLinks: {
      website: 'https://monsterhunteroutlanders.com/',
      twitter: 'https://x.com/MHO_English',
      youtube: 'https://www.youtube.com/@MHO_English',
      facebook: 'https://www.facebook.com/MHO.English'
    }
  },
  {
    id: 'petit-planet',
    name: 'Petit Planet',
    genre: 'Life Simulation',
    regions: ['Global'],
    status: 'Announced',
    description:
      "Petit Planet is HoYoverse's comforting cosmic lifestyle simulation. Playing as a dedicated Loomi Co. employee, players cultivate a cozy, customizable planetoid alongside charming animal neighbors. The peaceful loop involves farming, cooking, fishing, and beachcombing sync'd to a real-world clock, encouraging authentic daily habits rather than intense, stressful character combat grinding.",
    platforms: ['iOS', 'Android', 'PC', 'Switch'],
    engine: 'Unity',
    bannerColor: '#0a0e1a',
    iconInitials: 'PP',
    bannerImage: '/banners/petit-planet.jpg',
    profileImage: '/profiles/petit-planet.jpg',
    socialLinks: {
      website: 'https://planet.hoyoverse.com/en-us/home',
      twitter: 'https://x.com/PetitPlanetGame',
      youtube: 'https://www.youtube.com/@PetitPlanetGame',
      discord: 'https://discord.com/invite/petitplanetofficial',
      instagram: 'https://instagram.com/petitplanetgame'
    }
  },
  {
    id: 'project-2-3',
    name: 'Project 2/3',
    genre: 'Open-World RPG',
    regions: ['Global', 'JP'],
    status: 'Announced',
    description:
      "Project 2/3 is a striking open-world ARPG independently crafted by Diversity Game Studio. Guided by a companion named Theseus, players travel across diverse historical eras and dimensions. The visual highlight features seamless transitions between 2D and 3D perspective shifts, requiring smart tactical planning and reality manipulation to rewrite dark, catastrophic events across timelines.",
    platforms: ['iOS', 'Android', 'PC'],
    engine: 'N/A',
    bannerColor: '#0e1418',
    iconInitials: 'P2',
    bannerImage: '/banners/project-2-3.jpg',
    profileImage: '/profiles/project-2-3.jpg',
    socialLinks: {
      twitter: 'https://x.com/Project2slash3'
    }
  },
  {
    id: 'rewinding-cadence',
    name: 'Rewinding Cadence',
    genre: 'Open-World RPG',
    regions: ['Global', 'CN'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Rewinding Cadence is a gorgeous open-world action RPG developed by Saroasis Studios. As the Recursor, players navigate a strict, repeating 42-day time-loop to avert the catastrophic Sunblight Tide alongside their spirit companion Ori. Utilizing Unity for outstanding visual rendering, the game features a tabletop-inspired D20 dice system to influence branching narrative choices and tragedies.",
    platforms: ['iOS', 'Android', 'PC'],
    engine: 'Unity',
    bannerColor: '#14100e',
    iconInitials: 'RC',
    bannerImage: '/banners/rewinding-cadence.png',
    profileImage: '/profiles/rewinding-cadence.jpg',
    socialLinks: {
      website: 'https://gh.sarosgame.com/',
      twitter: 'https://x.com/RewindCadence',
      youtube: 'https://www.youtube.com/@SaroasisStudios'
    }
  },
  {
    id: 'scarlet-tide-zeroera',
    name: 'Scarlet Tide: ZeroERA',
    genre: 'Open-World RPG',
    regions: ['Global', 'CN'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Scarlet Tide: ZeroERA is a 2.5D open-world RPG developed by YoMioBeYoung in the Art of War: Red Tides universe. Set in a ruined world where the mystical Scarlet Tide has permanently arrested human aging, it features an aesthetic character roster. Players command real-time tactical combat battles, manage responsive base-building environments, and construct deep social bonds via dynamic dialogue.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#1a0c0c',
    iconInitials: 'ST',
    bannerImage: '/banners/scarlet-tide-zeroera.jpg',
    profileImage: '/profiles/scarlet-tide-zeroera.jpg',
    socialLinks: {
      twitter: 'https://x.com/ccZeroERA',
      youtube: 'https://www.youtube.com/@%E8%B5%A4%E6%BD%AEZeroERA',
      reddit: 'https://www.reddit.com/r/ZeroERA/'
    }
  },
  {
    id: 'silver-palace',
    name: 'Silver Palace',
    genre: 'Open-World Action RPG',
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      "Silver Palace is a detective-themed action RPG developed by Elementa and powered by Unreal Engine 5. In the industrialized Victorian metropolis of Silvernia, players act as an elite investigator tracking criminal clues under corporate shadows. The gameplay loop combines narrative investigations with high-octane action, employing QTE combat combos and seamless real-time character swapping.",
    platforms: ['PC', 'Android', 'iOS'],
    engine: 'Unreal Engine 5',
    bannerColor: '#141210',
    iconInitials: 'SP',
    bannerImage: '/banners/silver-palace.jpg',
    profileImage: '/profiles/silver-palace.jpg',
    socialLinks: {
      website: 'https://silverpalace.elementagames.com/en-us/',
      twitter: 'https://x.com/SilverPalace_EN',
      youtube: 'https://www.youtube.com/@SilverPalace-Official',
      facebook: 'https://www.facebook.com/SilverPalaceOfficial'
    }
  },
  {
    id: 'terbis',
    name: 'Terbis',
    genre: '2D Anime RTS',
    regions: ['Global', 'KR'],
    status: 'Announced',
    description:
      "Terbis is a side-scrolling, semi-automatic 2D anime real-time strategy game developed by Webzen. Transporting players to a magical isekai environment facing absolute degradation, characters execute auto-attacks whilst players manage skill trigger timings. Boasting cinematic anime promotions, it offers high-quality action cutscenes juxtaposed with tactical team-synergy optimization.",
    platforms: ['Android', 'iOS', 'PC'],
    engine: 'N/A',
    bannerColor: '#0e1410',
    iconInitials: 'TB',
    bannerImage: '/banners/terbis.jpg',
    profileImage: '/profiles/terbis.jpg',
    socialLinks: {
      website: 'https://terbis.webzen.com/',
      twitter: 'https://x.com/Terbis_kr'
    }
  }
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

