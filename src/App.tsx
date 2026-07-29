import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Construction } from 'lucide-react';
import styled from 'styled-components';
import { ThemeProvider } from './components/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { GachaNavbar } from './components/gacha/GachaNavbar';
import { GachaFooter } from './components/gacha/GachaFooter';
import { HomePage } from './pages/gacha/HomePage';
import { GamesPage } from './pages/gacha/GamesPage';
import { ArchivePage } from './pages/gacha/ArchivePage';
import { NewsPage } from './pages/gacha/NewsPage';
import { FeedbackPage } from './pages/gacha/FeedbackPage';
import { ArticleDetailPage } from './pages/gacha/ArticleDetailPage';
import { GameDetailPage } from './pages/gacha/GameDetailPage';
import { ChangelogPage } from './pages/gacha/ChangelogPage';
import { ScrollToTopButton } from './components/gacha/ScrollToTopButton';
import { MobileBottomNavbar } from './components/gacha/MobileBottomNavbar';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  background-color: var(--global-primary-bg);
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 105rem;
  margin: 0 auto;
  padding: 1rem 1rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 31.25rem) {
    padding: 0.5rem 0.5rem 0.5rem;
  }
`;

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (!container) return;

    let timerId: any = null;
    let attempts = 0;
    const maxAttempts = 50; // 50 * 15ms = 750ms total polling time

    if (hash) {
      const id = hash.replace('#', '');
      
      const checkAndScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          const topPos = element.getBoundingClientRect().top + container.scrollTop - 90;
          container.scrollTo({ top: topPos, behavior: 'smooth' });
        } else if (attempts < maxAttempts) {
          attempts++;
          timerId = setTimeout(checkAndScroll, 15);
        }
      };

      // Delay initial check to let page sliding animations (250ms) finish and settle
      timerId = setTimeout(checkAndScroll, 280);
    } else {
      container.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [pathname, hash]);
  return null;
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div
      style={{
        paddingTop: '3.5rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        color: 'var(--global-text-muted)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Construction size={36} strokeWidth={1.8} style={{ opacity: 0.5, color: 'var(--primary-accent)' }} />
      </div>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--global-text)' }}>
        {title}
      </div>
      <div style={{ fontSize: '0.85rem' }}>Coming soon</div>
    </div>
  );
}

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </motion.div>
  );
};

function AppRoutes() {
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    lastScrollTop.current = container.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      const isHomePage = location.pathname === '/';
      
      // Auto-collapse mobile others menu on scroll to keep the viewport clean
      setIsMobileMenuOpen(false);

      if (isHomePage) {
        // Home page hero hiding logic: hide bottom navbar at top hero section (<= 40px)
        if (currentScrollTop <= 40) {
          setShowBottomNav(false);
          lastScrollTop.current = currentScrollTop;
          return;
        }

        // On Home page past hero section: reveal on scroll down, hide on scroll up
        const diff = currentScrollTop - lastScrollTop.current;
        if (diff > 12) {
          setShowBottomNav(true);
          lastScrollTop.current = currentScrollTop;
        } else if (diff < -12) {
          setShowBottomNav(false);
          lastScrollTop.current = currentScrollTop;
        }
      } else {
        // Subpages: Keep bottom navbar visible at page top (<= 40px)
        if (currentScrollTop <= 40) {
          setShowBottomNav(true);
          lastScrollTop.current = currentScrollTop;
          return;
        }

        // Directional scroll-hide/show behavior on subpages
        const diff = currentScrollTop - lastScrollTop.current;
        if (diff > 12) {
          // Scrolling down -> reveals bottom navbar
          setShowBottomNav(true);
          lastScrollTop.current = currentScrollTop;
        } else if (diff < -12) {
          // Scrolling up -> hides bottom navbar
          setShowBottomNav(false);
          lastScrollTop.current = currentScrollTop;
        }
      }
    };

    // Check initial position on mount or route change
    handleScroll();

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <MainLayout>
      <GachaNavbar />
      <ScrollContainer id="main-scroll-container" ref={scrollContainerRef}>
        <ScrollToTop />
        <ScrollToTopButton showBottomNav={showBottomNav} hide={isMobileMenuOpen} />
        <ContentWrapper style={{ flex: 1 }}>
          <main style={{ minHeight: '60vh', flex: 1, position: 'relative' }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path='/' element={<AnimatedPage><HomePage /></AnimatedPage>} />
                <Route path='/games' element={<AnimatedPage><GamesPage /></AnimatedPage>} />
                <Route path='/archive' element={<AnimatedPage><ArchivePage /></AnimatedPage>} />
                <Route path='/news' element={<AnimatedPage><NewsPage /></AnimatedPage>} />
                <Route path='/news/:id' element={<AnimatedPage><ArticleDetailPage /></AnimatedPage>} />
                <Route path='/game/:id' element={<AnimatedPage><GameDetailPage /></AnimatedPage>} />
                <Route path='/feedback' element={<AnimatedPage><FeedbackPage /></AnimatedPage>} />
                <Route path='/changelog' element={<AnimatedPage><ChangelogPage /></AnimatedPage>} />
                <Route path='*' element={<AnimatedPage><PlaceholderPage title='Page Not Found' /></AnimatedPage>} />
              </Routes>
            </AnimatePresence>
          </main>
        </ContentWrapper>
        <GachaFooter />
      </ScrollContainer>
      <MobileBottomNavbar 
        visible={showBottomNav} 
        popupOpen={isMobileMenuOpen} 
        onPopupOpenChange={setIsMobileMenuOpen} 
      />
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <WatchlistProvider>
          <AppRoutes />
        </WatchlistProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
