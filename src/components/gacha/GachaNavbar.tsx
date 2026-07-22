import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon, Search, X, Bookmark, ArrowRight, Trash2, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../ThemeContext';
import { useWatchlist } from '../../context/WatchlistContext';
import { statusColors, type GachaGame, getRuntimeGachaGames } from '../../data/gachaGames';

const StyledNavbar = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  flex-shrink: 0;
  padding: 0 1.25rem;
  height: 4.25rem;
  background-color: var(--nav-bg);
  backdrop-filter: blur(22px) saturate(145%);
  -webkit-backdrop-filter: blur(22px) saturate(145%);
  border-bottom: 1px solid var(--global-border);
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.08);
  z-index: 100;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  @media (max-width: 600px) {
    height: 3.9rem;
    padding: 0 0.75rem;
  }
`;

const NavInner = styled.div`
  max-width: 90rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.98rem;
  font-weight: 900;
  text-decoration: none;
  letter-spacing: 0.075em;
  color: var(--global-text);
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s ease;

  span {
    background: linear-gradient(135deg, var(--primary-accent), var(--secondary-accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &::before {
    content: '';
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 0.2rem;
    background: linear-gradient(135deg, var(--primary-accent), var(--secondary-accent));
    box-shadow: 0 0 18px var(--primary-accent);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 380px) {
    gap: 0.4rem;
    font-size: 0.82rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.18rem;
  margin-left: 1.25rem;
  padding: 0.24rem;
  background: var(--global-primary-skeleton);
  border: 1px solid var(--global-border);
  border-radius: 0.9rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  padding: 0.48rem 0.78rem;
  border-radius: 0.66rem;
  font-size: 0.82rem;
  font-weight: 650;
  color: var(--global-text-muted);
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    color: var(--global-text);
    background: var(--global-secondary-bg);
  }

  &.active {
    color: var(--primary-accent);
    background: var(--global-card-bg);
    box-shadow: 0 4px 12px var(--global-card-shadow);
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
`;

const ShortcutHint = styled.span`
  font-size: 0.65rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.2rem;
  background: var(--global-tertiary-bg);
  border: 1px solid var(--global-border);
  color: var(--global-text-muted);
  font-family: monospace;
  margin-left: 0.25rem;
  opacity: 0.8;

  @media (max-width: 900px) {
    display: none;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.55rem;
  padding: 0.55rem 0.78rem;
  border-radius: 0.76rem;
  border: 1px solid var(--global-border);
  background: var(--global-button-bg);
  color: var(--global-text);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 6px 18px transparent;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;

  svg {
    width: 0.95rem;
    height: 0.95rem;
    color: var(--global-text);
  }

  &:hover {
    background: var(--global-button-hover-bg);
    border-color: var(--global-border-strong);
    box-shadow: 0 6px 18px var(--global-card-shadow);
    transform: translateY(-1px);
  }
`;

const SearchWrapper = styled.div<{ $open: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    ${({ $open }) => !$open && 'display: none;'}
    position: fixed;
    top: 3.9rem;
    left: 0;
    right: 0;
    padding: 0.7rem;
    background: var(--nav-bg);
    backdrop-filter: blur(22px);
    z-index: 150;
    border-bottom: 1px solid var(--global-border);
    box-shadow: 0 4px 12px var(--global-card-shadow);
  }
`;

const SearchInput = styled.input<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '15rem' : '0')};
  padding: ${({ $open }) => ($open ? '0.45rem 2.2rem 0.45rem 2.2rem' : '0.45rem 0')};
  border-radius: 0.76rem;
  border: 1px solid var(--global-border);
  background: var(--global-button-bg);
  color: var(--global-text);
  font-size: 0.8rem;
  outline: none;
  overflow: hidden;
  transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), padding 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.15s ease;

  &::placeholder {
    color: var(--global-text-muted);
  }

  &:focus {
    border-color: var(--primary-accent);
    background: var(--global-card-bg);
    box-shadow: 0 0 0 3px var(--primary-accent-soft);
  }

  @media (min-width: 601px) {
    width: 16.5rem;
    padding: 0.58rem 2.2rem 0.58rem 2rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.72rem 2.5rem;
    font-size: 0.95rem;
  }
`;

const SearchIconPrefix = styled.div`
  position: absolute;
  left: 0.65rem;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: var(--global-text-muted);

  svg {
    width: 0.85rem;
    height: 0.85rem;
  }

  @media (max-width: 600px) {
    left: 1.25rem;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const SearchClearBtn = styled.button`
  position: absolute;
  right: 0.6rem;
  background: none;
  border: none;
  color: var(--global-text-muted);
  cursor: pointer;
  padding: 0.15rem;
  display: flex;
  align-items: center;
  transition: color 0.15s ease;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  &:hover {
    color: var(--global-text);
  }

  @media (max-width: 600px) {
    right: 1.25rem;
    svg {
      width: 1.15rem;
      height: 1.15rem;
    }
  }
`;

const SearchToggleBtn = styled(IconButton)`
  @media (min-width: 601px) {
    display: none;
  }
`;

const SearchDropdownGrid = styled.div`
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  width: 24rem;
  max-width: calc(100vw - 1rem);
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 1rem;
  box-shadow: 0 24px 60px var(--global-card-shadow);
  overflow: hidden;
  z-index: 200;
  animation: slideDropdown 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideDropdown {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    position: fixed;
    top: calc(3.9rem + 4rem);
    right: 0.6rem;
    left: 0.6rem;
    width: auto;
    max-width: none;
  }
`;

const SearchResultRow = styled.button<{ $statusColor: string }>`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-left: 3px solid ${({ $statusColor }) => $statusColor || 'transparent'};
  transition: background 0.15s ease;
  color: var(--global-text);

  &:hover {
    background: var(--global-secondary-bg);
  }

  & + & {
    border-top: 1px solid var(--global-border);
  }
`;

const AnimatedSearchResultRow = styled(motion.button)<{ $statusColor: string }>`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-left: 3px solid ${({ $statusColor }) => $statusColor || 'transparent'};
  transition: background 0.15s ease;
  color: var(--global-text);

  &:hover {
    background: var(--global-secondary-bg);
  }

  & + & {
    border-top: 1px solid var(--global-border);
  }
`;

const SelectionOverlay = styled.div<{ $selected: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  color: #fff;
  z-index: 2;

  svg {
    width: 1.15rem;
    height: 1.15rem;
    transform: scale(${({ $selected }) => ($selected ? 1 : 0.52)});
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.68rem;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--global-secondary-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--global-border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

const ResultName = styled.span`
  font-size: 0.85rem;
  font-weight: 750;
  color: var(--global-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ResultTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  align-items: center;
`;

const MiniBadge = styled.span`
  padding: 0.1rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.65rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const ViewAllFooter = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: var(--global-secondary-bg);
  color: var(--global-text);
  border: none;
  border-top: 1px solid var(--global-border);
  font-size: 0.8rem;
  font-weight: 750;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: opacity 0.15s ease, background 0.15s ease;

  &:hover {
    background: var(--global-tertiary-bg);
  }
`;

const WatchlistCountBadge = styled.span`
  background: var(--primary-accent);
  color: #fff;
  border-radius: 999px;
  padding: 0rem 0.35rem;
  font-size: 0.65rem;
  font-weight: 800;
  min-width: 1.15rem;
  text-align: center;
`;

const WatchlistText = styled.span`
  font-size: 0.8rem;
  display: inline;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownPanel = styled.div`
  position: absolute;
  top: calc(100% + 0.4rem);
  right: 0;
  width: 24rem;
  max-width: calc(100vw - 1rem);
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 1rem;
  box-shadow: 0 24px 60px var(--global-card-shadow);
  overflow: hidden;
  z-index: 200;
  animation: slideDropdown 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 600px) {
    position: fixed;
    top: 3.9rem;
    right: 0.6rem;
    left: 0.6rem;
    width: auto;
    max-width: none;
  }
`;

const PanelHeader = styled.div`
  padding: 0.75rem 0.9rem;
  border-bottom: 1px solid var(--global-border);
  font-size: 0.72rem;
  font-weight: 750;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-transform: none;
  letter-spacing: normal;
`;

const HeaderActionButton = styled.button<{ $active?: boolean; $danger?: boolean }>`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: ${({ $active, $danger }) => 
    $danger 
      ? ($active ? 'var(--danger-accent, #ef4444)' : 'var(--global-text-muted)') 
      : 'var(--global-text-muted)'};
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 0.72rem;
  font-weight: 750;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    color: ${({ $danger }) => ($danger ? 'var(--danger-accent, #ef4444)' : 'var(--global-text)')};
    background: var(--global-secondary-bg);
  }
`;

const ScrollContainer = styled.div`
  max-height: 25.5rem;
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (max-width: 600px) {
    max-height: 18rem;
  }
`;

const EmptyPanelState = styled.div`
  padding: 1.8rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--global-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.35rem;
    height: 1.35rem;
    opacity: 0.45;
  }
`;

function WatchlistReleaseBadge({ game }: { game: GachaGame }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!game.releaseDate) return;
    const target = game.releaseDateTime
      ? new Date(game.releaseDateTime)
      : new Date(game.releaseDate + 'T00:00:00Z');
    
    if (target.getTime() <= Date.now()) return;

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [game.releaseDate, game.releaseDateTime]);

  if (!game.releaseDate) {
    return <MiniBadge>TBA</MiniBadge>;
  }

  const target = game.releaseDateTime
    ? new Date(game.releaseDateTime)
    : new Date(game.releaseDate + 'T00:00:00Z');

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return (
      <MiniBadge>
        {game.releaseDate ? game.releaseDate.substring(0, 4) : 'TBA'}
      </MiniBadge>
    );
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);

  const countdownText = `${days}D ${hours}H ${mins}M`;

  return (
    <MiniBadge style={{ color: 'var(--primary-accent)', borderColor: 'var(--primary-accent)', fontWeight: 700 }}>
       {countdownText}
    </MiniBadge>
  );
}

export function GachaNavbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { watchlist, toggle } = useWatchlist();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);

  const [isDeletingState, setIsDeletingState] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [localWatchlist, setLocalWatchlist] = useState<string[]>(watchlist);
  const [isAnimatingDelete, setIsAnimatingDelete] = useState(false);

  useEffect(() => {
    if (!isAnimatingDelete) {
      setLocalWatchlist(watchlist);
    }
  }, [watchlist, isAnimatingDelete]);

  useEffect(() => {
    if (!showWatchlist) {
      setIsDeletingState(false);
      setSelectedIds([]);
      setIsAnimatingDelete(false);
    }
  }, [showWatchlist]);

  const handleDeleteConfirm = () => {
    if (selectedIds.length === 0) return;

    setIsAnimatingDelete(true);
    setLocalWatchlist((prev) => prev.filter((id) => !selectedIds.includes(id)));

    setTimeout(() => {
      selectedIds.forEach((id) => {
        toggle(id);
      });
      setSelectedIds([]);
      setIsDeletingState(false);
      setIsAnimatingDelete(false);
    }, 300);
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const watchlistRef = useRef<HTMLDivElement>(null);

  const results: GachaGame[] = query.trim()
    ? getRuntimeGachaGames().filter(
        (g) =>
          g.name.toLowerCase().includes(query.toLowerCase()) ||
          g.genre.some((gen) => gen.toLowerCase().includes(query.toLowerCase())),
      ).slice(0, 6)
    : [];

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setShowWatchlist(false);
    setTimeout(() => searchInputRef.current?.focus(), 60);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery('');
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape') {
        closeSearch();
        setShowWatchlist(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [searchOpen, openSearch, closeSearch]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        watchlistRef.current &&
        !watchlistRef.current.contains(e.target as Node)
      ) {
        setShowWatchlist(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleResultClick = (game: GachaGame) => {
    navigate(`/games?q=${encodeURIComponent(game.name)}`);
    closeSearch();
  };

  const handleViewAllClick = () => {
    navigate(`/games?q=${encodeURIComponent(query)}`);
    closeSearch();
  };

  const watchlistedGames = getRuntimeGachaGames().filter((g) => localWatchlist.includes(g.id));

  return (
    <StyledNavbar>
      <NavInner>
        <Logo to='/'>
          GACHA<span>TRACKER</span>
        </Logo>

        <NavLinks>
          <NavItem to='/' end>
            Home
          </NavItem>
          <NavItem to='/games'>Games</NavItem>
          <NavItem to='/archive'>Archive</NavItem>
          <NavItem to='/news' id="nav-news-link">Latest News</NavItem>
        </NavLinks>

        <RightSection>
          {/* Watchlist Section */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={watchlistRef}>
            <IconButton
              onClick={() => {
                setShowWatchlist((v) => !v);
                closeSearch();
              }}
              title='Watchlist'
              id='nav-watchlist-btn'
            >
              <Bookmark />
              {watchlist.length > 0 ? (
                <WatchlistCountBadge>{watchlist.length}</WatchlistCountBadge>
              ) : (
                <WatchlistText>Watchlist</WatchlistText>
              )}
            </IconButton>

            {showWatchlist && (
              <DropdownPanel>
                <PanelHeader>
                  <span>
                    Watchlist — {watchlist.length} game
                    {watchlist.length !== 1 ? 's' : ''}
                  </span>
                  {watchlist.length > 0 && (
                    <HeaderActions>
                      {isDeletingState ? (
                        <>
                          <HeaderActionButton
                            onClick={() => {
                              setIsDeletingState(false);
                              setSelectedIds([]);
                            }}
                          >
                            Cancel
                          </HeaderActionButton>
                          <HeaderActionButton
                            $danger
                            $active={selectedIds.length > 0}
                            disabled={selectedIds.length === 0}
                            onClick={handleDeleteConfirm}
                            title="Confirm Delete"
                          >
                            <Trash2 size={13} />
                          </HeaderActionButton>
                        </>
                      ) : (
                        <HeaderActionButton
                          onClick={() => {
                            setIsDeletingState(true);
                            setSelectedIds([]);
                          }}
                          title="Enter edit mode"
                        >
                          <Trash2 size={13} />
                        </HeaderActionButton>
                      )}
                    </HeaderActions>
                  )}
                </PanelHeader>
                {watchlistedGames.length === 0 ? (
                  <EmptyPanelState>
                     <Bookmark />
                     <span>No followed games yet</span>
                  </EmptyPanelState>
                ) : (
                  <ScrollContainer>
                    <AnimatePresence initial={false}>
                      {watchlistedGames.map((g) => {
                        const isSelected = selectedIds.includes(g.id);
                        return (
                          <AnimatedSearchResultRow
                            key={g.id}
                            $statusColor={statusColors[g.status]}
                            initial={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.9, padding: 0, borderLeftWidth: 0, overflow: 'hidden' }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            onClick={() => {
                              if (isDeletingState) {
                                setSelectedIds((prev) =>
                                  prev.includes(g.id)
                                    ? prev.filter((id) => id !== g.id)
                                    : [...prev, g.id]
                                );
                              } else {
                                navigate(`/game/${g.id}`);
                                setShowWatchlist(false);
                              }
                            }}
                            style={{ overflow: 'hidden' }}
                          >
                            <ImageContainer>
                              <SelectionOverlay $selected={isDeletingState && isSelected}>
                                <Check size={16} strokeWidth={3.5} />
                              </SelectionOverlay>
                              {g.profileImage ? (
                                <img
                                  src={g.profileImage}
                                  alt={g.name}
                                  referrerPolicy="no-referrer"
                                  style={{
                                    filter: isDeletingState && isSelected ? 'grayscale(100%) opacity(0.4)' : 'none',
                                  }}
                                />
                              ) : (
                                <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                                  {g.iconInitials ?? g.name.slice(0, 2).toUpperCase()}
                                </span>
                              )}
                            </ImageContainer>
                            <ResultContent>
                              <ResultName>{g.name}</ResultName>
                              <ResultTagRow>
                                <WatchlistReleaseBadge game={g} />
                                {g.genre.map((gen, idx) => (
                                  <MiniBadge key={idx}>{gen}</MiniBadge>
                                ))}
                                <MiniBadge>
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      width: '4px',
                                      height: '4px',
                                      borderRadius: '50%',
                                      backgroundColor: statusColors[g.status],
                                    }}
                                  />
                                  {g.status === 'Released'
                                    ? 'Released'
                                    : g.status === 'Pre-registration'
                                    ? 'Pre-reg'
                                    : 'Dev'}
                                </MiniBadge>
                              </ResultTagRow>
                            </ResultContent>
                          </AnimatedSearchResultRow>
                        );
                      })}
                    </AnimatePresence>
                  </ScrollContainer>
                )}
              </DropdownPanel>
            )}
          </div>

          {/* Search Section */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={dropdownRef}>
            <SearchWrapper $open={searchOpen}>
              <SearchIconPrefix>
                <Search />
              </SearchIconPrefix>
              <SearchInput
                ref={searchInputRef}
                $open={searchOpen}
                placeholder='Search Games'
                value={query}
                onChange={handleInputChange}
                onFocus={() => query && setShowDropdown(true)}
                aria-label='Search Games'
              />
              {query && (
                <SearchClearBtn onClick={() => setQuery('')} tabIndex={-1} aria-label='Clear search'>
                  <X />
                </SearchClearBtn>
              )}
            </SearchWrapper>

            {!searchOpen ? (
              <SearchToggleBtn onClick={openSearch} title='Search (Ctrl+K)' id='nav-search-toggle-btn'>
                <Search />
                <ShortcutHint>Ctrl K</ShortcutHint>
              </SearchToggleBtn>
            ) : (
              <SearchToggleBtn onClick={closeSearch} title='Close search' id='nav-search-toggle-btn'>
                <X />
              </SearchToggleBtn>
            )}

            {showDropdown && query && (
              <SearchDropdownGrid>
                {results.length > 0 ? (
                  <>
                    <ScrollContainer>
                      {results.map((g) => (
                        <SearchResultRow
                          key={g.id}
                          $statusColor={statusColors[g.status]}
                          onClick={() => handleResultClick(g)}
                        >
                          <ImageContainer>
                            {g.profileImage ? (
                              <img src={g.profileImage} alt={g.name} referrerPolicy="no-referrer" />
                            ) : (
                              <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>
                                {g.iconInitials ?? g.name.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </ImageContainer>
                          <ResultContent>
                            <ResultName>{g.name}</ResultName>
                            <ResultTagRow>
                              <MiniBadge>
                                {g.releaseDate ? g.releaseDate.substring(0, 4) : 'TBA'}
                              </MiniBadge>
                              {g.genre.map((gen, idx) => (
                                <MiniBadge key={idx}>{gen}</MiniBadge>
                              ))}
                              <MiniBadge>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    backgroundColor: statusColors[g.status],
                                  }}
                                />
                                {g.status === 'Released'
                                  ? 'Released'
                                  : g.status === 'Pre-registration'
                                  ? 'Pre-reg'
                                  : 'Dev'}
                              </MiniBadge>
                            </ResultTagRow>
                          </ResultContent>
                        </SearchResultRow>
                      ))}
                    </ScrollContainer>
                    <ViewAllFooter onClick={handleViewAllClick}>
                      VIEW ALL <ArrowRight size={14} />
                    </ViewAllFooter>
                  </>
                ) : (
                  <EmptyPanelState>No games found for "{query}"</EmptyPanelState>
                )}
              </SearchDropdownGrid>
            )}
          </div>

          {/* Theme Toggle Button */}
          <IconButton onClick={toggleTheme} title='Toggle theme' id='nav-theme-toggle-btn'>
            {isDarkMode ? <Sun /> : <Moon />}
          </IconButton>
        </RightSection>
      </NavInner>
    </StyledNavbar>
  );
}
