import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiPlusCircle, FiTrendingUp, FiCheckCircle, FiInfo, FiSliders } from 'react-icons/fi';
import { changelogData, ChangelogItem } from '../../data/changelogData';

const PageWrapper = styled.div`
  padding-top: 0;
  min-height: 100vh;
  background: var(--global-primary-bg);
`;

const PageInner = styled.div`
  max-width: 44rem;
  margin: 0 auto;
  padding: 0.5rem 1.5rem 3rem;

  @media (max-width: 600px) {
    padding: 0.25rem 1rem 2rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: slideDown 0.35s ease;
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
  margin-bottom: 0.5rem;
  width: fit-content;

  &:hover {
    color: var(--global-text);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PageTitle = styled.h1`
  font-size: clamp(1.8rem, 4.5vw, 2.4rem);
  font-weight: 800;
  color: var(--global-text);
  letter-spacing: -0.035em;
  margin: 0 0 0.4rem;
`;

const PageSubtitle = styled.p`
  font-size: 0.92rem;
  color: var(--global-text-muted);
  margin: 0;
  line-height: 1.6;
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--global-border);
  animation: fadeIn 0.3s ease;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 2rem;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? 'var(--global-text-muted)' : 'var(--global-border)')};
  background: ${({ $active }) => ($active ? 'var(--global-secondary-bg)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'var(--global-text)' : 'var(--global-text-muted)')};
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--global-text-muted);
    background: var(--global-secondary-bg);
    color: var(--global-text);
  }
`;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 0.625rem; /* Center the vertical line under the timeline dot */
    width: 2px;
    background: var(--global-border);
    transform: translateX(-50%);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-left: 2.25rem;
  animation: slideUp 0.4s ease both;
`;

const TimelineDot = styled.div<{ $latest?: boolean }>`
  position: absolute;
  left: 0.625rem; /* Align perfectly with vertical line using transform centering */
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  transform: translateX(-50%);
  border-radius: 50%;
  background: ${({ $latest }) => ($latest ? 'var(--primary-accent)' : 'var(--global-card-bg)')};
  border: 2px solid ${({ $latest }) => ($latest ? 'var(--primary-accent)' : 'var(--global-text-muted)')};
  box-shadow: ${({ $latest }) => ($latest ? '0 0 10px rgba(128, 128, 207, 0.4)' : 'none')};
  z-index: 10;
  transition: all 0.2s ease;
`;

const VersionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
`;

const VersionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const VersionNumber = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--global-text);
  margin: 0;
  font-family: monospace;
`;

const VersionTag = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 0.25rem;
  background: var(--primary-accent-bg);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ReleaseDate = styled.div`
  font-size: 0.8rem;
  color: var(--global-text-muted);
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const ItemTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--global-text);
  margin: 0 0 0.85rem;
  opacity: 0.9;
`;

const VersionCard = styled.div`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px var(--global-card-shadow);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: var(--global-text-muted);
  }

  @media (max-width: 600px) {
    padding: 1.15rem;
  }
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`;

const CategoryLabel = styled.div<{ $type: 'added' | 'improved' | 'fixed' | 'technical' }>`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  
  color: ${({ $type }) => {
    if ($type === 'added') return '#22c55e'; // Bright green
    if ($type === 'improved') return 'var(--primary-accent)'; // Tech violet
    if ($type === 'technical') return '#a855f7'; // Purple for Technical
    return '#ef4444'; // Red for fixes
  }};
`;

const ChangeList = styled.ul`
  margin: 0;
  padding-left: 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChangeItem = styled.li`
  font-size: 0.85rem;
  color: var(--global-text);
  line-height: 1.6;
  opacity: 0.95;

  &::marker {
    color: var(--global-text-muted);
  }
`;

const InfoCard = styled.div`
  margin-top: 3rem;
  background: var(--global-tertiary-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  padding: 1.15rem 1.25rem;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  animation: fadeIn 0.5s ease 0.3s both;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoTitle = styled.h4`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--global-text);
  margin: 0;
`;

const InfoText = styled.p`
  font-size: 0.78rem;
  color: var(--global-text-muted);
  margin: 0;
  line-height: 1.5;

  a {
    color: var(--primary-accent);
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export function ChangelogPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'added' | 'improved' | 'fixed' | 'technical'>('all');

  const filterChanges = (item: ChangelogItem) => {
    if (activeFilter === 'all') return true;
    
    const categories = item.categories;
    if (activeFilter === 'added' && categories.added && categories.added.length > 0) return true;
    if (activeFilter === 'improved' && categories.improved && categories.improved.length > 0) return true;
    if (activeFilter === 'fixed' && categories.fixed && categories.fixed.length > 0) return true;
    if (activeFilter === 'technical' && categories.technical && categories.technical.length > 0) return true;
    
    return false;
  };

  const getFilteredCategories = (item: ChangelogItem) => {
    const { added, improved, fixed, technical } = item.categories;
    return {
      added: activeFilter === 'all' || activeFilter === 'added' ? added : [],
      improved: activeFilter === 'all' || activeFilter === 'improved' ? improved : [],
      fixed: activeFilter === 'all' || activeFilter === 'fixed' ? fixed : [],
      technical: activeFilter === 'all' || activeFilter === 'technical' ? technical : [],
    };
  };

  const visibleItems = changelogData.filter(filterChanges);

  return (
    <PageWrapper>
      <PageInner>
        <PageHeader>
          <BackLink to="/">
            <FiArrowLeft size={14} /> Back to Home
          </BackLink>
          <PageTitle id="changelog-title">Platform Updates</PageTitle>
          <PageSubtitle>
            A timeline of system releases, performance hot-fixes, and core enhancements deployed on GachaTracker.
          </PageSubtitle>
        </PageHeader>

        <FilterTabs>
          <FilterButton 
            $active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
            id="filter-all-btn"
          >
            All Updates
          </FilterButton>
          <FilterButton 
            $active={activeFilter === 'added'} 
            onClick={() => setActiveFilter('added')}
            id="filter-added-btn"
          >
            What's New
          </FilterButton>
          <FilterButton 
            $active={activeFilter === 'fixed'} 
            onClick={() => setActiveFilter('fixed')}
            id="filter-fixed-btn"
          >
            Fixes
          </FilterButton>
          <FilterButton 
            $active={activeFilter === 'improved'} 
            onClick={() => setActiveFilter('improved')}
            id="filter-improved-btn"
          >
            Improvements
          </FilterButton>
          <FilterButton 
            $active={activeFilter === 'technical'} 
            onClick={() => setActiveFilter('technical')}
            id="filter-technical-btn"
          >
            Technical
          </FilterButton>
        </FilterTabs>

        {visibleItems.length > 0 ? (
          <Timeline>
            {visibleItems.map((item, index) => {
              const { added, improved, fixed, technical } = getFilteredCategories(item);
              const hasAdded = added && added.length > 0;
              const hasImproved = improved && improved.length > 0;
              const hasFixed = fixed && fixed.length > 0;
              const hasTechnical = technical && technical.length > 0;

              return (
                <TimelineItem key={item.version} style={{ animationDelay: `${index * 0.1}s` }}>
                  <TimelineDot $latest={item.isLatest} />
                  <VersionHeader>
                    <VersionTitleGroup>
                      <VersionNumber>v{item.version}</VersionNumber>
                      {item.isLatest && <VersionTag>LATEST</VersionTag>}
                    </VersionTitleGroup>
                    <ReleaseDate>
                      <FiClock size={12} />
                      {item.date}
                    </ReleaseDate>
                  </VersionHeader>
                  <VersionCard>
                    <ItemTitle>{item.title}</ItemTitle>
                    
                    {hasAdded && (
                      <CategorySection>
                        <CategoryLabel $type="added">
                          <FiPlusCircle size={14} /> Added
                        </CategoryLabel>
                        <ChangeList>
                          {added.map((change, idx) => (
                            <ChangeItem key={idx}>{change}</ChangeItem>
                          ))}
                        </ChangeList>
                      </CategorySection>
                    )}

                    {hasImproved && (
                      <CategorySection>
                        <CategoryLabel $type="improved">
                          <FiTrendingUp size={14} /> Improved
                        </CategoryLabel>
                        <ChangeList>
                          {improved.map((change, idx) => (
                            <ChangeItem key={idx}>{change}</ChangeItem>
                          ))}
                        </ChangeList>
                      </CategorySection>
                    )}

                    {hasFixed && (
                      <CategorySection>
                        <CategoryLabel $type="fixed">
                          <FiCheckCircle size={14} /> Fixed
                        </CategoryLabel>
                        <ChangeList>
                          {fixed.map((change, idx) => (
                            <ChangeItem key={idx}>{change}</ChangeItem>
                          ))}
                        </ChangeList>
                      </CategorySection>
                    )}

                    {hasTechnical && (
                      <CategorySection>
                        <CategoryLabel $type="technical">
                          <FiSliders size={14} /> Technical
                        </CategoryLabel>
                        <ChangeList>
                          {technical.map((change, idx) => (
                            <ChangeItem key={idx}>{change}</ChangeItem>
                          ))}
                        </ChangeList>
                      </CategorySection>
                    )}
                  </VersionCard>
                </TimelineItem>
              );
            })}
          </Timeline>
        ) : (
          <div style={{ padding: '3rem 1rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
            No updates matched the selected filter.
          </div>
        )}

        <InfoCard>
          <FiInfo size={16} style={{ color: 'var(--primary-accent)', flexShrink: 0, marginTop: '2px' }} />
          <InfoContent>
            <InfoTitle>Have a feature recommendation?</InfoTitle>
            <InfoText>
              Help us expand the ecosystem! Recommend new features or report issues directly on our{' '}
              <Link to="/feedback">Feedback Hub</Link> and we will schedule it for our next release cycle.
            </InfoText>
          </InfoContent>
        </InfoCard>
      </PageInner>
    </PageWrapper>
  );
}
