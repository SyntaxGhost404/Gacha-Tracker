import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiX, FiFilter, FiChevronDown, FiArrowLeft } from 'react-icons/fi';
import { Calendar } from 'lucide-react';
import {
  gachaGames,
  type Platform,
  type Region,
  type GameStatus,
} from '../../data/gachaGames';
import { GameCard } from '../../components/gacha/GameCard';

const PageWrapper = styled.div`
  padding-top: 0;
  min-height: 100vh;
  background: var(--global-primary-bg);
`;

const PageInner = styled.div`
  max-width: 52rem;
  margin: 0 auto;
  padding: 0.5rem 1rem 2rem;

  @media (max-width: 600px) {
    padding: 0.25rem 0.75rem 1.5rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--global-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
  margin-bottom: 0.25rem;

  &:hover {
    color: var(--global-text);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 800;
  color: var(--global-text);
  letter-spacing: -0.035em;
  margin: 0 0 0.4rem;
`;

const PageSubtitle = styled.p`
  font-size: 0.88rem;
  color: var(--global-text-muted);
  margin: 0 0 0.85rem;
  line-height: 1.6;
`;

const FeedbackBox = styled.div`
  padding: 0.75rem 1rem;
  background: var(--global-card-bg);
  border-radius: 0.4rem;
  border: 1px solid var(--global-border);
  font-size: 0.82rem;
  color: var(--global-text-muted);
  line-height: 1.55;

  .mobile-only {
    display: inline;
    @media (min-width: 601px) {
      display: none;
    }
  }

  .desktop-only {
    display: none;
    @media (min-width: 601px) {
      display: inline;
    }
  }

  a {
    color: var(--global-text);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SearchRow = styled.div`
  position: relative;
  margin-bottom: 0.75rem;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--global-text-muted);
  pointer-events: none;
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.65rem 2.5rem 0.65rem 2.4rem;
  border-radius: 0.4rem;
  border: 1px solid var(--global-border);
  background: var(--global-card-bg);
  color: var(--global-text);
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: var(--global-text-muted);
  }

  &:focus {
    border-color: var(--global-text-muted);
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--global-text-muted);
  cursor: pointer;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  transition: color 0.15s ease;

  &:hover {
    color: var(--global-text);
  }
`;

const ControlRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const ControlBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 0.35rem;
  border: 1px solid ${({ $active }) => ($active ? 'var(--global-text-muted)' : 'var(--global-border)')};
  background: ${({ $active }) => ($active ? 'var(--global-secondary-bg)' : 'var(--global-card-bg)')};
  color: var(--global-text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--global-text-muted);
    background: var(--global-secondary-bg);
    color: var(--global-text);
  }
`;

const FilterPanel = styled.div`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.4rem;
  padding: 0.85rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: slideDown 0.2s ease;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const FilterLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding-top: 0.2rem;
  white-space: nowrap;
  min-width: 3.5rem;
`;

const PillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const Pill = styled.button<{ $active: boolean }>`
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
  border: 1px solid ${({ $active }) => ($active ? 'var(--global-text)' : 'var(--global-border)')};
  background: ${({ $active }) => ($active ? 'var(--global-text)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--global-primary-bg)' : 'var(--global-text-muted)')};

  &:hover {
    border-color: var(--global-text-muted);
    color: var(--global-text);
  }
`;

const SortPill = styled(Pill)``;

const ResultsMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ResultsCount = styled.span`
  font-size: 0.8rem;
  color: var(--global-text-muted);
`;

const ResetBtn = styled.button`
  font-size: 0.78rem;
  color: var(--global-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  transition: color 0.15s ease;
  padding: 0;

  &:hover {
    color: var(--global-text);
  }
`;

const SectionBlock = styled.section`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
`;

const SectionIconBox = styled.div<{ $accent: string }>`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.3rem;
  background: ${({ $accent }) => $accent}22;
  border: 1px solid ${({ $accent }) => $accent}44;
  color: ${({ $accent }) => $accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--global-text);
  margin: 0;
`;

const SectionBadge = styled.span<{ $accent: string }>`
  padding: 0.15rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ $accent }) => $accent}22;
  color: ${({ $accent }) => $accent};
  border: 1px solid ${({ $accent }) => $accent}44;
`;

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3.5rem 1rem;
  color: var(--global-text-muted);
  font-size: 0.88rem;
`;

const PLATFORMS: (Platform | 'All')[] = ['All', 'Android', 'iOS', 'PC', 'PS5', 'Switch'];
const STATUSES: (GameStatus | 'All')[] = ['All', 'Released', 'Pre-registration', 'In Development', 'Announced'];
const REGIONS: (Region | 'All')[] = ['All', 'Global', 'JP', 'CN', 'KR', 'NA', 'EU', 'SEA'];
const SORT_OPTIONS = [
  { value: 'none', label: 'No Sorting' },
  { value: 'name-asc', label: 'Name A → Z' },
  { value: 'name-desc', label: 'Name Z → A' },
  { value: 'date-asc', label: 'Release Date' },
];

type SortOption = 'none' | 'name-asc' | 'name-desc' | 'date-asc';

export function GamesPage() {
  const [searchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [platform, setPlatform] = useState<Platform | 'All'>('All');
  const [status, setStatus] = useState<GameStatus | 'All'>(
    () => (searchParams.get('status') as GameStatus) || 'All',
  );
  const [region, setRegion] = useState<Region | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('none');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const isFiltered = query || platform !== 'All' || status !== 'All' || region !== 'All';

  const resetFilters = () => {
    setQuery('');
    setPlatform('All');
    setStatus('All');
    setRegion('All');
    setSort('none');
  };

  const filtered = useMemo(() => {
    let list = gachaGames.filter((g) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.genre.toLowerCase().includes(q) ||
        (g.alternativeName || '').toLowerCase().includes(q);
      const matchP = platform === 'All' || g.platforms.includes(platform);
      const matchS = status === 'All' || g.status === status;
      const matchR = region === 'All' || g.regions.includes(region);
      return matchQ && matchP && matchS && matchR;
    });

    if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'date-asc') {
      list = [...list].sort((a, b) => {
        if (a.releaseDate && b.releaseDate) return a.releaseDate.localeCompare(b.releaseDate);
        if (a.releaseDate) return -1;
        if (b.releaseDate) return 1;
        return 0;
      });
    }
    return list;
  }, [query, platform, status, region, sort]);

  const withDates = filtered.filter((g) => g.releaseDate);
  const withoutDates = filtered.filter((g) => !g.releaseDate);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'No Sorting';

  return (
    <PageWrapper>
      <PageInner>
        <PageHeader>
          <BackLink to="/">
            <FiArrowLeft size={12} /> Back to Dashboard
          </BackLink>
          <PageTitle>Upcoming Gacha Games</PageTitle>
          <PageSubtitle>
            Discover upcoming gacha games, pre-registration titles, and games in development.
          </PageSubtitle>
          <FeedbackBox>
            <span className="mobile-only">Noticed any inconsistencies or want to add a new game to the list? Feel free to drop one at </span>
            <span className="desktop-only">Our upcoming titles database is completely community-driven. If you've discovered any missing gacha games, outdated release schedules, or platform details, we invite you to help us maintain a pristine and accurate record by submitting updates via our </span>
            <Link to="/feedback" id="games-feedback-link">
              <span className="mobile-only">feedback page</span>
              <span className="desktop-only">community feedback and submissions page</span>
            </Link>
          </FeedbackBox>
        </PageHeader>

        <SearchRow>
          <SearchIcon>
            <FiSearch size={14} />
          </SearchIcon>
          <SearchInput
            ref={searchRef}
            placeholder='Search games, developers, publishers...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <ClearBtn onClick={() => setQuery('')}>
              <FiX size={14} />
            </ClearBtn>
          )}
        </SearchRow>

        <ControlRow>
          <ControlBtn
            $active={filtersOpen || (platform !== 'All' || region !== 'All' || status !== 'All')}
            onClick={() => { setFiltersOpen((v) => !v); setSortOpen(false); }}
          >
            <FiFilter size={13} />
            Filters
            <FiChevronDown
              size={12}
              style={{ transform: filtersOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </ControlBtn>
          <ControlBtn
            $active={sortOpen || sort !== 'none'}
            onClick={() => { setSortOpen((v) => !v); setFiltersOpen(false); }}
          >
            ↕ Sort: {currentSortLabel}
            <FiChevronDown
              size={12}
              style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </ControlBtn>
        </ControlRow>

        {filtersOpen && (
          <FilterPanel>
            <FilterGroup>
              <FilterLabel>Platform</FilterLabel>
              <PillGroup>
                {PLATFORMS.map((p) => (
                  <Pill
                    key={p}
                    $active={platform === p}
                    onClick={() => setPlatform(p as Platform | 'All')}
                  >
                    {p}
                  </Pill>
                ))}
              </PillGroup>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Status</FilterLabel>
              <PillGroup>
                {STATUSES.map((s) => (
                  <Pill
                    key={s}
                    $active={status === s}
                    onClick={() => setStatus(s as GameStatus | 'All')}
                  >
                    {s}
                  </Pill>
                ))}
              </PillGroup>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Region</FilterLabel>
              <PillGroup>
                {REGIONS.map((r) => (
                  <Pill
                    key={r}
                    $active={region === r}
                    onClick={() => setRegion(r as Region | 'All')}
                  >
                    {r}
                  </Pill>
                ))}
              </PillGroup>
            </FilterGroup>
          </FilterPanel>
        )}

        {sortOpen && (
          <FilterPanel>
            <FilterGroup>
              <FilterLabel>Sort by</FilterLabel>
              <PillGroup>
                {SORT_OPTIONS.map((o) => (
                  <SortPill
                    key={o.value}
                    $active={sort === o.value}
                    onClick={() => { setSort(o.value as SortOption); setSortOpen(false); }}
                  >
                    {o.label}
                  </SortPill>
                ))}
              </PillGroup>
            </FilterGroup>
          </FilterPanel>
        )}

        <ResultsMeta>
          <ResultsCount>
            {filtered.length === gachaGames.length
              ? `Showing all ${filtered.length} games`
              : `Showing ${filtered.length} of ${gachaGames.length} games`}
          </ResultsCount>
          {isFiltered && (
            <ResetBtn onClick={resetFilters}>
              <FiX size={12} /> Reset
            </ResetBtn>
          )}
        </ResultsMeta>

        {filtered.length === 0 ? (
          <EmptyState>No games found matching your filters.</EmptyState>
        ) : (
          <>
            {withDates.length > 0 && (
              <SectionBlock>
                <SectionHeader $accent='#4a9eff'>
                  <SectionIconBox $accent='#4a9eff'><Calendar size={14} /></SectionIconBox>
                  <SectionTitle>Games with Release Dates</SectionTitle>
                  <SectionBadge $accent='#4a9eff'>{withDates.length}</SectionBadge>
                </SectionHeader>
                <GameList>
                  {withDates.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </GameList>
              </SectionBlock>
            )}

            {withoutDates.length > 0 && (
              <SectionBlock>
                <SectionHeader $accent='#f59e0b'>
                  <SectionIconBox $accent='#f59e0b'><Calendar size={14} /></SectionIconBox>
                  <SectionTitle>Games without Release Dates</SectionTitle>
                  <SectionBadge $accent='#f59e0b'>{withoutDates.length}</SectionBadge>
                </SectionHeader>
                <GameList>
                  {withoutDates.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </GameList>
              </SectionBlock>
            )}
          </>
        )}
      </PageInner>
    </PageWrapper>
  );
}
