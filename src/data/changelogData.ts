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
    version: '1.3.1',
    date: 'May 22, 2026',
    title: 'Scroll Optimization & Aesthetic Refinement',
    isLatest: true,
    categories: {
      added: [
        'Introduced a responsive "Scroll to Top" floating button dynamically adapted for mobile (icon-only tag) and desktop (labelled action button).',
        'Integrated inline high-fidelity brand SVGs for supported gaming platforms (Android, iOS, PC, Nintendo Switch, PS5) and major engines (Unity, Unreal Engine) inside the games index list.',
        'Launched an experimental mobile bottom navigation bar incorporating dedicated tabs for Home, Games, News, and an Others trigger popup.'
      ],
      improved: [
        'Modified the floating scroll-to-top button border-radius to perfectly align with the website\'s boxy-but-rounded design language utilizing custom CSS tokens.',
        'Enhanced same-page footer navigation clicks to intercept page reloads and perform elegant viewport scroll-to-top movements.',
        'Reverted the main website body and outer viewport to use default system scrollbars, ensuring dynamic show/hide behaviors based on OS scroll states.',
        'Preserved customized scrollbar aesthetics specifically for localized interactive containers such as the Gacha Watchlist panel.',
        'Perfectly centered the sequential timeline markers and vertical line in the Changelog using robust CSS transforms, resolving subpixel horizontal misalignment issues.',
        'Realigned separate news article navigation buttons on desktop viewports to sit directly above the left-hand column and keep the right-hand sidebar clear.',
        'Optimized primary desktop header navigation layout by promoting "Latest News" in place of the redundant "Changelog" link.',
        'Upgraded QuiverAI vector brand logos for PlayStation 5 (PS5), Nintendo Switch, Unity, and Unreal Engine inside the games index catalog to resolve rendering bugs.',
        'Isolated the global navigation header from the core scrolling viewport, causing container scrollbar tracks to calculate and render exactly beneath the header rather than overlapping it.',
        'Removed custom-styled scrollbars from the main outer window scrolling viewport, restoring default system scrollbars that fade out automatically.',
        'Configured smart, directional container scroll handlers that dynamically slide the mobile navigation bar into view on scroll up and out of view on scroll down.',
        'Synchronized the floating "Scroll to Top" action button to automatically scale and shift vertical space in tandem with the slide behaviors of the bottom navigation bar, preventing layout overlaps.',
        'Optimized mobile scroll margins by introducing extra bottom spacing offsets within footer panels to comfortably clear the mobile navigation bar.',
        'Repositioned and anchored the mobile Others popup menu directly relative to the main bottom navigation bar container (BottomBarContainer) with a precise 0.5rem right-side offset, ensuring pixel-perfect horizontal alignment directly above the OTHERS tab button across all mobile display sizes.',
        'Refined the visual mask bridge pseudo-element (::after) on the bottom edge of the Others popup with custom inset borders, seamlessly blending its layout flush over the bottom navigation bar\'s top border to remove any vertical gaps.',
        'Corrected mobile search bar contrast in light theme by replacing hardcoded dark colors with adaptive CSS theme variables.'
      ],
      fixed: [
        'Resolved a layout issue where the "Read more" toggle rendered unnecessarily for short game description texts on the games directory list.'
      ],
      technical: [
        'Integrated modular event listeners to dynamically track and toggle display visibilities of layout back-to-top indicators.'
      ]
    }
  },
  {
    version: '1.3.0',
    date: 'May 21, 2026',
    title: 'Layout Consolidation & Navigational Refresh',
    categories: {
      added: [
        'Polished dual-button navigation row on separate news article pages, featuring split "Back to Home" and "Back to News" modules with high-contrast FiHome & FiFileText line icons.',
        'Seamless routing controls inside the GachaFooter for direct access to the Changelog page and Feedback Hub using explicit identifier keys.',
        'Robust chronological system release filtering directly inside the newly-bootstrapped core Platform Updates portal.',
        'Custom interactive star-ranking component with active states, integrated within the Feedback Page submission engine.'
      ],
      improved: [
        'Tightened page-wide layout constraints on key screens (/games, /news, /feedback, and article detail pages) by removing redundant top margin gaps, ensuring immediate visual focus on the content.',
        'Optimized global body padding (top, horizontal, bottom) for mobile layout breakages (under 500px Viewports) within the main global style sheets.',
        'Re-engineered interactive navigation buttons across all major grids to scale elegantly and ensure optimal alignment on both small-screen layouts and wide desktop monitors.',
        'Enhanced overall visual fluidity of the application by coordinating state transitions using a custom-defined suite of CSS animations.'
      ],
      fixed: [
        'Eliminated the large empty vertical whitespace gap beneath the main GACHATRACKER header brand, moving main header titles closer to the upper viewport fold.',
        'Corrected text-selection colors to reference high-contrast theme variables dynamically on light/dark modes.',
        'Resolved layout shifting issues by standardizing custom Webkit scrollbar styles and aligning font weights for Display tags.'
      ],
      technical: [
        'Consolidated multiple redundant container containers to minimize browser DOM node complexity and speed up page painting.',
        'Configured state-driven theme wrappers to ensure immediate reactivity of custom Styled Component layouts without hydration delay.'
      ]
    }
  },
  {
    version: '1.2.0',
    date: 'May 20, 2026',
    title: 'Watchlist & Rapid Search Hub',
    categories: {
      added: [
        'Global search hotkey command (Ctrl + K or Cmd + K) to inspect and search games from anywhere.',
        'Local Watchlist storage engine that keeps your bookmarked gacha games saved on your browser.',
        'Interactive badge counters on the Watchlist icon rendering real-time bookmarked list sizes.',
        'Added smooth popup notifications and scale-up entrance states to game selection.'
      ],
      improved: [
        'Modified dark/light theme switching to avoid unstyled content of page backgrounds during load times.',
        'Streamlined mobile padding tolerances on sizes smaller than 500px to avoid text truncation.',
        'Enhanced search bar dropdown auto-focus with instant escape closing commands.'
      ],
      fixed: [
        'Resolved a scroll indicator rendering issue that caused layout shifts on specific Chromium engines.',
        'Corrected text-selection colors to reference high-contrast variables.'
      ]
    }
  },
  {
    version: '1.1.0',
    date: 'May 10, 2026',
    title: 'System Feedback & UI Refresh',
    categories: {
      added: [
        'Interactive Feedback System featuring category pills, evaluation stars, and secure submission states.',
        'Dynamic rendering animation fallback for media images missing correct webp paths.',
        'Success popup modal featuring a clean "popIn" motion pattern.'
      ],
      improved: [
        'Unified font alignments for Display headings and Monospaced tables.',
        'Enhanced custom Webkit scrollbars color scheme to matching theme borders.',
        'Reduced visual latency during interactive genre filtering.'
      ],
      fixed: [
        'Fixed a navigation state mismatch where clicking back buttons of news deep-dives lost page placement.'
      ]
    }
  },
  {
    version: '1.0.0',
    date: 'May 03, 2026',
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
