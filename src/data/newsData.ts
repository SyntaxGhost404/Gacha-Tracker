export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  hook: string;
  body: string;
  bannerImage: string;
  profileImage: string;
  bannerColor: string;
  iconInitials: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Azur Promilia Announces English Closed Beta Questionnaire Sign-Ups',
    category: 'CLOSED BETA',
    date: 'May 20, 2026',
    hook: 'Sign-ups are now live for the first English technical testing phase. Explore creature-befriending companion combat systems.',
    body: 'Manjuu Games, the acclaimed developers behind Azur Lane, have officially opened pre-registrations and questionnaire submissions for the highly anticipated Azur Promilia Closed Beta test. Players can now submit their credentials for a chance to play. The upcoming test will showcase the brand-new real-time creature companions called "Kipipis", and optimize performance across major platforms including PC, Android, and iOS.',
    bannerImage: '/banners/azur-promilia.jpeg',
    profileImage: '/profiles/azur-promilia.jpg',
    bannerColor: '#0a1520',
    iconInitials: 'AP',
  },
  {
    id: 'news-2',
    title: 'hololive Dreams Reaches 1 Million Pre-Registrations Worldwide',
    category: 'PRE-REGISTRATION',
    date: 'May 18, 2026',
    hook: 'QualiArts and Cover Corp celebrate the landmark milestone with exclusive launch rewards including guaranteed SSR character tickets.',
    body: 'The upcoming rhythm RPG "hololive Dreams" (also known as holodori) has officially crossed the 1,000,000 pre-registrations mark worldwide. Developer QualiArts confirmed that all players will receive premium in-game currency, limited-edition promotional profile banners, and a guaranteed launch-day SSR recruitment ticket to obtain their favorite legendary live VTuber characters on day one.',
    bannerImage: '/banners/hololive-dreams.jpg',
    profileImage: '/profiles/hololive-dreams.webp',
    bannerColor: '#121a10',
    iconInitials: 'HD',
  },
  {
    id: 'news-3',
    title: 'ALLfiring Side-Scroller Action RPG Launches Major Performance Hot-Fix',
    category: 'UPDATE',
    date: 'May 15, 2026',
    hook: 'The dark fantasy side-scroller gets mobile frame-rate optimization and three-character switching delays adjusted.',
    body: 'ALLfiring, the recently launched dark fantasy voxel sandbox action RPG, has received its first major post-launch performance patch. Hot-fix 1.0.4 addresses optimization constraints on mobile screens, adjustments to three-character real-time switching delay mechanics, and opens new sandbox sectors for exploration. The developers thanked the community for carrying the flame of hope on the game launch.',
    bannerImage: '/banners/allfiring.png',
    profileImage: '/profiles/allfiring.png',
    bannerColor: '#1a1208',
    iconInitials: 'AF',
  }
];
