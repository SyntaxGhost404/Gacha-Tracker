# GachaTracker (miruro_no_kuon)

A modern, highly polished, responsive Single Page Application (SPA) designed to track, schedule, and showcase upcoming, pre-registration, and newly released gacha games. Built with React, TypeScript, and styled-components, this application offers users a unified portal to track game statuses, countdowns, news, and technical specifications, with built-in personalized watchlists and theme control.

---

## 🎨 Design & Visual Identity

GachaTracker is crafted around a premium **Cosmic Dark & Slate** aesthetic designed specifically for gamer audiences, featuring:
- **Responsive Layout**: Designed-first for desktop precision, paired seamlessly with mobile-first bottom navigation.
- **Dynamic Theme Engine**: Quick toggle transition supporting eye-safe night slates and crisp premium light themes.
- **Fluid Micro-Interactions**: Smooth state movements, item fade-ins, and carousel translates utilizing `motion/react` animations.
- **Typography & Iconography**: Clean spatial hierarchies using Inter/system fonts matched with crisp standard `lucide-react` modern line icons.

---

## 🚀 Core Features

### 1. Unified Gacha Database & Explorable Catalog
- **Multi-Game Tracking**: Extensive database listing upcoming releases, pre-registrations, closed beta tests (CBT), and recent global launches.
- **Interactive Multi-Filters**: Allows users to filter games by target region (Global, SEA, NA, JP, CN, KR), specific platforms (PC, Android, iOS), and active release statuses.
- **Searching & Sorting**: Instant real-time text query search mapping title names, publishers, or developer studios coupled with dynamic sorting attributes.

### 2. Live Countdowns & Schedule Clocks
- **Real-Time Timers**: Dynamic countdown clocks displaying remaining days, hours, minutes, and seconds relative to estimated release calendars or testing phases.
- **Interactive Milestones**: Highlights key test stages (such as Closed Beta "Prologue Test" phases).

### 3. Personal Watchlist System
- **Stateful Following**: Effortlessly track games with follow and unfollow states.
- **Dynamic Width Layout Guard**: A mobile-optimized navigation header layout that dynamically shifts its expansion path to prevent layout shifts. The numeric watchlist counter expands leftward into the open space instead of pushing neighboring elements.
- **Persistence Context**: Driven through custom React Context (`WatchlistContext`).

### 4. Rich Media Layout Carousel
- **Trailer & Screenshot Previews**: Responsive sliding carousels supporting direct inline trailers and image highlights.
- **Touch-Friendly Track Controls**: Smooth drag-to-scroll tracks matching slide dots and navigation arrows for standard desktop or touch displays.

### 5. News & Community Portal
- **Game Highlights**: Individual article markdown detailing updates, CBT sign-ups, teaser launches, or developer diaries.
- **Interactive Feedback Loop**: Dedicated forms for community submissions, enabling user-driven content curation, game submissions, and inconsistency reports.

---

## 📂 Project Architecture

```bash
/
├── public/                 # Static assets
│   ├── banners/           # Hero banners for games e.g. Limit Zero Breakers
│   └── profiles/          # Rounded game launcher icons
├── src/
│   ├── components/        # Extracted sub-components and global engines
│   │   ├── gacha/         # Layout modules (Navbars, Footers, Carousels, Scroll buttons)
│   │   └── ThemeContext   # Theme provider engine (styled-components)
│   ├── context/           # React state contexts
│   │   └── WatchlistContext # Personalized watchlist context
│   ├── data/              # Base static dataset
│   │   └── gachaGames.ts  # Database entries for listed gacha games
│   ├── pages/             # Dynamic page views
│   │   └── gacha/         # Primary routes (Home, Explore, Detailed views, Archive, News)
│   ├── styles/            # CSS variables and standard layout setups
│   ├── App.tsx            # Main routes, dynamic transitions, scroll boundaries
│   └── main.tsx           # Entry React DOM renderer
├── index.html             # Application mounting script
├── package.json           # Dependencies and project commands
└── vite.config.ts         # Vite build configuration rules
```

---

## 🛠️ Technical Specifications

GachaTracker utilizes a robust modern ecosystem:
- **Core UI Framework**: [React (v18+)](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/)
- **Style Engine**: [styled-components](https://styled-components.com/) + custom CSS variables
- **Motion & Transitions**: [motion/react (formerly Framer Motion)](https://motion.dev/)
- **Icon Library**: [lucide-react](https://lucide.dev/)
- **Routing Engine**: [react-router-dom](https://reactrouter.com/)

---

## 💻 Local Development Setup

To get a local instance of GachaTracker up and running, follow these steps:

### Prerequisites
Make sure you have [Node.js (v18+)](https://nodejs.org/) and `npm` installed.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   *The local server will boot on `http://localhost:3000` or the authorized mapped container port.*

3. **Code Formatting & Verification**:
   ```bash
   # Formats and cleans the workspace using Prettier
   npm run format

   # Lints code syntax and imports
   npm run lint
   ```

4. **Production Build Compilation**:
   ```bash
   npm run build
   ```
   *Compiles a optimized static build stored under the `/dist` directory.*
