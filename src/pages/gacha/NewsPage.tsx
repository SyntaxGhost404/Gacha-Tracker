import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FiSearch, FiX, FiCalendar, FiArrowLeft, FiFilter, FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { newsItems } from '../../data/newsData';

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
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 850;
  color: var(--global-text);
  letter-spacing: -0.035em;
  margin: 0 0 0.4rem;
`;

const PageSubtitle = styled.p`
  max-width: 44rem;
  font-size: 0.96rem;
  color: var(--global-text-muted);
  margin: 0 0 0.85rem;
  line-height: 1.6;
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
  margin-bottom: 0.85rem;
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.article`
  background: var(--global-card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--global-border);
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-height: 100%;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--primary-accent) 42%, var(--global-border));
    box-shadow: var(--shadow-lg), var(--glow-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-accent);
    outline-offset: 3px;
  }
`;

const NewsBanner = styled.div<{ $color: string; $image?: string }>`
  position: relative;
  height: 13rem;
  background-color: ${({ $color }) => $color};
  ${({ $image }) =>
    $image &&
    `
    background-image: url(${$image});
    background-size: cover;
    background-position: center top;
  `}
  overflow: hidden;
  filter: saturate(0.65) brightness(0.86);
  transition: filter 0.4s ease;

  ${NewsCard}:hover & {
    filter: saturate(1.05) brightness(1);
  }

  @media (max-width: 600px) {
    height: 8.5rem;
  }
`;

const NewsBannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.04) 30%, rgba(4,5,12,0.7) 100%);
`;

const NewsBannerBadgesLeft = styled.div`
  position: absolute;
  top: 0.6rem;
  left: 0.65rem;
  display: flex;
  gap: 0.35rem;
`;

const NewsBannerBadgesRight = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.65rem;
  display: flex;
  gap: 0.35rem;
`;

const NewsBannerBadge = styled.span<{ $accent?: string }>`
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  background: ${({ $accent }) => $accent || 'rgba(0, 0, 0, 0.65)'};
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  white-space: nowrap;
`;

const NewsCardBody = styled.div`
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const NewsHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

const NewsTitleText = styled.h3`
  margin: 0;
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--global-text);
  line-height: 1.35;
`;

const NewsSubtitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--global-text-muted);

  svg {
    opacity: 0.6;
    flex-shrink: 0;
  }
`;

const NewsTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
`;

const NewsBadgeTag = styled.span`
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const NewsCategoryTag = styled.span`
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  background: color-mix(in srgb, var(--primary-accent) 10%, transparent);
  color: var(--primary-accent);
  border: 1px solid color-mix(in srgb, var(--primary-accent) 22%, transparent);
`;

const NewsDescBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const NewsDescText = styled.p`
  margin: 0;
  font-size: 0.84rem;
  color: var(--global-text-muted);
  line-height: 1.65;
`;

const NewsDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--global-border);
  margin: 0.1rem 0;
`;

const NewsActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
`;

const NewsAuthor = styled.span`
  font-size: 0.75rem;
  color: var(--global-text-muted);
  font-weight: 600;
`;

const NewsCTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  border-radius: 0.65rem;
  border: 1px solid var(--global-border);
  background: transparent;
  color: var(--global-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--global-secondary-bg);
    color: var(--global-text);
    border-color: var(--global-text-muted);
  }
`;

const NoResults = styled.div`
  padding: 4rem 1rem;
  text-align: center;
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: var(--radius-lg);
  color: var(--global-text-muted);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

// Detail Modal Styles
const FeedbackBox = styled.div`
  padding: 0.9rem 1rem;
  background: linear-gradient(135deg, color-mix(in srgb, var(--secondary-accent) 8%, var(--global-card-bg)), var(--global-card-bg));
  border-radius: var(--radius-md);
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

const SORT_OPTIONS = [
  { value: 'none', label: 'No Sorting' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title A → Z' },
  { value: 'title-desc', label: 'Title Z → A' },
];

type SortOption = 'none' | 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export function NewsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>('none');

  // Extract all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    newsItems.forEach((n) => cats.add(n.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const getTime = (dateStr: string) => {
    return new Date(dateStr).getTime() || 0;
  };

  // Filter items based on search query, selected category and apply sorting
  const filteredNews = useMemo(() => {
    let list = newsItems.filter((item) => {
      const matchCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.hook.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sort === 'date-desc') {
      list = [...list].sort((a, b) => getTime(b.date) - getTime(a.date));
    } else if (sort === 'date-asc') {
      list = [...list].sort((a, b) => getTime(a.date) - getTime(b.date));
    } else if (sort === 'title-asc') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'title-desc') {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [search, selectedCategory, sort]);

  const isFiltered = search || selectedCategory !== 'ALL' || sort !== 'none';

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('ALL');
    setSort('none');
  };

  return (
    <PageWrapper>
      <PageInner>
        <PageHeader>
          <BackLink to="/">
            <FiArrowLeft size={12} /> Back to Dashboard
          </BackLink>
          <PageTitle>Latest News Archive</PageTitle>
          <PageSubtitle>
            Official announcements, development milestones, beta tests, and status reports for ongoing gacha titles.
          </PageSubtitle>
          <FeedbackBox>
            <span className="mobile-only">Spotted a news update we missed or want to submit an official press release? </span>
            <span className="desktop-only">Have we overlooked an upcoming closed beta test timeline, official development milestone, or regional release announcement? Or are you a developer wanting to pitch a press release or media kit for our coverage feed? We appreciate all community tips to keep our news archive accurate. Please go ahead and </span>
            <Link to="/feedback" id="news-feedback-link">
              <span className="mobile-only">Drop a tip at feedback page</span>
              <span className="desktop-only">submit a news tip via our dedicated feedback page</span>
            </Link>
          </FeedbackBox>
        </PageHeader>

        {/* Search */}
        <SearchRow>
          <SearchIcon>
            <FiSearch size={14} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search news articles, updates, or announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <ClearBtn onClick={() => setSearch('')}>
              <FiX size={14} />
            </ClearBtn>
          )}
        </SearchRow>

        {/* Filter & Sort Controls */}
        <ControlRow>
          <ControlBtn
            $active={filtersOpen || selectedCategory !== 'ALL'}
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
            ↕ Sort: {SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'No Sorting'}
            <FiChevronDown
              size={12}
              style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </ControlBtn>
        </ControlRow>

        {filtersOpen && (
          <FilterPanel>
            <FilterGroup>
              <FilterLabel>Category</FilterLabel>
              <PillGroup>
                {categories.map((cat) => (
                  <Pill
                    key={cat}
                    $active={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
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

        {/* Results Metadata */}
        <ResultsMeta>
          <ResultsCount>
            Showing {filteredNews.length} of {newsItems.length} articles
          </ResultsCount>
          {isFiltered && (
            <ResetBtn onClick={handleReset}>
              <FiX size={12} /> Reset Filters
            </ResetBtn>
          )}
        </ResultsMeta>

        {filteredNews.length > 0 ? (
          <NewsGrid>
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                onClick={() => navigate(`/news/${item.id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(`/news/${item.id}`);
                  }
                }}
                role="link"
                tabIndex={0}
                aria-label={`Read ${item.title}`}
              >
                <NewsBanner $color={item.bannerColor} $image={item.bannerImage}>
                  <NewsBannerOverlay />
                  <NewsBannerBadgesLeft>
                    <NewsBannerBadge $accent="var(--primary-accent)">NEWS</NewsBannerBadge>
                  </NewsBannerBadgesLeft>
                  <NewsBannerBadgesRight>
                    <NewsBannerBadge>{item.category}</NewsBannerBadge>
                  </NewsBannerBadgesRight>
                </NewsBanner>

                <NewsCardBody>
                  <NewsHeader>
                    <NewsHeaderText>
                      <NewsTitleText>{item.title}</NewsTitleText>
                      <NewsSubtitleRow>
                        <FiCalendar size={12} />
                        <span>{item.date}</span>
                      </NewsSubtitleRow>
                    </NewsHeaderText>
                  </NewsHeader>

                  <NewsTagRow>
                    <NewsCategoryTag>{item.category}</NewsCategoryTag>
                    <NewsBadgeTag>Global</NewsBadgeTag>
                    <NewsBadgeTag>Official</NewsBadgeTag>
                  </NewsTagRow>

                  <NewsDescBlock>
                    <NewsDescText>{item.hook}</NewsDescText>
                  </NewsDescBlock>

                  <NewsDivider />

                  <NewsActionRow>
                    <NewsAuthor>By GachaTracker Editor</NewsAuthor>
                    <NewsCTAButton onClick={(e) => { e.stopPropagation(); navigate(`/news/${item.id}`); }}>
                      Read Article
                    </NewsCTAButton>
                  </NewsActionRow>
                </NewsCardBody>
              </NewsCard>
            ))}
          </NewsGrid>
        ) : (
          <NoResults>
            <strong>No matching news found</strong>
            <span>Try clearing search queries or checking a different category filter.</span>
          </NoResults>
        )}
      </PageInner>
    </PageWrapper>
  );
}
