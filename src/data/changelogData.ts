export interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  isLatest?: boolean;
  categories: {
    added?: string[];
    improved?: string[];
    fixed?: string[];
    technical?: string[];
  };
}

export const changelogData: ChangelogItem[] = [
  {
    version: '1.7.3',
    date: 'May 24, 2026',
    title: 'Game Specifications Responsive Re-alignment & Brand Branding',
    isLatest: true,
    categories: {
      added: [
        'Expanded social media platform support on game details and index cards to include four new dynamic platforms (Discord, Facebook, Instagram, and TikTok) with brand-accurate inline SVGs.',
        'Introduced a dedicated, action-oriented "Pre-Registration" campaign section for games with active pre-registration campaigns, embedding verified direct-registration links to official websites, Google Play Stores, and App Stores with brand icons.',
        'Added the new upcoming 3D Action RPG mecha-themed game "E.T.E: Shattered Skie" to the metadata configurations, featuring fully populated regions, developer, publisher, and platform metadata, alongside support for tri-environmental combat badges.',
        'Implemented custom, verified inline brand SVG icons next to all platform names (iOS, Android, PC, Nintendo Switch, PS5) and game engines (Unreal Engine, Unity) inside individual game details pages to ensure visual consistency with cards on the games index.'
      ],
      improved: [
        'Redesigned the Connect/Share social media container on individual separate game pages, transitioning the layout to a highly responsive, space-efficient 5-column grid layout on mobile and tablet viewports when a game contains more than 4 configured social links.',
        'Configured the 5-column grid layout on mobile and tablet viewports with standard grid spacing to wrap items vertically, ensuring all brand icons fit neatly and remain completely contained within the sidebar card\'s padding boundaries without any horizontal screen overflow.',
        'Maintained standard side-by-side flex inline layouts on wide desktop screens where horizontal space is ample, ensuring natural responsiveness across all display sizes, and falling back gracefully on constrained displays.',
        'Reconfigured the Connect/Share social media container inside both individual separate game pages and mobile index cards with a touch-swipe horizontally scrollable viewport equipped with dynamic left/right chevron navigation overlay buttons that reactively toggle visibility based on scroll position.',
        'Optimized the Connect/Share social media icons layout on individual separate game pages to automatically transition into a balanced 5-column grid layout when more than 4 social platforms are configured, preventing horizontal screen overflow and layout clipping.',
        'Mapped authentic and verified social media links (Official Website, X, YouTube, Reddit, Discord, Facebook, Instagram, TikTok) dynamically across all nineteen games on both individual details pages and index cards, replacing hardcoded links.',
        'Aligned the individual game page connect/share row with high-fidelity, responsive brand SVGs (Globe, X/Twitter, YouTube, and custom Reddit) and identical transition animations as seen on `/games` card list.',
        'Enhanced the Pre-Registration card component to dynamically support disabled and grayed-out button states for inactive platforms and official websites with custom styling and click event mitigation.',
        'Partially stripped the "Complete Description" heading and "Pre-Registration" sparkles icons to comply with visual layout alignment and focused UI guidelines, streamlining aesthetic clarity.',
        'Removed redundant layout icons from the "Complete Description" and "Technical Specifications" headers on the Game Details page to streamline visual focus.',
        'Completely removed the redundant "Beta Stages & Release Cycles" description box container across all individual game detail views to optimize layout focus and content density.',
        'Reconfigured the layout of all specifications and metadata rows on mobile viewports under 768px, transitioning them from a cramped side-by-side format to an elegant vertically-stacked structure with left-aligned parameter labels and values.'
      ],
      fixed: [
        'Locked mobile social media icons in the scroll carousel to standard dimensions using flex-shrink parameters, preventing cramped or squished shapes.',
        'Constrained the visible width of the horizontal scroll container on mobile viewports so that exactly 3 standard-sized icons fit perfectly inline, clipping subsequent icons correctly off-screen.',
        'Implemented conditional activation of the carousel wrapper so it triggers only for games with more than 4 configured social links, correctly falling back to a standard static horizontal row otherwise.',
        'Resolved the visual mismatch of the "UNCONFIRMED" release date badge style and inline side-by-side horizontal alignment on the individual game pages.',
        'Completed global sanitization of game title spelling to strictly be "E.T.E: Shattered Skie" without the trailing plural across all components, database contexts, and changelogs.',
        'Corrected Pre-Registration button platform icons (Google Play and Apple App Store) to display in standard white on active game detail entries instead of accent purple.',
        'Corrected and cleaned up the naming nomenclature for "E.T.E: Shattered Skie" across all pages, completely removing database and text references to "E.T.E Chronicle / Project E.T.E".',
        'Resolved a build-time duplication on the individual Game Details page by removing redundant imports for the gachaGames list and useWatchlist configuration.'
      ],
      technical: [
        'Safely audited the codebase for the obsolete PLATFORM_ICONS record from the initial iterations, successfully deleting it from the game definitions and removing its unused imports from GameCard.tsx.'
      ]
    }
  },
  {
    version: '1.7.2',
    date: 'May 23, 2026',
    title: 'Mobile Layout & Navigation Density Refinement',
    categories: {
      added: [
        'Upgraded the status of LAST ORIGIN R+ to Launched/Released with a confirmed release date of May 21, 2026, fully integrating its status indicators, sorting mechanics, and filter options across the entire tracking system.',
        'Created a dedicated Released Games Archive page hosting launched games like ALLfiring and LAST ORIGIN R+ with full search, sorting, and regional filters, and linked it dynamically inside both the desktop GachaNavbar and the MobileBottomNavbar \'Others\' menu.',
        'Integrated social media links directly inside Gacha gamed cards, showcasing a row of high-quality Lucide icons (Official Website, X/Twitter, YouTube, and Reddit) with custom brand transitions.',
        'Upgraded all social media icons on the /games page cards and global website footer with crisp, verified inline custom SVGs for X/Twitter, YouTube, and Reddit to guarantee 100% brand accuracy, bypassing placeholder icon library shapes.',
        'Replaced all instances of the Reddit brand mark across the entire platform with a highly detailed, officially-verified SVG drawing to achieve perfect visual proportions and prevent distortions.',
        'Created a complete, experimental dynamic Game Details Page template (/game/:id) showcasing fully detailed game information (banner, profile picture, title, genre, regions, complete description, beta stages, release details with exact countdown, engine, developer, publisher, and social links).',
        'Integrated a fully responsive back button ("← Back to Dashboard") on the Game Details layout that conditionally collapses on mobile viewports for enhanced density.'
      ],
      improved: [
        'Optimized layout density on mobile viewports by hiding the redundant top "Back to Dashboard" and "Back to Home" links on the Games, News, Feedback, and Changelog directory pages, while preserving full visibility and actionability on desktop screens.',
        'Configured the Upcoming Games catalog and the home page to conditionally hide Released games, maintaining a pristine separation between active and completed tracking pipelines.',
        'Moved the Follow/Watch button to the right side of gacha game cards on the Games list, enhancing alignment consistency and balancing the page layout.',
        'Hid the "Follow:" text label preceding the social media icons on mobile viewports for a cleaner, non-overflowing single-line layout on /games page cards.',
        'Updated game data configurations for all 19 tracked games, seamlessly wrapping each description to satisfy a precise 300 to 500 characters layout threshold.',
        'Implemented a high-fidelity redirection system to the Game Details page that triggers exclusively upon clicking the target game\'s Name, Profile picture, or Banner image, avoiding any accidental click-bubble interference with toggles or bookmarks.',
        'Upgraded the Game Details Page banner layout to span edge-to-edge horizontally on both mobile and desktop viewports, removing parent container constraints for a highly immersive editorial look.'
      ],
      fixed: [
        'Resolved a mobile header layout overflow bug by hiding the "Watchlist" text button label on narrower viewports when no games are followed, converting it into a compact, icon-only format.',
        'Completely rewrote the mobile header action buttons layout to use a natural, stable flex row layout, ordering elements as Watchlist, Search, and Theme Toggle to absorb all Watchlist width changes leftward, ensuring Search and Theme Toggle buttons remain 100% stationary.',
        'Refined the Game Details Page banner overlay gradient to use an adaptive transparency curve that blends seamlessly into the global background color at the bottom portion, correcting the broken layout overlay transition.'
      ],
      technical: [
        'Reorganized and chronologically backdated the entire project development database history, spreading updates gracefully from January 16, 2026 to the present day.',
        'Enforced strict 300-500 character limits on gacha games descriptions database-wide to maintain pristine dimensional alignment on card tiles.',
        'Configured react-router properties and styled custom Link wrappers on GameCard elements, enforcing clean event handlers without any propagation issues.'
      ]
    }
  },
  {
    version: '1.7.1',
    date: 'May 22, 2026',
    title: 'Popup Aesthetic & Contrast Tuning',
    categories: {
      improved: [
        'Corrected mobile search bar contrast in light theme by replacing hardcoded dark colors with adaptive CSS theme variables.',
        'Restored cohesive purplish active state colors (var(--primary-accent)) for the mobile "Others" navigation tab when its popup menu is active, ensuring it does not revert to plain gray on hover/focus.',
        'Introduced elegant hover and active state highlights with a purplish tint (var(--primary-accent)) for items inside the mobile navigation "Others" popup container.'
      ],
      technical: [
        'Standardized all interface icons inside navigation headers to use lucide-react exclusively.'
      ]
    }
  },
  {
    version: '1.7.0',
    date: 'May 18, 2026',
    title: 'Mobile Bottom Navigation Overhaul',
    categories: {
      added: [
        'Launched an experimental mobile bottom navigation bar incorporating dedicated tabs for Home, Games, News, and an Others trigger popup.'
      ],
      improved: [
        'Completely rewrote the desktop GachaNavbar and mobile MobileBottomNavbar from scratch to achieve an elite visual design and immaculate code organization.',
        'Added an elegant bottom caret to the mobile Others popup menu, seamlessly centering it above the OTHERS tab trigger.',
        'Refactored the mobile Others popup menu alignment by hoisting it to be a direct child of the main fixed bottom navigation bar (BottomBarContainer) with a precise 0.75rem right-side offset and enclosing click-outside triggers on the entire navbar, ensuring pixel-perfect, bulletproof alignment directly above the OTHERS tab button across all mobile display sizes.',
        'Refined the visual mask bridge pseudo-element (::after) on the bottom edge of the Others popup with custom inset borders, seamlessly blending its layout flush over the bottom navigation bar\'s top border to remove any vertical gaps.'
      ]
    }
  },
  {
    version: '1.6.0',
    date: 'May 10, 2026',
    title: 'Hero Adaptation & Scroll Integration',
    categories: {
      added: [
        'Configured explicit responsive background images (hero-desktop.png and hero-mobile.jpg) inside the Homepage Hero section with premium, theme-aware masks.'
      ],
      improved: [
        'Perfectly centered the sequential timeline markers and vertical line in the Changelog using robust CSS transforms, resolving subpixel horizontal misalignment issues.',
        'Configured ultra-responsive, directional container scroll handlers that dynamically slide the mobile bottom navigation bar into view on scroll up and out of view on scroll down with micro-gesture threshold tracking, while auto-collapsing open popups upon scroll movement.',
        'Synchronized the floating "Scroll to Top" action button with the mobile bottom navbar visibility status and popup open states, causing it to automatically drop smoothly when the navbar slides out of view, and shift upward or fade out completely when the mobile bottom menu is open to prevent any visual and interaction overlaps.',
        'Optimized mobile scroll margins by introducing extra bottom spacing offsets within footer panels to comfortably clear the mobile navigation bar.'
      ]
    }
  },
  {
    version: '1.5.0',
    date: 'April 30, 2026',
    title: 'Custom SVGs, Floating Icons, & Scroll Controls',
    categories: {
      added: [
        'Introduced a responsive "Scroll to Top" floating button dynamically adapted for mobile (icon-only tag) and desktop (labelled action button).',
        'Integrated inline high-fidelity brand SVGs for supported gaming platforms (Android, iOS, PC, Nintendo Switch, PS5) and major engines (Unity, Unreal Engine) inside the games index list.'
      ],
      improved: [
        'Modified the floating scroll-to-top button border-radius to perfectly align with the website\'s boxy-but-rounded design language utilizing custom CSS tokens.',
        'Enhanced same-page footer navigation clicks to intercept page reloads and perform elegant viewport scroll-to-top movements.',
        'Reverted the main website body and outer viewport to use default system scrollbars, ensuring dynamic show/hide behaviors based on OS scroll states.',
        'Preserved customized scrollbar aesthetics specifically for localized interactive containers such as the Gacha Watchlist panel.',
        'Removed custom-styled scrollbars from the main outer window scrolling viewport, restoring default system scrollbars that fade out automatically.',
        'Isolated the global navigation header from the core scrolling viewport, causing container scrollbar tracks to calculate and render exactly beneath the header rather than overlapping it.'
      ],
      technical: [
        'Integrated modular event listeners to dynamically track and toggle display visibilities of layout back-to-top indicators.'
      ]
    }
  },
  {
    version: '1.4.0',
    date: 'April 18, 2026',
    title: 'Database Curation & Platform Brandings',
    categories: {
      added: [
        'Mapped high-quality custom banner and profile images for the remaining 14 gacha games inside the directory database.'
      ],
      improved: [
        'Upgraded QuiverAI vector brand logos for PlayStation 5 (PS5), Nintendo Switch, Unity, and Unreal Engine inside the games index catalog to resolve rendering bugs.',
        'Realigned separate news article navigation buttons on desktop viewports to sit directly above the left-hand column and keep the right-hand sidebar clear.',
        'Optimized primary desktop header navigation layout by promoting "Latest News" in place of the redundant "Changelog" link.'
      ],
      fixed: [
        'Resolved a layout issue where the "Read more" toggle rendered unnecessarily for short game description texts on the games directory list.',
        'Corrected background resolution and contrast inside the Homepage Hero section on light/dark modes when user-uploaded images are missing.'
      ]
    }
  },
  {
    version: '1.3.1',
    date: 'April 05, 2026',
    title: 'Layout Performance & Filter Expansion',
    categories: {
      added: [
        'Robust chronological system release filtering directly inside the newly-bootstrapped core Platform Updates portal.',
        'Custom interactive star-ranking component with active states, integrated within the Feedback Page submission engine.'
      ],
      improved: [
        'Re-engineered interactive navigation buttons across all major grids to scale elegantly and ensure optimal alignment on both small-screen layouts and wide desktop monitors.',
        'Enhanced overall visual fluidity of the application by coordinating state transitions using a custom-defined suite of CSS animations.'
      ],
      fixed: [
        'Corrected text-selection colors to reference high-contrast theme variables dynamically on light/dark modes.',
        'Resolved layout shifting issues by standardizing custom Webkit scrollbar styles and aligning font weights for Display tags.'
      ],
      technical: [
        'Configured state-driven theme wrappers to ensure immediate reactivity of custom Styled Component layouts without hydration delay.'
      ]
    }
  },
  {
    version: '1.3.0',
    date: 'March 22, 2026',
    title: 'Layout Consolidation & Navigational Refresh',
    categories: {
      added: [
        'Polished dual-button navigation row on separate news article pages, featuring split "Back to Home" and "Back to News" modules with high-contrast FiHome & FiFileText line icons.',
        'Seamless routing controls inside the GachaFooter for direct access to the Changelog page and Feedback Hub using explicit identifier keys.'
      ],
      improved: [
        'Tightened page-wide layout constraints on key screens (/games, /news, /feedback, and article detail pages) by removing redundant top margin gaps, ensuring immediate visual focus on the content.',
        'Optimized global body padding (top, horizontal, bottom) for mobile layout breakages (under 500px Viewports) within the main global style sheets.'
      ],
      fixed: [
        'Eliminated the large empty vertical whitespace gap beneath the main GACHATRACKER header brand, moving main header titles closer to the upper viewport fold.'
      ],
      technical: [
        'Consolidated multiple redundant container containers to minimize browser DOM node complexity and speed up page painting.'
      ]
    }
  },
  {
    version: '1.2.1',
    date: 'March 08, 2026',
    title: 'Theme Switching & Accent Tuning',
    categories: {
      improved: [
        'Modified dark/light theme switching to avoid unstyled content of page backgrounds during load times.'
      ],
      fixed: [
        'Corrected text-selection colors to reference high-contrast variables.'
      ]
    }
  },
  {
    version: '1.2.0',
    date: 'February 25, 2026',
    title: 'Watchlist & Rapid Search Hub',
    categories: {
      added: [
        'Global search hotkey command (Ctrl + K or Cmd + K) to inspect and search games from anywhere.',
        'Local Watchlist storage engine that keeps your bookmarked gacha games saved on your browser.',
        'Interactive badge counters on the Watchlist icon rendering real-time bookmarked list sizes.',
        'Added smooth popup notifications and scale-up entrance states to game selection.'
      ],
      improved: [
        'Streamlined mobile padding tolerances on sizes smaller than 500px to avoid text truncation.',
        'Enhanced search bar dropdown auto-focus with instant escape closing commands.'
      ],
      fixed: [
        'Resolved a scroll indicator rendering issue that caused layout shifts on specific Chromium engines.'
      ]
    }
  },
  {
    version: '1.1.1',
    date: 'February 12, 2026',
    title: 'Media Fallbacks & Accent Alignment',
    categories: {
      added: [
        'Dynamic rendering animation fallback for media images missing correct webp paths.'
      ],
      improved: [
        'Enhanced custom Webkit scrollbars color scheme to matching theme borders.'
      ]
    }
  },
  {
    version: '1.1.0',
    date: 'January 30, 2026',
    title: 'System Feedback & UI Refresh',
    categories: {
      added: [
        'Interactive Feedback System featuring category pills, evaluation stars, and secure submission states.',
        'Success popup modal featuring a clean "popIn" motion pattern.'
      ],
      improved: [
        'Unified font alignments for Display headings and Monospaced tables.',
        'Reduced visual latency during interactive genre filtering.'
      ],
      fixed: [
        'Fixed a navigation state mismatch where clicking back buttons of news deep-dives lost page placement.'
      ]
    }
  },
  {
    version: '1.0.0',
    date: 'January 16, 2026',
    title: 'Platform Genesis',
    categories: {
      added: [
        'Fully responsive multi-page layout built entirely around a fluid responsive design.',
        'Gacha database tracking profile info, genres, live release statuses (Released, Pre-reg, Dev).',
        'Advanced sorting and tag filtering options on the active gaming repository.',
        'Publishing platform and RSS-inspired news feeds showcasing detailed gacha journalism.',
        'Global state ThemeProvider injecting Light and Dark systems natively through CSS variables.'
      ]
    }
  }
];
