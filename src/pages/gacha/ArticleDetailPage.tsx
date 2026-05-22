import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiShare2, 
  FiHeart, 
  FiMessageSquare, 
  FiCheck,
  FiTrendingUp,
  FiCompass,
  FiHome,
  FiFileText
} from 'react-icons/fi';
import { newsItems, type NewsItem } from '../../data/newsData';
import { gachaGames } from '../../data/gachaGames';

const PageWrapper = styled.div`
  padding-top: 0;
  min-height: 100vh;
  background: var(--global-primary-bg);
`;

const PageInner = styled.div`
  max-width: 88rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 1.75rem 4rem;

  @media (max-width: 768px) {
    padding: 0 0 3rem;
  }
`;

const NavigationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem 0;
    margin-bottom: 0.75rem;
  }
`;

const NavLinksGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const BackToDashBtn = styled(Link)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--global-border-radius);
  border: 1px solid var(--global-border);
  background: var(--global-button-bg);
  color: var(--global-text);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
  cursor: pointer;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background: var(--global-button-hover-bg);
    color: var(--global-text);
  }
`;

const BackToNewsBtn = styled(Link)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--global-border-radius);
  border: 1px solid var(--global-border);
  background: var(--global-button-bg);
  color: var(--global-text);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
  cursor: pointer;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    background: var(--global-button-hover-bg);
    color: var(--global-text);
  }
`;

const ArticleLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 22rem;
  gap: 2.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MainContent = styled.article`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.6rem;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--global-card-shadow);

  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
  }
`;

const HeaderPadding = styled.div`
  padding: 2.5rem 2.5rem 1.5rem;
  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1rem;
  }
`;

const ArticleTitle = styled.h1`
  font-size: clamp(1.8rem, 4.2vw, 2.6rem);
  font-weight: 850;
  color: var(--global-text);
  line-height: 1.22;
  letter-spacing: -0.03em;
  margin: 0 0 1.25rem;
`;

const ArticleMetaTwoLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 0.5rem;
`;

const MetaLine1 = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--global-text);
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const MetaLine2 = styled.div`
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--global-text-muted);
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  border-top: 1px solid var(--global-border);
  border-bottom: 1px solid var(--global-border);
  background: var(--global-tertiary-bg);
  display: block;
  overflow: hidden;

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 100%);
  pointer-events: none;
`;

const BannerBadge = styled.span`
  position: absolute;
  bottom: 1.5rem;
  left: 2.5rem;
  background: var(--primary-accent);
  color: #fff;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 0.25rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    left: 1rem;
    bottom: 1rem;
  }
`;

const BodyPadding = styled.div`
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
  }
`;

const ArticleHook = styled.p`
  font-size: 1.08rem;
  line-height: 1.6;
  font-weight: 500;
  color: var(--global-text);
  margin: 0 0 1.5rem;
  opacity: 0.95;
  border-left: 3px solid var(--primary-accent);
  padding-left: 1rem;
`;

const ArticleBody = styled.div`
  font-size: 0.93rem;
  line-height: 1.75;
  color: var(--global-text);
  opacity: 0.92;

  p {
    margin: 0 0 1.25rem;
  }

  strong {
    font-weight: 700;
    color: var(--global-text);
  }

  h2 {
    font-size: 1.35rem;
    font-weight: 800;
    margin: 2rem 0 0.85rem;
    color: var(--global-text);
    letter-spacing: -0.02em;
    border-bottom: 1px solid var(--global-border);
    padding-bottom: 0.4rem;
  }
`;

const StickySidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (min-width: 961px) {
    position: sticky;
    top: 5rem;
    height: fit-content;
  }
`;

const SidebarCard = styled.div`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  padding: 1.15rem;
`;

const SidebarTitle = styled.h3`
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  border-bottom: 1px solid var(--global-border);
  padding-bottom: 0.5rem;
`;

const RecArticlesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const RecArticleItem = styled(Link)`
  display: flex;
  gap: 0.75rem;
  text-decoration: none;
  align-items: center;

  &:hover {
    img {
      filter: brightness(1.1);
    }
    h4 {
      color: var(--primary-accent);
    }
  }
`;

const RecThumb = styled.img`
  width: 4.25rem;
  height: 3.2rem;
  border-radius: 0.25rem;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--global-tertiary-bg);
  border: 1px solid var(--global-border);
  transition: filter 0.2s ease;
`;

const RecContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const RecTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--global-text);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  transition: color 0.15s ease;
`;

const RecDate = styled.div`
  font-size: 0.68rem;
  color: var(--global-text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const GameListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SidebarGameRow = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  padding: 0.45rem;
  border-radius: 0.35rem;
  border: 1px solid transparent;
  transition: all 0.15s ease;

  &:hover {
    background: var(--global-secondary-bg);
    border-color: var(--global-border);
  }
`;

const SidebarGameImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.3rem;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarGameInitials = styled.div<{ $color: string }>`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.3rem;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.74rem;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
`;

const SidebarGameText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const SidebarGameName = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--global-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SidebarGameGenre = styled.span`
  font-size: 0.68rem;
  color: var(--global-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CommunityReactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--global-border);
  margin-top: 2rem;
`;

const RectionsTitle = styled.h4`
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const ReactionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ReactionBtn = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${({ $active }) => ($active ? 'var(--primary-accent)18' : 'var(--global-primary-bg)')};
  color: ${({ $active }) => ($active ? 'var(--primary-accent)' : 'var(--global-text-muted)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary-accent)50' : 'var(--global-border)')};

  &:hover {
    border-color: var(--global-text-muted);
    color: var(--global-text);
  }
`;

const ShareBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 2rem;
  background: var(--global-primary-bg);
  border: 1px solid var(--global-border);
  color: var(--global-text-muted);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--global-secondary-bg);
    color: var(--global-text);
    border-color: var(--global-text-muted);
  }
`;

const ErrorState = styled.div`
  max-width: 32rem;
  margin: 4rem auto;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px var(--global-card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 850;
  color: var(--global-text);
  margin: 0;
`;

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(14);
  const [hasLiked, setHasLiked] = useState(false);
  const [fireCount, setFireCount] = useState(8);
  const [hasFired, setHasFired] = useState(false);
  const [insightCount, setInsightCount] = useState(3);
  const [hasInsight, setHasInsight] = useState(false);

  // Retrieve current active news item
  const article = useMemo(() => {
    return newsItems.find((n) => n.id === id);
  }, [id]);

  // Retrieve other recommended articles
  const otherArticles = useMemo(() => {
    return newsItems.filter((n) => n.id !== id).slice(0, 3);
  }, [id]);

  // Retrieve matching game for this article if applicable
  const recommendedGames = useMemo(() => {
    return gachaGames.slice(0, 4);
  }, []);

  if (!article) {
    return (
      <PageWrapper id="article-error-wrapper">
        <ErrorState id="article-error-state">
          <ErrorTitle id="article-error-title">Article Not Found</ErrorTitle>
          <p style={{ color: 'var(--global-text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
            The news article you are seeking does not seem to exist or may have been unlisted.
          </p>
          <Link
            to="/news"
            id="back-to-archive-error-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '0.35rem',
              background: 'var(--global-text)',
              color: 'var(--global-primary-bg)',
              fontWeight: 700,
              fontSize: '0.82rem',
              textDecoration: 'none',
              transition: 'opacity 0.15s ease'
            }}
          >
            <FiArrowLeft size={13} /> Return to News Archive
          </Link>
        </ErrorState>
      </PageWrapper>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLike = () => {
    if (hasLiked) {
      setLikes((v) => v - 1);
      setHasLiked(false);
    } else {
      setLikes((v) => v + 1);
      setHasLiked(true);
    }
  };

  const toggleFire = () => {
    if (hasFired) {
      setFireCount((v) => v - 1);
      setHasFired(false);
    } else {
      setFireCount((v) => v + 1);
      setHasFired(true);
    }
  };

  const toggleInsight = () => {
    if (hasInsight) {
      setInsightCount((v) => v - 1);
      setHasInsight(false);
    } else {
      setInsightCount((v) => v + 1);
      setHasInsight(true);
    }
  };

  return (
    <PageWrapper id={`article-page-wrapper-${article.id}`}>
      <PageInner id="article-page-inner">
        <ArticleLayout id="article-main-layout">
          <MainColumn id="article-main-column">
            <NavigationRow id="article-navigation-row">
              <NavLinksGroup id="article-nav-links-group">
                <BackToDashBtn to="/" id="back-to-dash-btn">
                  <FiHome data-testid="dashboard-icon" /> Dashboard
                </BackToDashBtn>
                <BackToNewsBtn to="/news" id="back-to-news-btn">
                  <FiFileText data-testid="news-icon" /> Latest News
                </BackToNewsBtn>
              </NavLinksGroup>
            </NavigationRow>

            <MainContent id="article-block">
            <HeaderPadding id="article-header-section">
              <ArticleTitle id="article-title-text">{article.title}</ArticleTitle>
              
              <ArticleMetaTwoLine id="article-meta-rows">
                <MetaLine1 id="meta-author">
                  By GachaTracker Editor
                </MetaLine1>
                <MetaLine2 id="meta-details">
                  {article.date} • 3 min read
                </MetaLine2>
              </ArticleMetaTwoLine>
            </HeaderPadding>

            <BannerContainer id="article-banner-container">
              <BannerImg src={article.bannerImage} alt={article.title} id="article-banner-image" />
              <BannerOverlay />
              <BannerBadge id="article-category-badge">
                {article.category}
              </BannerBadge>
            </BannerContainer>

            <BodyPadding id="article-body-padding">
              <ArticleHook id="article-hook-banner">
                {article.hook}
              </ArticleHook>

              <ArticleBody id="article-body-markdown">
                <p>
                  {article.body}
                </p>
                
                <h2>Beta Playtesting & Features Detailed</h2>
                <p>
                  As with previous announcements, this development sprint lays the groundwork for multi-character rotation matrices, action-heavy weapon synergies, and standard gacha pooling systems that undergo thorough checks relative to random distributions. Players who participate in the questionnaire stand a chance to contribute constructive feedback directly through developer-facing channels.
                </p>

                <h2>Performance and Device Optimization</h2>
                <p>
                  Ensuring seamless playability remains a foundational cornerstone. Built with a commitment to native performance, rendering profiles scale based on GPU boundaries, ensuring that both high-end hardware enthusiast configurations and mobile phones retain the tactile visual responsiveness expected of modern live-service gaming.
                </p>
              </ArticleBody>

              <CommunityReactions id="article-community-reactions">
                <RectionsTitle id="reactions-header">Interact with this article</RectionsTitle>
                <ReactionRow id="reactions-row">
                  <ReactionBtn 
                    id="react-heart-btn"
                    $active={hasLiked} 
                    onClick={toggleLike}
                  >
                    <FiHeart size={13} fill={hasLiked ? 'var(--primary-accent)' : 'none'} />
                    <span>Helpful ({likes})</span>
                  </ReactionBtn>

                  <ReactionBtn 
                    id="react-fire-btn"
                    $active={hasFired} 
                    onClick={toggleFire}
                  >
                    🔥 <span>Hyped ({fireCount})</span>
                  </ReactionBtn>

                  <ReactionBtn 
                    id="react-insight-btn"
                    $active={hasInsight} 
                    onClick={toggleInsight}
                  >
                    💡 <span>Insightful ({insightCount})</span>
                  </ReactionBtn>

                  <ShareBtn id="react-share-btn" onClick={handleShare}>
                    {copied ? (
                      <>
                        <FiCheck size={13} style={{ color: '#39cf80' }} />
                        <span style={{ color: '#39cf80' }}>Copied Link!</span>
                      </>
                    ) : (
                      <>
                        <FiShare2 size={13} />
                        <span>Share</span>
                      </>
                    )}
                  </ShareBtn>
                </ReactionRow>
              </CommunityReactions>
            </BodyPadding>
          </MainContent>
          </MainColumn>

          <StickySidebar id="article-sidebar">
            <SidebarCard id="latest-news-sidebar-card">
              <SidebarTitle id="latest-news-sidebar-title">
                <FiTrendingUp size={12} />
                Latest News
              </SidebarTitle>
              <RecArticlesList id="latest-news-sidebar-list">
                {otherArticles.map((other) => (
                  <RecArticleItem key={other.id} to={`/news/${other.id}`} id={`sidebar-rec-link-${other.id}`}>
                    <RecThumb src={other.bannerImage} alt={other.title} />
                    <RecContent>
                      <RecTitle>{other.title}</RecTitle>
                      <RecDate>
                        <FiCalendar size={10} />
                        <span>{other.date}</span>
                      </RecDate>
                    </RecContent>
                  </RecArticleItem>
                ))}
              </RecArticlesList>
            </SidebarCard>

            <SidebarCard id="explore-games-sidebar-card">
              <SidebarTitle id="explore-games-sidebar-title">
                <FiCompass size={12} />
                Trending Titles
              </SidebarTitle>
              <GameListContainer id="explore-games-sidebar-list">
                {recommendedGames.map((game) => (
                  <SidebarGameRow 
                    key={game.id} 
                    to={`/games?q=${encodeURIComponent(game.name)}`}
                    id={`sidebar-game-link-${game.id}`}
                  >
                    {game.profileImage ? (
                      <SidebarGameImg src={game.profileImage} alt={game.name} />
                    ) : (
                      <SidebarGameInitials $color={game.bannerColor}>
                        {game.iconInitials ?? game.name.slice(0, 2).toUpperCase()}
                      </SidebarGameInitials>
                    )}
                    <SidebarGameText>
                      <SidebarGameName>{game.name}</SidebarGameName>
                      <SidebarGameGenre>{game.genre}</SidebarGameGenre>
                    </SidebarGameText>
                  </SidebarGameRow>
                ))}
              </GameListContainer>
            </SidebarCard>
          </StickySidebar>
        </ArticleLayout>
      </PageInner>
    </PageWrapper>
  );
}
