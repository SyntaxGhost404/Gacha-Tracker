import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
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
  height: 100vh;
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
  margin-top: 3.5rem; /* Start directly beneath the fixed height navbar */
  height: calc(100vh - 3.5rem);
  
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
  const { pathname } = useLocation();
  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);
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

function AppRoutes() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      
      // Auto-collapse mobile others menu on scroll to keep the viewport clean
      setIsMobileMenuOpen(false);

      // Near top of container, always keep visible
      if (currentScrollTop <= 50) {
        setShowBottomNav(true);
        lastScrollTop.current = currentScrollTop;
        return;
      }

      const diff = currentScrollTop - lastScrollTop.current;
      
      // We only toggle if the scroll deviation exceeds 12px to avoid jitteriness
      if (diff > 12) {
        // scrolling down -> Hide bottom navbar
        setShowBottomNav(false);
        lastScrollTop.current = currentScrollTop;
      } else if (diff < -12) {
        // scrolling up -> Show bottom navbar
        setShowBottomNav(true);
        lastScrollTop.current = currentScrollTop;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MainLayout>
      <GachaNavbar />
      <ScrollContainer id="main-scroll-container" ref={scrollContainerRef}>
        <ScrollToTop />
        <ScrollToTopButton showBottomNav={showBottomNav} hide={isMobileMenuOpen} />
        <ContentWrapper style={{ flex: 1 }}>
          <main style={{ minHeight: '60vh', flex: 1 }}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/games' element={<GamesPage />} />
              <Route path='/archive' element={<ArchivePage />} />
              <Route path='/news' element={<NewsPage />} />
              <Route path='/news/:id' element={<ArticleDetailPage />} />
              <Route path='/game/:id' element={<GameDetailPage />} />
              <Route path='/feedback' element={<FeedbackPage />} />
              <Route path='/changelog' element={<ChangelogPage />} />
              <Route path='*' element={<PlaceholderPage title='Page Not Found' />} />
            </Routes>
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
