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

export interface MediaSlide {
  type: 'video' | 'image';
  url: string;
}

export interface GachaGame {
  id: string;
  name: string;
  alternativeName?: string;
  genre: string[];
  regions: Region[];
  status: GameStatus;
  devStatus?: DevStatus;
  releaseDate?: string;
  releaseDateConfirmed?: boolean;
  releaseDateTime?: string;
  description: string;
  platforms: Platform[];
  engine?: string;
  bannerColor: string;
  iconInitials?: string;
  bannerImage?: string;
  profileImage?: string;
  preRegistrationLinks?: PreRegistrationLink[];
  socialLinks?: SocialLinks;
  media?: MediaSlide[];
}

export const gachaGames: GachaGame[] = [
  {
    id: 'allfiring',
    name: 'ALLfiring',
    alternativeName: 'Ring of Fire: Prometheus',
    genre: ['Anime-Style', 'Action', 'RPG'],
    regions: ['Global'],
    status: 'Released',
    releaseDate: '2026-05-14',
    releaseDateConfirmed: false,
    description:
      'ALLfiring is a side-scrolling action RPG with an anime-style aesthetic set in a dark, post-apocalyptic world. The player is the last keeper of a fading flame in a shattered realm, exploring voxel-styled landscapes from frozen wilderness to ancient forests to uncover secrets. Gameplay involves real-time combat with up to three characters; players switch between allies, combining skills to defeat foes. Each companion has unique abilities and backstories, and players traverse interconnected environments, solve environmental puzzles, and unearth hidden paths as they fight to restore hope to humanity.',
    platforms: ['Android', 'iOS', 'PC'],
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
    genre: ['Rhythm Game', 'RPG', 'Gacha'],
    regions: ['Global'],
    status: 'Released',
    releaseDate: '2026-07-23',
    releaseDateConfirmed: true,
    description:
      'hololive Dreams is a rhythm-action mobile RPG starring VTubers from the hololive group. Set on a developing theme park, players tap along to official songs and mini-games to gather resources and unlock more characters. The game features 50+ hololive talents as playable characters and includes over 150 licensed tracks at launch. Between rhythm sessions, players complete quests and mini-games to expand their theme park and recruit additional idols. It blends beat-matching rhythm gameplay with character collection and park-building elements.',
    platforms: ['iOS', 'Android'],
    engine: 'Unity',
    bannerColor: '#121a10',
    iconInitials: 'HD',
    bannerImage: '/banners/hololive-dreams.jpg',
    profileImage: '/profiles/hololive-dreams.webp',
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
    genre: ['Urban', 'Open-World', 'RPG'],
    regions: ['Global'],
    status: 'Pre-registration',
    description:
      'ANANTA is a free-to-play open-world action RPG set in a sprawling city called Nova Inception Urbs. The player is an "Infinite Trigger," a psychic investigator fighting an aberrant force known as Chaos. Traversal is fast-paced and stamina-free, letting characters run, climb, parkour, ride bikes or grapple between skyscrapers. Combat is team-based: during key battles, the player can switch among a party of four characters, each with unique stats and skills. All playable characters unlock through gameplay rather than random draws. The game focuses on exploration and cooperative combat against supernatural anomalies.',
    platforms: ['Android', 'iOS', 'PC', 'PS5'],
    engine: 'Unity',
    bannerColor: '#0e1520',
    iconInitials: 'AN',
    bannerImage: '/banners/ananta.png',
    profileImage: '/profiles/ananta.png',
    socialLinks: {
      website: 'https://www.anantagame.com/',
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
    genre: ['Fantasy', 'Open-World', 'Creature Companion', 'Gacha'],
    regions: ['Global'],
    status: 'Pre-registration',
    devStatus: 'Closed Beta',
    description:
      'Azur Promilia is a fantasy open-world action RPG set in a vibrant world of lush forests, caves, and towns. A core mechanic is creature companionship: players befriend and tame magical beasts called Kipipis, each with unique abilities that aid in combat and exploration. Combat is real-time and allows switching between different playable characters, each with distinct skills and elemental affinities for combo-based battles. Developed by the creators of Azur Lane, the game blends exploration and strategy with creature-collection mechanics in a rich, story-driven world.',
    platforms: ['PC', 'PS5', 'Android', 'iOS'],
    engine: 'Unity',
    bannerColor: '#0a1520',
    iconInitials: 'AP',
    bannerImage: '/banners/azur-promilia.jpeg',
    profileImage: '/profiles/azur-promilia.jpg',
    socialLinks: {
      website: 'https://azurpromilia.jimi-global.com/',
      twitter: 'https://x.com/AzurPromilia',
      youtube: 'https://www.youtube.com/@azurpromilia'
    }
  },
  {
    id: 'chasing-kaleidorider',
    name: 'Chasing Kaleidorider',
    genre: ['3D', 'Romance', 'RPG', 'RIDER Girls'],
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'Chasing Kaleidorider is a futuristic 3D romance RPG set in the neon-lit city of Terminus. The player is the "Navigator" who guides a team of super-powered Rider girls who travel on high-tech motorcycles. Together, they fight against mysterious entities known as Hysteria. Battles use a semi-real-time card-based combat system: players play cards to trigger each Rider\'s skills and bike-enhanced combo attacks. The game blends anime-style action with tactical card mechanics and relationship-building.',
    platforms: ['Android', 'iOS'],
    bannerColor: '#18101a',
    iconInitials: 'CK',
    bannerImage: '/banners/chasing-kaleidorider.jpeg',
    profileImage: '/profiles/chasing-kaleidorider.jpg',
    socialLinks: {
      website: 'https://kaleidorider.com/',
      twitter: 'https://x.com/KaleidoRIDER_EN',
      youtube: 'https://www.youtube.com/@KaleidoRIDER_EN',
      facebook: 'https://www.facebook.com/KaleidoRIDER'
    }
  },
  {
    id: 'codename-bang-bang',
    name: '夜幕之下',
    alternativeName: 'Codename: Bang Bang / 代号砰砰',
    genre: ['Otome', 'RPG', 'Mafia'],
    regions: ['CN'],
    status: 'Released',
    releaseDate: '2026-06-05',
    releaseDateConfirmed: true,
    description:
      'Codename: Bang Bang is a dark strategy RPG set in a fictional, mafia-ruled kingdom. The player becomes the newly crowned female Boss (First Duke) of Milan\'s underworld. In side-scrolling battles, a four-member squad automatically advances along city streets; the player taps skills at precise moments to break the enemies\' formation. Each party member has distinct strengths and roles, making team composition and timing crucial to victory. The game\'s story centers on power struggles and revenge among crime families, blending strategy with mature narrative.',
    platforms: ['Android', 'iOS', 'PC'],
    bannerColor: '#1a0e0e',
    iconInitials: 'YM',
    bannerImage: '/banners/codename-bang-bang.jpeg',
    profileImage: '/profiles/codename-bang-bang.png',
    socialLinks: {
      website: 'https://peng.happymaker.com.cn/'
    }
  },
  {
    id: 'digimon-alysion',
    name: 'DIGIMON ALYSION',
    genre: ['Online Card Game', 'Digital TCG'],
    regions: ['Global', 'JP'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'DIGIMON ALYSION is a mobile card game that digitizes the Digimon Trading Card Game. Players collect cards, build decks, and duel opponents using turn-based card mechanics, including managing a shared "memory" resource. The game adds a single-player campaign set in a sci-fi metaverse called LACUNA: the player\'s avatar and partner Digimon enter virtual arenas to compete in tournaments. The digital version includes animated Digivolution sequences and new cards unique to the app, blending classic card-play with story-driven exploration of a futuristic digital world.',
    platforms: ['iOS', 'Android'],
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
    genre: ['Mecha', 'Girls Battle', 'RPG', 'Action'],
    regions: ['Global', 'SEA'],
    status: 'Released',
    description:
      'E.T.E: Shattered Skie is a post-apocalyptic mecha RPG set in a world torn by corporate warfare. A powerful corporation discovered an alien "Delta" particle and built advanced tactical exoskeleton suits (E.T.E. suits), sparking conflict with rival chaebols. As a Nexecutor, the player leads a team of elite pilots (called Syncers) each operating a customizable E.T.E. mech in 3D combat. Players fight through waves of mechanized enemies in dynamic battles, timing special attacks and abilities across land, sea, and air. Outside combat, players can also customize a shared dormitory space for their pilot team.',
    platforms: ['Android', 'PC'],
    bannerColor: '#10141a',
    iconInitials: 'ET',
    bannerImage: '/banners/ete-shattered-skie.webp',
    profileImage: '/profiles/ete-shattered-skie.webp',
    socialLinks: {
      website: 'https://play.google.com/store/apps/details?id=com.kr.chens.ete2024',
      twitter: 'https://x.com/ETE_Shattered',
      youtube: 'https://www.youtube.com/@ETE_ShatteredSkie',
      facebook: 'https://www.facebook.com/ETEShatteredSkie',
      discord: 'https://discord.gg/ete'
    },
    media: [
      { type: 'video', url: 'https://www.youtube.com/embed/7st_YosUwh8' },
      { type: 'image', url: '/assets/ete-shattered-skie/1.webp' },
      { type: 'image', url: '/assets/ete-shattered-skie/2.webp' },
      { type: 'image', url: '/assets/ete-shattered-skie/3.webp' },
      { type: 'image', url: '/assets/ete-shattered-skie/4.webp' },
      { type: 'image', url: '/assets/ete-shattered-skie/5.webp' }
    ]
  },
  {
    id: 'honkai-nexus-anima',
    name: 'Honkai: Nexus Anima',
    genre: ['Creature-collector', 'Adventure Strategy', 'Auto battler'],
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Technical Test',
    description:
      'Honkai: Nexus Anima is a creature-collection strategy RPG set in the Honkai universe. A cosmic event called the Rupture has shattered the world\'s "Nexus," creating mystical spirits called Animas that embody dualities like Light and Darkness. Players travel across fragmented realms to collect and bond with these Anima companions. Combat is grid-based and tactical (similar to auto-chess): players place Anima on a battlefield and leverage their unique abilities and synergies in battles. The game blends open-world exploration, puzzle-solving, and character customization with real-time tactical battles to restore balance to the Nexus.',
    platforms: ['PC', 'iOS', 'Android'],
    engine: 'Unity',
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
    genre: ['Tactical', 'Strategy', 'RPG', 'Anime'],
    regions: ['Global', 'SEA', 'NA'],
    status: 'Released',
    releaseDate: '2026-06-04',
    releaseDateConfirmed: true,
    description:
      'Illusion Connect: Re is a real-time tactical RPG where players command teams of anime-style heroines called Radiants against invading Nightmare creatures. Battles occur on a dynamic grid-based battlefield (live 2D animated) where positioning and skill timing matter. Outside of combat, players return to a "dream home" to customize a base and deepen bonds with each Radiant through interactive dialogue and activities. Strengthening these relationships grants additional abilities and powers in battle. The game revives features from the original, combining narrative interactions with strategic 3D combat.',
    platforms: ['Android', 'iOS', 'PC'],
    bannerColor: '#1a1015',
    iconInitials: 'IC',
    bannerImage: '/banners/illusion-connect-re.jpg',
    profileImage: '/profiles/illusion-connect-re.webp',
    preRegistrationLinks: [
      {
        label: 'Official Website',
        url: 'https://mjlj.sugargame.hk/',
        iconType: 'globe'
      },
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.sugargame.mjlj.gp',
        iconType: 'bootstrap',
        iconClass: 'bi bi-google-play'
      },
      {
        label: 'App Store',
        url: 'https://apps.apple.com/us/app/illusion-connect-re/id6758970424',
        iconType: 'bootstrap',
        iconClass: 'bi bi-apple'
      }
    ],
    socialLinks: {
      website: 'https://mjlj.sugargame.hk/',
      discord: 'https://discord.gg/hXfJJcKGu2',
      facebook: 'https://www.facebook.com/IllusionConnectRe'
    }
  },
  {
    id: 'kings-raid-revival',
    name: "King's Raid (Revival)",
    genre: ['Real-Time', 'Strategy', 'RPG'],
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'King\'s Raid (Revival) is a 3D fantasy action RPG offering real-time strategic battles. Players assemble a roster of heroes, each with unique skills, and combine them in party-based combat against monsters and raid bosses. The game features a fully explorable world and supports simultaneous play on PC and mobile. True to the series, characters are unlocked directly through gameplay and in-game currency rather than random draws, allowing players to recruit any hero of their choice. The design emphasizes cooperative raids and cross-platform PvP, blending action with deep RPG progression.',
    platforms: ['Android', 'iOS', 'PC'],
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
    genre: ['Tactical', 'Strategy', 'RPG', 'Apocalyptic'],
    regions: ['Global'],
    status: 'Released',
    releaseDate: '2026-05-21',
    releaseDateConfirmed: true,
    description:
      'LAST ORIGIN R+ is a squad-based strategy RPG set in a bleak post-apocalyptic future. The player commands a team of bioengineered female soldiers called Bioroids to fight mechanical insect-like monsters that have ravaged Earth. Battles are turn-based on a tactical grid: players position their units, activate powerful skills, and work in formation to defeat enemies and reclaim territory. The game\'s narrative follows humanity\'s last survivors battling for Earth\'s future through strategic squad combat.',
    platforms: ['Android', 'iOS', 'PC'],
    bannerColor: '#0e1818',
    iconInitials: 'LO',
    bannerImage: '/banners/last-origin-r.webp',
    profileImage: '/profiles/last-origin-r.webp',
    socialLinks: {
      website: 'https://lastorigin.vfun.com/',
      twitter: 'https://x.com/lastorigin_info'
    }
  },
  {
    id: 'miresi-invisible-future',
    name: 'MIRESI: Invisible Future',
    genre: ['Collectible', 'Time-Travel', 'RPG', 'Tactical'],
    regions: ['Global'],
    status: 'Pre-registration',
    description:
      'MIRESI: Invisible Future is a planned time-travel tactical RPG. Players will navigate changing eras to alter history and prevent a catastrophic future. Gameplay likely involves real-time squad tactics and positional skill use, as hinted by previews.',
    platforms: ['Android', 'iOS', 'PC'],
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
    genre: ['Open-World', 'Survival', 'Action', 'RPG'],
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'Monster Hunter Outlanders is an upcoming open-world survival RPG co-developed by TiMi (Tencent) and Capcom. Set on the wild continent of Aesoland, players hunt gigantic "Radiant" monsters mutated by aggressive minerals. They gather materials from defeated monsters and environments to craft weapons, armor, and facilities. The gameplay features fluid third-person action with iconic Monster Hunter weapons like the Lance, as players track and battle huge creatures. Crafting and survival elements (building camps, cooking, etc.) support exploration in beautiful, optimized mobile open environments.',
    platforms: ['Android', 'iOS'],
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
    genre: ['Cozy', 'Life Simulation', 'Cosmic-Lifestyle'],
    regions: ['Global'],
    status: 'Pre-registration',
    description:
      'Petit Planet is a cozy cosmic life-simulation game. Players cultivate their own tiny planetoid with help from charming animal-like Neighbors. Daily activities include planting and harvesting crops, fishing, beachcombing, cooking, crafting, and mining in a relaxing loop. As the planet grows, players befriend fuzzy companions: inviting them to live on the planet, holding conversations, exchanging gifts, and deepening relationships. Players can also travel to nearby islets on a vehicle with their Neighbors to discover rare creatures and recipes. The focus is on creativity, social bonds, and authentic day-to-day life rather than combat.',
    platforms: ['Android', 'iOS', 'PC'],
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
    genre: ['Open-World', 'Action', 'RPG', 'Dimensional'],
    regions: ['Global', 'JP'],
    status: 'Announced',
    description:
      'Project 2/3 is an anime-style open-world action RPG. Players journey through time and alternate dimensions alongside a guide named Theseus. The game transitions seamlessly between 2D and 3D perspectives as the player travels across diverse historical eras and parallel worlds. Along the way, they meet companions, explore varied environments, and work to rewrite chaotic events in the past. The game emphasizes smart tactical planning and reality manipulation to change history, with an art style blending comic-like panels and 3D exploration.',
    platforms: ['iOS', 'Android', 'PC'],
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
    genre: ['Open-World', 'Action', 'RPG', 'Time-Loop'],
    regions: ['Global', 'CN'],
    status: 'In Development',
    description:
      'Rewinding Cadence is an open-world action RPG built around a repeating time-loop. Players control the Recursor, who relives a strict 42-day cycle to avert a cataclysm, accompanied by their spirit guide Ori. The world is presented in stylized 2D art with real-time traversal (gliding, flying, hoverboarding). Battles involve leveling spirit companions and combining their powers. Notably, narrative decisions are resolved using a tabletop-style D20 dice-roll system, so story outcomes can change based on these randomized rolls. The game blends anime visuals with branching, time-loop storytelling.',
    platforms: ['Android', 'PC', 'PS5'],
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
    genre: ['2.5D', 'Open-World', 'RPG', 'Bio-sci-fi'],
    regions: ['Global', 'CN'],
    status: 'Pre-registration',
    description:
      'Scarlet Tide: ZeroERA is a 2.5D side-scrolling anime RPG with turn-based combat. It features richly illustrated environments and a strong narrative focus described as a "youth adventure". Players guide their characters through story-driven battles against enemies, moving along a horizontal plane. The game emphasizes cinematic storytelling and character interactions, with a setting in a ruined world of eternal youth (the Scarlet Tide) though detailed lore is still emerging.',
    platforms: ['Android', 'iOS', 'PC'],
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
    genre: ['Open-World', 'Action', 'RPG', 'Steampunk'],
    regions: ['Global'],
    status: 'Pre-registration',
    devStatus: 'Closed Beta',
    description:
      'Silver Palace is a detective-themed action RPG. It takes place in Silvernia, a richly drawn Victorian-industrial metropolis powered by a mysterious resource called Silverium. The player is an elite investigator solving cases in a steampunk cityscape. Gameplay alternates between investigation and real-time combat: the player explores the city, gathers leads, and then confronts foes in responsive action battles. This blends a dark, story-rich detective narrative with fast-paced 3D combat in a gaslamp-punk setting.',
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
    genre: ['2D', 'Anime-Style', 'Collectible RPG'],
    regions: ['Global', 'KR'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'Terbis is a 2D side-scrolling action RPG set in a magical "isekai" world. Characters automatically attack, and the player\'s role is to time and trigger each character\'s skill when needed. The game uses a semi-automatic battle system: players assemble a team of heroes and optimize their skill usage to defeat waves of enemies. It blends anime-style visuals with tactical team-synergy gameplay.',
    platforms: ['Android', 'iOS', 'PC'],
    bannerColor: '#0e1410',
    iconInitials: 'TB',
    bannerImage: '/banners/terbis.jpg',
    profileImage: '/profiles/terbis.jpg',
    socialLinks: {
      website: 'https://brand-terbis.webzen.com/',
      twitter: 'https://x.com/Terbis_kr'
    }
  },
  {
    id: 'limit-zero-breakers',
    name: 'Limit Zero Breakers',
    alternativeName: 'BREAKERS: Unlock the World',
    genre: ['Anime-Style', 'Action', 'RPG', 'Adventure'],
    regions: ['Global'],
    status: 'In Development',
    devStatus: 'Closed Beta',
    description:
      'Limit Zero Breakers (formerly BREAKERS: Unlock the World) is an anime-style real-time action RPG. Players explore the shattered floating islands of the world called Seraphia as a "Breaker" aboard the airship Weaverwhale. The game features party-based combat: players build a team of characters with different fighting styles and unleash stylish, combo-driven attacks on ancient dungeon bosses and massive monsters. There are also 3-player cooperative raids where friends team up to tackle colossal enemies. The narrative follows the Breakers\' quest to find the legendary Library of the Gods, fulfilling wishes among the ruins of a sky-floating civilization.',
    platforms: ['PC', 'Android', 'iOS'],
    bannerColor: '#0a192f',
    iconInitials: 'LZB',
    bannerImage: '/banners/limit-zero-breakers.webp',
    profileImage: '/profiles/limit-zero-breakers.png',
    socialLinks: {
      website: 'https://breakers.plaync.com/en-us/index',
      twitter: 'https://x.com/Breakers_EN',
      youtube: 'https://www.youtube.com/@BREAKERS_EN',
      discord: 'https://discord.gg/breakers'
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

export const PLATFORM_ICONS: Record<Platform, string> = {
  Android: '⬥',
  iOS: '',
  PC: '⊡',
  PS5: '⬡',
  Switch: '◈',
};

export function getReleaseTargetDate(game: GachaGame): Date | null {
  if (!game.releaseDate) return null;
  if (game.releaseDateTime) {
    return new Date(game.releaseDateTime);
  } else {
    const [year, month, day] = game.releaseDate.split('-').map(Number);
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }
}

export function isGameReleased(game: GachaGame, now: Date = new Date()): boolean {
  if (game.status === 'Released') return true;
  if (game.releaseDateConfirmed && game.releaseDate) {
    const target = getReleaseTargetDate(game);
    if (target && now.getTime() >= target.getTime()) {
      return true;
    }
  }
  return false;
}

export function getEffectiveGameStatus(game: GachaGame, now: Date = new Date()): GameStatus {
  if (isGameReleased(game, now)) {
    return 'Released';
  }
  return game.status;
}

export function getRuntimeGachaGames(now: Date = new Date()): GachaGame[] {
  return gachaGames.map((game) => {
    const status = getEffectiveGameStatus(game, now);
    if (status !== game.status) {
      return { ...game, status };
    }
    return game;
  });
}
