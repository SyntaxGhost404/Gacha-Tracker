import { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiSearch, FiX, FiFilter, FiChevronDown, FiArrowLeft } from 'react-icons/fi';
import { Calendar } from 'lucide-react';
import {
  type Platform,
  type Region,
  getRuntimeGachaGames,
} from '../../data/gachaGames';
import { GameCard } from '../../components/gacha/GameCard';

const PageWrapper = styled.div`
  padding-top: 0;
  min-height: 100vh;
  background: var(--global-primary-bg);
`;

const PageInner = styled.div`
  max-width: 78rem;
  margin: 0 auto;
  padding: 1.5rem 2rem 3.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem 0.85rem 2rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 1.75rem;
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
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 850;
  color: var(--global-text);
  letter-spacing: -0.035em;
  margin: 0 0 0.4rem;
`;

const PageSubtitle = styled.p`
  max-width: 46rem;
  font-size: 0.96rem;
  color: var(--global-text-muted);
  margin: 0 0 0.85rem;
  line-height: 1.6;
`;

const HeaderBox = styled.div`
  padding: 0.9rem 1rem;
  background: linear-gradient(135deg, color-mix(in srgb, var(--secondary-accent) 8%, var(--global-card-bg)), var(--global-card-bg));
  border-radius: var(--radius-md);
  border: 1px solid var(--global-border);
  font-size: 0.82rem;
  color: var(--global-text-muted);
  line-height: 1.55;

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
  margin-bottom: 0.65rem;
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
  padding: 0.82rem 2.75rem 0.82rem 2.5rem;
  border-radius: 0.8rem;
  border: 1px solid var(--global-border);
  background: var(--global-card-bg);
  color: var(--global-text);
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-shadow: var(--shadow-sm);

  &::placeholder {
    color: var(--global-text-muted);
  }

  &:focus {
    border-color: color-mix(in srgb, var(--primary-accent) 65%, var(--global-border));
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-accent) 12%, transparent);
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
  padding: 0.55rem 0.95rem;
  border-radius: 0.7rem;
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
  border-radius: var(--radius-md);
  padding: 1rem 1.1rem;
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
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary-accent)' : 'var(--global-border)')};
  background: ${({ $active }) => ($active ? 'var(--primary-accent)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--global-text-muted)')};

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
  margin-bottom: 2.5rem;
`;

const SectionHeader = styled.div<{ $accent: string }>`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
`;

const SectionIconBox = styled.div<{ $accent: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.65rem;
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
  font-size: 1.18rem;
  font-weight: 700;
  color: var(--global-text);
  margin: 0;
`;

const SectionBadge = styled.span<{ $accent: string }>`
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ $accent }) => $accent}22;
  color: ${({ $accent }) => $accent};
  border: 1px solid ${({ $accent }) => $accent}44;
`;

const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  > article:only-child {
    grid-column: 1 / -1;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3.5rem 1rem;
  color: var(--global-text-muted);
  font-size: 0.88rem;
  border: 1px dashed var(--global-border);
  border-radius: var(--radius-lg);
  background: var(--global-card-bg);
`;

const PLATFORMS: (Platform | 'All')[] = ['All', 'Android', 'iOS', 'PC', 'PS5', 'Switch'];
const REGIONS: (Region | 'All')[] = ['All', 'Global', 'JP', 'CN', 'KR', 'NA', 'EU', 'SEA'];
const SORT_OPTIONS = [
  { value: 'none', label: 'No Sorting' },
  { value: 'name-asc', label: 'Name A → Z' },
  { value: 'name-desc', label: 'Name Z → A' },
  { value: 'date-desc', label: 'Release Date (Newest First)' },
  { value: 'date-asc', label: 'Release Date (Oldest First)' },
];

type SortOption = 'none' | 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc';

export function ArchivePage() {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<Platform | 'All'>('All');
  const [region, setRegion] = useState<Region | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('none');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

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

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const releasedGames = useMemo(() => {
    return getRuntimeGachaGames(now).filter((g) => g.status === 'Released');
  }, [now]);

  const isFiltered = query || platform !== 'All' || region !== 'All';

  const resetFilters = () => {
    setQuery('');
    setPlatform('All');
    setRegion('All');
    setSort('none');
  };

  const filtered = useMemo(() => {
    let list = releasedGames.filter((g) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.genre.some((gen) => gen.toLowerCase().includes(q)) ||
        (g.alternativeName || '').toLowerCase().includes(q);
      const matchP = platform === 'All' || g.platforms.includes(platform);
      const matchR = region === 'All' || g.regions.includes(region);
      return matchQ && matchP && matchR;
    });

    if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') list = [...list].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'date-desc') {
      list = [...list].sort((a, b) => {
        if (a.releaseDate && b.releaseDate) return b.releaseDate.localeCompare(a.releaseDate);
        if (a.releaseDate) return -1;
        if (b.releaseDate) return 1;
        return 0;
      });
    }
    if (sort === 'date-asc') {
      list = [...list].sort((a, b) => {
        if (a.releaseDate && b.releaseDate) return a.releaseDate.localeCompare(b.releaseDate);
        if (a.releaseDate) return -1;
        if (b.releaseDate) return 1;
        return 0;
      });
    }
    return list;
  }, [releasedGames, query, platform, region, sort]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'No Sorting';

  return (
    <PageWrapper>
      <PageInner>
        <PageHeader>
          <BackLink to="/">
            <FiArrowLeft size={12} /> Back to Dashboard
          </BackLink>
          <PageTitle>Released Games Archive</PageTitle>
          <PageSubtitle>
            A consolidated index of gacha games that have already launched and are fully playable globally or regionally.
          </PageSubtitle>
          <HeaderBox>
            Looking for upcoming and pre-registration titles? Check out the active tracking list on the{' '}
            <Link to="/games">Upcoming Games</Link> page.
          </HeaderBox>
        </PageHeader>

        <SearchRow>
          <SearchIcon>
            <FiSearch size={14} />
          </SearchIcon>
          <SearchInput
            ref={searchRef}
            placeholder='Search released games...'
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
            $active={filtersOpen || (platform !== 'All' || region !== 'All')}
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
            {filtered.length === releasedGames.length
              ? `Showing all ${filtered.length} released games`
              : `Showing ${filtered.length} of ${releasedGames.length} released games`}
          </ResultsCount>
          {isFiltered && (
            <ResetBtn onClick={resetFilters}>
              <FiX size={12} /> Reset
            </ResetBtn>
          )}
        </ResultsMeta>

        {filtered.length === 0 ? (
          <EmptyState>No released games found matching your filters.</EmptyState>
        ) : (
          <SectionBlock>
            <SectionHeader $accent='#22c55e'>
              <SectionIconBox $accent='#22c55e'><Calendar size={14} /></SectionIconBox>
              <SectionTitle>Released Titles</SectionTitle>
              <SectionBadge $accent='#22c55e'>{filtered.length}</SectionBadge>
            </SectionHeader>
            <GameList>
              {filtered.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </GameList>
          </SectionBlock>
        )}
      </PageInner>
    </PageWrapper>
  );
}
