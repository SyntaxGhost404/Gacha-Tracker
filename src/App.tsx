import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Construction } from 'lucide-react';
import { ThemeProvider } from './components/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { GachaNavbar } from './components/gacha/GachaNavbar';
import { GachaFooter } from './components/gacha/GachaFooter';
import { HomePage } from './pages/gacha/HomePage';
import { GamesPage } from './pages/gacha/GamesPage';
import { NewsPage } from './pages/gacha/NewsPage';
import { FeedbackPage } from './pages/gacha/FeedbackPage';
import { ArticleDetailPage } from './pages/gacha/ArticleDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
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
  return (
    <>
      <GachaNavbar />
      <ScrollToTop />
      <main style={{ minHeight: '60vh' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/games' element={<GamesPage />} />
          <Route path='/news' element={<NewsPage />} />
          <Route path='/news/:id' element={<ArticleDetailPage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
          <Route path='*' element={<PlaceholderPage title='Page Not Found' />} />
        </Routes>
      </main>
      <GachaFooter />
    </>
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
