import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface WatchlistContextType {
  watchlist: string[];
  toggle: (id: string) => void;
  isWatchlisted: (id: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
};

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('gacha-watchlist') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gacha-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggle = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const isWatchlisted = (id: string) => watchlist.includes(id);

  return (
    <WatchlistContext.Provider value={{ watchlist, toggle, isWatchlisted }}>
      {children}
    </WatchlistContext.Provider>
  );
}
