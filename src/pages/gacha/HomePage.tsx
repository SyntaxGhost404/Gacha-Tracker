import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { getRuntimeGachaGames } from '../../data/gachaGames';
import { newsItems } from '../../data/newsData';

function amplifyColor(hex: string, factor = 7): string {
  const clean = hex.replace('#', '');
  const r = Math.min(255, parseInt(clean.slice(0, 2), 16) * factor);
  const g = Math.min(255, parseInt(clean.slice(2, 4), 16) * factor);
  const b = Math.min(255, parseInt(clean.slice(4, 6), 16) * factor);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

const PageWrapper = styled.div`
  padding-top: 1rem;
  min-height: 100%;
  background: transparent;
`;

const Hero = styled.section`
  position: relative;
  min-height: 31rem;
  padding: clamp(4rem, 8vw, 6.5rem) clamp(1.5rem, 6vw, 6rem) 4rem;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--global-radius-xl);
  background-color: #0d0e17;
  background-size: cover;
  background-position: 55% center;
  background-repeat: no-repeat;
  overflow: hidden;
  background-image:
    linear-gradient(90deg, rgba(7, 8, 15, 0.98) 0%, rgba(8, 9, 18, 0.9) 36%, rgba(8, 9, 18, 0.42) 72%, rgba(8, 9, 18, 0.62) 100%),
    linear-gradient(0deg, rgba(7, 8, 15, 0.88) 0%, transparent 55%),
    url('/banners/chasing-kaleidorider.jpeg');
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.26);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 18%, rgba(155, 140, 255, 0.22), transparent 30%),
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: auto, 32px 32px, 32px 32px;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 8rem;
    background: linear-gradient(transparent, rgba(7, 8, 15, 0.7));
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: 29rem;
    padding: 3rem 1.25rem 2rem;
    background-position: 61% center;
    background-image:
      linear-gradient(90deg, rgba(7, 8, 15, 0.95), rgba(8, 9, 18, 0.58)),
      linear-gradient(0deg, rgba(7, 8, 15, 0.96) 0%, rgba(8, 9, 18, 0.16) 80%),
      url('/banners/chasing-kaleidorider.jpeg');
    display: flex;
    align-items: flex-end;
  }
`;

const HeroInner = styled.div`
  max-width: 39rem;
  margin: 0;
  position: relative;
  z-index: 2;
`;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1rem;
  padding: 0.38rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(8, 9, 17, 0.48);
  color: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(12px);
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 0.42rem;
    height: 0.42rem;
    border-radius: 50%;
    background: #69e3d2;
    box-shadow: 0 0 12px #69e3d2;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.6vw, 4.7rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.055em;
  line-height: 0.98;
  margin: 0 0 1.2rem;
  animation: slideDown 0.4s ease;
  text-shadow: 0 4px 28px rgba(0, 0, 0, 0.55);
`;

const HeroSub = styled.p`
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  color: rgba(239, 237, 249, 0.76);
  line-height: 1.7;
  margin: 0 0 1.8rem;
  max-width: 35rem;
  animation: slideDown 0.4s ease 0.05s both;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  animation: slideUp 0.4s ease 0.1s both;
`;

const PrimaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.72rem 1.25rem;
  border-radius: 0.78rem;
  background: linear-gradient(135deg, #a493ff, #7667e8);
  color: #fff;
  font-size: 0.88rem;
  font-weight: 750;
  text-decoration: none;
  box-shadow: 0 12px 28px rgba(86, 67, 205, 0.34);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(86, 67, 205, 0.46);
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.72rem 1.2rem;
  border-radius: 0.78rem;
  background: rgba(11, 12, 21, 0.46);
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.88rem;
  font-weight: 650;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2.25rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.14);

  @media (max-width: 520px) {
    gap: 1rem;
    justify-content: space-between;
  }
`;

const HeroStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const HeroStatValue = styled.strong`
  color: #fff;
  font-size: 1.05rem;
  line-height: 1;
`;

const HeroStatLabel = styled.span`
  color: rgba(255, 255, 255, 0.53);
  font-size: 0.67rem;
  font-weight: 650;
  letter-spacing: 0.04em;
`;

const ContentInner = styled.div`
  max-width: 76rem;
  margin: 0 auto;
  padding: 3.5rem 0.25rem 2.5rem;

  @media (max-width: 600px) {
    padding-top: 2.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--global-border);
`;

const SectionTitle = styled.h2`
  font-size: 0.94rem;
  font-weight: 800;
  color: var(--global-text);
  text-transform: uppercase;
  letter-spacing: 0.09em;
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  animation: slideUp 0.4s ease 0.2s both;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const BannerBg = styled.div<{ $image?: string; $glow: string }>`
  position: absolute;
  inset: 0;
  ${({ $image }) =>
    $image
      ? `background-image: url(${$image}); background-size: cover; background-position: center;`
      : `background: radial-gradient(ellipse 70% 140% at 95% 50%, ${''} 0%, transparent 65%), var(--global-card-bg);`}
  filter: saturate(0.72) brightness(0.78);
  transition: filter 0.4s ease;
`;

const BannerBgGradient = styled.div<{ $glow: string }>`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 140% at 95% 50%, ${({ $glow }) => $glow} 0%, transparent 65%),
    radial-gradient(ellipse 40% 80% at 55% 0%, ${({ $glow }) => $glow}55 0%, transparent 55%),
    var(--global-card-bg);
  filter: saturate(0.72) brightness(0.78);
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
  border-radius: 1rem;
  border: 1px solid var(--global-border);
  text-decoration: none;
  display: block;
  height: 7rem;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 10px 30px var(--global-card-shadow);

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
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 18px 40px var(--global-card-shadow);
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
  width: 4.65rem;
  height: 4.65rem;
  border-radius: 0.8rem;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
`;

const ProfileInitials = styled.div<{ $color: string }>`
  width: 4.65rem;
  height: 4.65rem;
  border-radius: 0.8rem;
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
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 3.25rem;
  animation: slideUp 0.4s ease 0.15s both;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const NewsCard = styled.article`
  background: var(--global-card-bg);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--global-border);
  animation: slideUp 0.35s ease;
  transition: transform 0.22s ease, border-color 0.25s ease, box-shadow 0.22s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--global-border-strong);
    box-shadow: 0 18px 44px var(--global-card-shadow);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-accent);
    outline-offset: 3px;
  }
`;

const NewsBanner = styled.div<{ $color: string; $image?: string }>`
  position: relative;
  height: 9rem;
  background-color: ${({ $color }) => $color};
  ${({ $image }) =>
    $image &&
    `
    background-image: url(${$image});
    background-size: cover;
    background-position: center top;
  `}
  overflow: hidden;
  filter: saturate(0.72) brightness(0.8);
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
  padding: 1rem;
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
  font-size: 0.98rem;
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
  font-size: 0.82rem;
  color: var(--global-text-muted);
  line-height: 1.65;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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

export function HomePage() {
  const navigate = useNavigate();
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingGames = React.useMemo(() => getRuntimeGachaGames(now).filter((g) => g.status !== 'Released'), [now]);
  const total = upcomingGames.length;
  const preRegistrationCount = upcomingGames.filter((game) => game.status === 'Pre-registration').length;
  const scheduledCount = upcomingGames.filter((game) => Boolean(game.releaseDate)).length;
  const featured = upcomingGames.slice(0, 8);

  return (
    <PageWrapper>
      <Hero>
        <HeroInner>
          <HeroEyebrow>Release intelligence · updated live</HeroEyebrow>
          <HeroTitle>Upcoming Gacha Games</HeroTitle>
          <HeroSub>
            Follow release windows, beta milestones, platform support, and the worlds worth watching next.
          </HeroSub>
          <HeroCTA>
            <PrimaryBtn to='/games'>
              Browse {total} Games <FiArrowRight size={14} />
            </PrimaryBtn>
            <SecondaryBtn to='/games?status=Pre-registration'>
              <FiCalendar size={13} /> Pre-registrations
            </SecondaryBtn>
          </HeroCTA>
          <HeroStats aria-label='Tracker summary'>
            <HeroStat>
              <HeroStatValue>{total}</HeroStatValue>
              <HeroStatLabel>Titles tracked</HeroStatLabel>
            </HeroStat>
            <HeroStat>
              <HeroStatValue>{preRegistrationCount}</HeroStatValue>
              <HeroStatLabel>Pre-register now</HeroStatLabel>
            </HeroStat>
            <HeroStat>
              <HeroStatValue>{scheduledCount}</HeroStatValue>
              <HeroStatLabel>Dated releases</HeroStatLabel>
            </HeroStat>
          </HeroStats>
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
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(`/news/${item.id}`);
                  }
                }}
                role='link'
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
                    <MiniGenre>{game.genre.join(', ')}</MiniGenre>
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
