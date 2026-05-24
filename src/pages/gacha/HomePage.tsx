import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { gachaGames } from '../../data/gachaGames';
import { newsItems, type NewsItem } from '../../data/newsData';

function amplifyColor(hex: string, factor = 7): string {
  const clean = hex.replace('#', '');
  const r = Math.min(255, parseInt(clean.slice(0, 2), 16) * factor);
  const g = Math.min(255, parseInt(clean.slice(2, 4), 16) * factor);
  const b = Math.min(255, parseInt(clean.slice(4, 6), 16) * factor);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

const PageWrapper = styled.div`
  padding-top: 3.5rem;
  min-height: 100vh;
  background: var(--global-primary-bg);
`;

const Hero = styled.section`
  position: relative;
  padding: 5rem 1.5rem 4rem;
  text-align: center;
  border-bottom: 1px solid var(--global-border);
  background-color: var(--global-primary-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  /* Premium background layout with radial gradient glow fallback */
  background-image: radial-gradient(circle at 50% 30%, var(--global-secondary-bg) 0%, var(--global-primary-bg) 100%);

  /* User-uploaded responsive backgrounds, overlayed with a theme-aware readability mask */
  @media (max-width: 768px) {
    background-image: linear-gradient(to bottom, rgba(var(--hero-overlay-rgb, 12, 12, 12), 0.82), rgba(var(--hero-overlay-rgb, 12, 12, 12), 0.94)), url('/hero-mobile.jpg');
  }

  @media (min-width: 769px) {
    padding: 6rem 2rem 5rem;
    background-image: linear-gradient(to bottom, rgba(var(--hero-overlay-rgb, 12, 12, 12), 0.78), rgba(var(--hero-overlay-rgb, 12, 12, 12), 0.94)), url('/hero-desktop.png');
  }

  /* Light theme variable overrides */
  :root:not(.dark-mode) & {
    --hero-overlay-rgb: 247, 247, 249;
    background-image: radial-gradient(circle at 50% 30%, #ffffff 0%, #f3f3f6 100%);

    @media (max-width: 768px) {
      background-image: linear-gradient(to bottom, rgba(247, 247, 249, 0.75), rgba(247, 247, 249, 0.96)), url('/hero-mobile.jpg');
    }

    @media (min-width: 769px) {
      background-image: linear-gradient(to bottom, rgba(247, 247, 249, 0.72), rgba(247, 247, 249, 0.94)), url('/hero-desktop.png');
    }
  }

  /* Subtle futuristic accent glow */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 35%, var(--primary-accent)0c, transparent 65%);
    pointer-events: none;
    z-index: 1;
  }
`;

const HeroInner = styled.div`
  max-width: 44rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5.5vw, 3.25rem);
  font-weight: 850;
  color: var(--global-text);
  letter-spacing: -0.04em;
  line-height: 1.15;
  margin: 0 0 1rem;
  animation: slideDown 0.4s ease;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);

  :root.dark-mode & {
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
  }
`;

const HeroSub = styled.p`
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  color: var(--global-text-muted);
  line-height: 1.7;
  margin: 0 0 2.2rem;
  animation: slideDown 0.4s ease 0.05s both;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);

  :root.dark-mode & {
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  }
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: slideUp 0.4s ease 0.1s both;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.4rem;
  border-radius: 0.35rem;
  background: var(--global-text);
  color: var(--global-primary-bg);
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.4rem;
  border-radius: 0.35rem;
  background: transparent;
  color: var(--global-text-muted);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--global-border);
  transition: all 0.15s ease;

  &:hover {
    background: var(--global-secondary-bg);
    color: var(--global-text);
    border-color: var(--global-text-muted);
  }
`;

const ContentInner = styled.div`
  max-width: 52rem;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.9rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--global-border);
`;

const SectionTitle = styled.h2`
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--global-text);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--global-text-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s ease;

  &:hover {
    color: var(--global-text);
  }
`;

const FeaturedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: slideUp 0.4s ease 0.2s both;
`;

const BannerBg = styled.div<{ $image?: string; $glow: string }>`
  position: absolute;
  inset: 0;
  ${({ $image }) =>
    $image
      ? `background-image: url(${$image}); background-size: cover; background-position: center;`
      : `background: radial-gradient(ellipse 70% 140% at 95% 50%, ${''} 0%, transparent 65%), var(--global-card-bg);`}
  filter: grayscale(1) brightness(0.85);
  transition: filter 0.4s ease;
`;

const BannerBgGradient = styled.div<{ $glow: string }>`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 140% at 95% 50%, ${({ $glow }) => $glow} 0%, transparent 65%),
    radial-gradient(ellipse 40% 80% at 55% 0%, ${({ $glow }) => $glow}55 0%, transparent 55%),
    var(--global-card-bg);
  filter: grayscale(1) brightness(0.85);
  transition: filter 0.4s ease;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(0, 0, 0, 0.82) 0%,
    rgba(0, 0, 0, 0.65) 40%,
    rgba(0, 0, 0, 0.28) 100%
  );
  pointer-events: none;
`;

const FeaturedCard = styled(Link)`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid var(--global-border);
  text-decoration: none;
  display: block;
  height: 5.5rem;
  transition: border-color 0.25s ease;

  &:hover ${BannerBg},
  &:active ${BannerBg} {
    filter: grayscale(0) brightness(1);
  }

  &:hover ${BannerBgGradient},
  &:active ${BannerBgGradient} {
    filter: grayscale(0) brightness(1);
  }

  &:hover,
  &:active {
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  height: 100%;
  padding: 0 0.9rem 0 0.75rem;
`;

const ProfileThumb = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
`;

const ProfileInitials = styled.div<{ $color: string }>`
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
  background: ${({ $color }) => $color};
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
  letter-spacing: 0.02em;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  min-width: 0;
`;

const MiniTitle = styled.span`
  font-size: 0.93rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
`;

const MiniStatus = styled.span`
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.72);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  gap: 0.32rem;
`;

const MiniGenre = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.42);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.95);
`;

const StatusDot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const STATUS_COLORS: Record<string, string> = {
  Released: '#4ade80',
  'Pre-registration': '#f59e0b',
  'In Development': '#60a5fa',
  Announced: '#9ca3af',
};

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2.2rem;
  animation: slideUp 0.4s ease 0.15s both;
`;

const NewsCard = styled.article`
  background: var(--global-card-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--global-border);
  animation: slideUp 0.35s ease;
  transition: transform 0.2s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const NewsBanner = styled.div<{ $color: string; $image?: string }>`
  position: relative;
  height: 10rem;
  background-color: ${({ $color }) => $color};
  ${({ $image }) =>
    $image &&
    `
    background-image: url(${$image});
    background-size: cover;
    background-position: center top;
  `}
  overflow: hidden;
  filter: grayscale(1) brightness(0.85);
  transition: filter 0.4s ease;

  ${NewsCard}:hover & {
    filter: grayscale(0) brightness(1);
  }

  @media (max-width: 600px) {
    height: 8rem;
  }
`;

const NewsBannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%);
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
  border-radius: 0.25rem;
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
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
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
  font-size: 1.05rem;
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
  border-radius: 0.25rem;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const NewsCategoryTag = styled.span`
  padding: 0.18rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: var(--primary-accent)18;
  color: var(--primary-accent);
  border: 1px solid var(--primary-accent)30;
`;

const NewsDescBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const NewsDescText = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: var(--global-text-muted);
  line-height: 1.65;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
  padding: 0.3rem 0.75rem;
  border-radius: 0.3rem;
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

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
`;

const ModalContainer = styled.div`
  position: relative;
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.8rem;
  width: 100%;
  max-width: 32rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.85);
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ModalHeaderBanner = styled.div<{ $image: string }>`
  height: 10rem;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const ModalHeaderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.95) 100%);
`;

const ModalHeaderContent = styled.div`
  position: absolute;
  bottom: 0.85rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  align-items: flex-end;
  gap: 0.85rem;
`;

const ModalProfileThumb = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.35rem;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
`;

const ModalMetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

const ModalCategoryTag = styled.span`
  font-size: 0.62rem;
  font-weight: 800;
  color: var(--primary-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ModalDate = styled.span`
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ModalBody = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  overflow-y: auto;
  max-height: 22rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--global-text);
  line-height: 1.35;
  margin: 0;
  letter-spacing: -0.01em;
`;

const ModalText = styled.p`
  font-size: 0.84rem;
  color: var(--global-text-muted);
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
`;

const FeedbackBox = styled.div`
  margin-top: 2rem;
  padding: 0.85rem 1rem;
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.4rem;
  font-size: 0.82rem;
  color: var(--global-text-muted);
  text-align: center;
  line-height: 1.55;
  animation: fadeIn 0.4s ease 0.25s both;

  a {
    color: var(--global-text);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export function HomePage() {
  const navigate = useNavigate();
  const upcomingGames = React.useMemo(() => gachaGames.filter((g) => g.status !== 'Released'), []);
  const total = upcomingGames.length;
  const featured = upcomingGames.slice(0, 8);

  return (
    <PageWrapper>
      <Hero>
        <HeroInner>
          <HeroTitle>Upcoming Gacha Games</HeroTitle>
          <HeroSub>
            Discover upcoming gacha games, pre-registration titles, and games in development.
          </HeroSub>
          <HeroCTA>
            <PrimaryBtn to='/games'>
              Browse {total} Games <FiArrowRight size={14} />
            </PrimaryBtn>
            <SecondaryBtn to='/games?status=Pre-registration'>
              <FiCalendar size={13} /> Pre-registrations
            </SecondaryBtn>
          </HeroCTA>
        </HeroInner>
      </Hero>

      <ContentInner>
        {/* Latest News Section */}
        <SectionHeader>
          <SectionTitle>Latest News</SectionTitle>
          <ViewAllLink to='/news'>
            View all <FiArrowRight size={12} />
          </ViewAllLink>
        </SectionHeader>

        <NewsList>
          {newsItems.map((item) => {
            return (
              <NewsCard
                key={item.id}
                onClick={() => navigate(`/news/${item.id}`)}
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
                      <NewsTitleText title={item.title}>{item.title}</NewsTitleText>
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
            );
          })}
        </NewsList>

        {/* Featured Games Section */}
        <SectionHeader>
          <SectionTitle>Featured Games</SectionTitle>
          <ViewAllLink to='/games'>
            View all <FiArrowRight size={12} />
          </ViewAllLink>
        </SectionHeader>

        <FeaturedList>
          {featured.map((game) => {
            const glow = amplifyColor(game.bannerColor);
            return (
              <FeaturedCard
                key={game.id}
                to={`/games?q=${encodeURIComponent(game.name)}`}
              >
                {game.bannerImage ? (
                  <BannerBg $image={game.bannerImage} $glow={glow} />
                ) : (
                  <BannerBgGradient $glow={glow} />
                )}
                <CardOverlay />
                <CardContent>
                  {game.profileImage ? (
                    <ProfileThumb src={game.profileImage} alt={game.name} />
                  ) : (
                    <ProfileInitials $color={game.bannerColor + 'dd'}>
                      {game.iconInitials ?? game.name.slice(0, 2).toUpperCase()}
                    </ProfileInitials>
                  )}
                  <TextBlock>
                    <MiniTitle>{game.name}</MiniTitle>
                    <MiniStatus>
                      <StatusDot $color={STATUS_COLORS[game.status] ?? '#888'} />
                      {game.status}
                    </MiniStatus>
                    <MiniGenre>{game.genre}</MiniGenre>
                  </TextBlock>
                </CardContent>
              </FeaturedCard>
            );
          })}
        </FeaturedList>
      </ContentInner>
    </PageWrapper>
  );
}
