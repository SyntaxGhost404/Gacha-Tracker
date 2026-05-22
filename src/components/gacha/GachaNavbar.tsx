import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiSearch, FiX, FiBookmark, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';
import { useWatchlist } from '../../context/WatchlistContext';
import { gachaGames, statusColors, type GachaGame } from '../../data/gachaGames';

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  height: 3.5rem;
  background-color: var(--global-primary-bg-tr);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--global-border);
  z-index: 100;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease;

  @media (max-width: 600px) {
    padding: 0 0.75rem;
  }
`;

const NavInner = styled.div`
  max-width: 105rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled(Link)`
  font-size: 1rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.02em;
  color: var(--global-text);
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.2s ease;

  span {
    color: var(--primary-accent);
  }

  &:hover {
    opacity: 0.8;
  }
`;

const WatchlistImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--global-secondary-bg);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WatchlistTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  padding: 0.35rem 0.75rem;
  border-radius: var(--global-border-radius);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--global-text-muted);
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    color: var(--global-text);
    background: var(--global-secondary-bg);
  }

  &.active {
    color: var(--global-text);
    background: var(--global-secondary-bg);
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchWrapper = styled.div<{ $open: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    ${({ $open }) => !$open && 'display: none;'}
    position: fixed;
    top: 3.5rem;
    left: 0;
    right: 0;
    padding: 0.5rem;
    background: var(--global-primary-bg);
    z-index: 150;
    border-bottom: 1px solid var(--global-border);
  }
`;

const SearchInput = styled.input<{ $open: boolean }>`
  width: ${({ $open }) => ($open ? '14rem' : '0')};
  padding: ${({ $open }) => ($open ? '0.4rem 2.5rem 0.4rem 0.8rem' : '0.4rem 0')};
  border-radius: var(--global-border-radius);
  border: 1px solid var(--global-border);
  background: var(--global-secondary-bg);
  color: var(--global-text);
  font-size: 0.8rem;
  outline: none;
  overflow: hidden;
  transition: width 0.25s ease, padding 0.25s ease, border-color 0.2s ease;

  &::placeholder {
    color: var(--global-text-muted);
  }

  &:focus {
    border-color: var(--global-text-muted);
  }

  @media (min-width: 601px) {
    width: 16rem;
    padding: 0.4rem 2.5rem 0.4rem 2rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    background: var(--global-secondary-bg);
    color: var(--global-text);
    padding: 0.75rem 2.5rem 0.75rem 2.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--global-border);
    &::placeholder {
      color: var(--global-text-muted);
    }
  }
`;

const MobileSearchIcon = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    position: absolute;
    left: 1.25rem;
    color: var(--global-text-muted);
    pointer-events: none;
  }
`;

const DesktopSearchIcon = styled.div`
  display: flex;
  position: absolute;
  left: 0.65rem;
  color: var(--global-text-muted);
  pointer-events: none;

  @media (max-width: 600px) {
    display: none;
  }
`;

const SearchClearBtn = styled.button`
  position: absolute;
  right: 0.4rem;
  background: none;
  border: none;
  color: var(--global-text-muted);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s ease;

  &:hover {
    color: var(--global-text);
  }

  @media (max-width: 600px) {
    right: 1.25rem;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 22rem;
  max-width: calc(100vw - 1rem);
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px var(--global-card-shadow);
  overflow: hidden;
  animation: slideDown 0.2s ease;
  z-index: 200;

  @media (max-width: 600px) {
    position: fixed;
    top: calc(3.5rem + 3.5rem + 0.5rem);
    right: 0.5rem;
    left: 0.5rem;
    width: auto;
    max-width: calc(100vw - 1rem);
    border-radius: 0.5rem;
  }
`;

const SearchResult = styled.button<{ $statusColor: string }>`
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  border-left: 3px solid ${({ $statusColor }) => $statusColor};
  transition: background 0.15s ease;
  color: var(--global-text);

  &:hover {
    background: var(--global-secondary-bg);
  }

  & + & {
    border-top: 1px solid var(--global-border);
  }
`;

const ResultImageContainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  background: #131313;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ResultName = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--global-text);
`;

const ResultTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
`;

const ResultTag = styled.span`
  padding: 0.18rem 0.45rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ViewAllBtn = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: var(--global-secondary-bg);
  color: var(--global-text);
  border: none;
  border-top: 1px solid var(--global-border);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--global-text-muted);
`;

const IconBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: var(--global-border-radius);
  border: 1px solid var(--global-border);
  background: var(--global-button-bg);
  color: var(--global-text);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.15s ease;
  white-space: nowrap;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: var(--global-button-hover-bg);
  }
`;

const SearchToggleBtn = styled(IconBtn)`
  @media (min-width: 601px) {
    display: none;
  }
`;

const WatchlistCount = styled.span`
  background: var(--global-text);
  color: var(--global-primary-bg);
  border-radius: 999px;
  padding: 0.05rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 1.2rem;
  text-align: center;
`;

const ShortcutHint = styled.span`
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border-radius: 0.2rem;
  background: var(--global-tertiary-bg);
  border: 1px solid var(--global-border);
  color: var(--global-text-muted);
  font-family: monospace;

  @media (max-width: 900px) {
    display: none;
  }
`;

const WatchlistPanel = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 22rem;
  max-width: calc(100vw - 1rem);
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: var(--global-border-radius);
  box-shadow: 0 8px 24px var(--global-card-shadow);
  overflow: hidden;
  animation: slideDown 0.2s ease;
  z-index: 200;

  @media (max-width: 600px) {
    position: fixed;
    top: 3.5rem;
    right: 0.5rem;
    left: 0.5rem;
    width: auto;
    max-width: 100%;
  }
`;

const WatchlistHeader = styled.div`
  padding: 0.75rem 0.85rem;
  border-bottom: 1px solid var(--global-border);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const WatchlistItem = styled.div<{ $statusColor: string }>`
  padding: 0.65rem 0.85rem;
  border-left: 3px solid ${({ $statusColor }) => $statusColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  transition: background 0.15s ease;
  color: var(--global-text);

  &:hover {
    background: var(--global-secondary-bg);
  }

  & + & {
    border-top: 1px solid var(--global-border);
  }
`;

const EmptyWatchlist = styled.div`
  padding: 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--global-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.5rem;
    opacity: 0.4;
  }
`;

const WatchlistItemsContainer = styled.div`
  max-height: 25.8rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--global-border) transparent;

  /* Custom Scrollbar for Webkit */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--global-border);
    border-radius: 3px;
    transition: background 0.15s ease;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--global-text-muted);
  }

  @media (max-width: 600px) {
    max-height: 17.2rem;
  }
`;

export function GachaNavbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const watchlistRef = useRef<HTMLDivElement>(null);

  const results: GachaGame[] = query.trim()
    ? gachaGames.filter(
        (g) =>
          g.name.toLowerCase().includes(query.toLowerCase()) ||
          g.genre.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 6)
    : [];

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setShowWatchlist(false);
    setTimeout(() => searchRef.current?.focus(), 50);
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

  const watchlistedGames = gachaGames.filter((g) => watchlist.includes(g.id));

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
          <NavItem to='/news' id="nav-news-link">Latest News</NavItem>
        </NavLinks>

        <Spacer />

        <RightSection>
          <div style={{ position: 'relative' }} ref={watchlistRef}>
            <IconBtn
              onClick={() => {
                setShowWatchlist((v) => !v);
                closeSearch();
              }}
              title='Watchlist'
            >
              <FiBookmark />
              {watchlist.length > 0 ? (
                <WatchlistCount>{watchlist.length}</WatchlistCount>
              ) : (
                <span style={{ fontSize: '0.8rem' }}>Watchlist</span>
              )}
            </IconBtn>

            {showWatchlist && (
              <WatchlistPanel>
                <WatchlistHeader>
                  Watchlist — {watchlist.length} game
                  {watchlist.length !== 1 ? 's' : ''}
                </WatchlistHeader>
                {watchlistedGames.length === 0 ? (
                  <EmptyWatchlist>
                    <FiBookmark />
                    <span>No games followed yet</span>
                  </EmptyWatchlist>
                ) : (
                  <WatchlistItemsContainer>
                    {watchlistedGames.map((g) => (
                      <WatchlistItem
                        key={g.id}
                        $statusColor={statusColors[g.status]}
                      >
                        <WatchlistImageContainer>
                          {g.profileImage ? (
                            <img src={g.profileImage} alt={g.name} />
                          ) : (
                            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                              {g.iconInitials ?? g.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </WatchlistImageContainer>
                        <ResultContent>
                          <ResultName>{g.name}</ResultName>
                          <WatchlistTags>
                            <ResultTag>
                              {g.releaseDate ? g.releaseDate.substring(0, 4) : 'TBA'}
                            </ResultTag>
                            <ResultTag>{g.genre}</ResultTag>
                            <ResultTag>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  backgroundColor: statusColors[g.status],
                                }}
                              />
                              {g.status === 'Released'
                                ? 'Released'
                                : g.status === 'Pre-registration'
                                ? 'Pre-reg'
                                : 'Dev'}
                            </ResultTag>
                          </WatchlistTags>
                        </ResultContent>
                      </WatchlistItem>
                    ))}
                  </WatchlistItemsContainer>
                )}
              </WatchlistPanel>
            )}
          </div>

          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <SearchWrapper $open={searchOpen}>
              <MobileSearchIcon>
                <FiSearch size={16} />
              </MobileSearchIcon>
              <DesktopSearchIcon>
                <FiSearch size={14} />
              </DesktopSearchIcon>
              <SearchInput
                ref={searchRef}
                $open={searchOpen}
                placeholder='Search Games'
                value={query}
                onChange={handleInputChange}
                onFocus={() => query && setShowDropdown(true)}
                aria-label='Search Games'
              />
              {query && (
                <SearchClearBtn onClick={() => setQuery('')} tabIndex={-1}>
                  <FiX size={16} />
                </SearchClearBtn>
              )}
            </SearchWrapper>

            {!searchOpen ? (
              <SearchToggleBtn onClick={openSearch} title='Search (Ctrl+K)'>
                <FiSearch />
                <ShortcutHint>Ctrl K</ShortcutHint>
              </SearchToggleBtn>
            ) : (
              <SearchToggleBtn onClick={closeSearch} title='Close search'>
                <FiX />
              </SearchToggleBtn>
            )}

            {showDropdown && query && (
              <SearchDropdown>
                {results.length > 0 ? (
                  <>
                    {results.map((g) => (
                      <SearchResult
                        key={g.id}
                        $statusColor={statusColors[g.status]}
                        onClick={() => handleResultClick(g)}
                      >
                        <ResultImageContainer>
                          {g.profileImage ? (
                            <img src={g.profileImage} alt={g.name} />
                          ) : (
                            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                              {g.iconInitials ?? g.name.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </ResultImageContainer>
                        <ResultContent>
                          <ResultName>{g.name}</ResultName>
                          <ResultTags>
                            <ResultTag>
                              {g.releaseDate ? g.releaseDate.substring(0, 4) : 'TBA'}
                            </ResultTag>
                            <ResultTag>{g.genre}</ResultTag>
                            <ResultTag>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '5px',
                                  height: '5px',
                                  borderRadius: '50%',
                                  backgroundColor: statusColors[g.status],
                                }}
                              />
                              {g.status === 'Released'
                                ? 'Released'
                                : g.status === 'Pre-registration'
                                ? 'Pre-reg'
                                : 'Dev'}
                            </ResultTag>
                          </ResultTags>
                        </ResultContent>
                      </SearchResult>
                    ))}
                    <ViewAllBtn onClick={handleViewAllClick}>
                      VIEW ALL <FiArrowRight size={16} />
                    </ViewAllBtn>
                  </>
                ) : (
                  <NoResults>No games found for "{query}"</NoResults>
                )}
              </SearchDropdown>
            )}
          </div>

          <IconBtn onClick={toggleTheme} title='Toggle theme'>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </IconBtn>
        </RightSection>
      </NavInner>
    </StyledNavbar>
  );
}
