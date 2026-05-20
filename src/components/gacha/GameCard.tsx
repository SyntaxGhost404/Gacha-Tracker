import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCalendar, FiChevronDown, FiChevronUp, FiBookmark, FiCheck } from 'react-icons/fi';
import { type GachaGame, STATUS_LABELS, REGION_COLORS, PLATFORM_ICONS } from '../../data/gachaGames';
import { useWatchlist } from '../../context/WatchlistContext';

const Card = styled.article`
  background: var(--global-card-bg);
  border-radius: 0.5rem;
  overflow: hidden;
  animation: slideUp 0.35s ease;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Banner = styled.div<{ $color: string; $image?: string }>`
  position: relative;
  height: 10rem;
  background-color: ${({ $color }) => $color};
  ${({ $image }) => $image && `
    background-image: url(${$image});
    background-size: cover;
    background-position: center top;
  `}
  overflow: hidden;

  @media (max-width: 600px) {
    height: 8rem;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%);
`;

const BannerBadgesLeft = styled.div`
  position: absolute;
  top: 0.6rem;
  left: 0.65rem;
  display: flex;
  gap: 0.35rem;
`;

const BannerBadgesRight = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.65rem;
  display: flex;
  gap: 0.35rem;
`;

const BannerBadge = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  white-space: nowrap;
`;

const CardBody = styled.div`
  padding: 0.9rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const GameHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const GameIcon = styled.div<{ $color: string }>`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.6rem;
  background: ${({ $color }) => $color};
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
  letter-spacing: 0.02em;

  :root:not(.dark-mode) & {
    color: rgba(0, 0, 0, 0.45);
    border-color: rgba(0, 0, 0, 0.1);
  }
`;

const GameIconImg = styled.img`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.6rem;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GameMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

const GameName = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--global-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--global-text-muted);

  svg {
    flex-shrink: 0;
    opacity: 0.6;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
`;

const Tag = styled.span`
  padding: 0.18rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const RegionTag = styled.span<{ $color: string }>`
  padding: 0.18rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.72rem;
  font-weight: 700;
  background: ${({ $color }) => $color}18;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}30;
`;

const DescBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const DescText = styled.p<{ $expanded: boolean }>`
  margin: 0;
  font-size: 0.82rem;
  color: var(--global-text-muted);
  line-height: 1.65;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : '3')};
`;

const ReadMoreBtn = styled.button`
  background: none;
  border: none;
  color: var(--global-text-muted);
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  align-self: flex-start;
  transition: color 0.15s ease;

  &:hover {
    color: var(--global-text);
  }
`;

const ReleaseDateBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ReleaseDateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const ReleaseDateText = styled.span`
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--global-text);
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    opacity: 0.5;
  }
`;

const UnconfirmedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #f59e0b;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #f59e0b;
    flex-shrink: 0;
  }
`;

const CountdownBadge = styled.span`
  padding: 0.18rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: 0.04em;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const RelativeTime = styled.span`
  font-size: 0.8rem;
  color: var(--global-text-muted);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--global-border);
  margin: 0.1rem 0;
`;

const PlatformsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PlatformsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const PlatformLabel = styled.span`
  font-size: 0.72rem;
  color: var(--global-text-muted);
  font-weight: 600;
`;

const PlatformBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const PlatformBadge = styled.span`
  padding: 0.2rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const EngineGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-end;
`;

const EngineBadge = styled.span`
  padding: 0.2rem 0.55rem;
  border-radius: 0.25rem;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const FollowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FollowLabel = styled.span`
  font-size: 0.78rem;
  color: var(--global-text-muted);
  font-weight: 600;
`;

const FollowBtn = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.75rem;
  border-radius: 0.3rem;
  border: 1px solid var(--global-border);
  background: ${({ $active }) =>
    $active ? 'var(--global-tertiary-bg)' : 'transparent'};
  color: ${({ $active }) =>
    $active ? 'var(--global-text)' : 'var(--global-text-muted)'};
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

function useCountdown(dateStr: string | undefined) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!dateStr) return;
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, [dateStr]);

  if (!dateStr) return null;

  const target = new Date(dateStr + 'T00:00:00');
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const exact = `${days}D ${hours}H ${mins}M`;

  let relative: string;
  if (days >= 60) {
    relative = `In ${Math.floor(days / 30)} months`;
  } else if (days >= 30) {
    relative = `In 1 month`;
  } else if (days >= 14) {
    relative = `In ${Math.floor(days / 7)} weeks`;
  } else if (days >= 7) {
    relative = `In 1 week`;
  } else {
    relative = `In ${days} day${days !== 1 ? 's' : ''}`;
  }

  return { exact, relative, days };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getBannerLabel(game: GachaGame): string {
  if (game.status === 'Released') return 'RELEASED';
  if (!game.releaseDate) return 'TBA';
  const d = new Date(game.releaseDate + 'T00:00:00');
  const now = new Date();
  const monthDiff =
    (d.getFullYear() - now.getFullYear()) * 12 +
    (d.getMonth() - now.getMonth());
  if (monthDiff <= 0) return 'THIS MONTH';
  if (monthDiff <= 1) return 'NEXT MONTH';
  if (monthDiff <= 3) return 'THIS QUARTER';
  const q = Math.floor(d.getMonth() / 3) + 1;
  return `Q${q} ${d.getFullYear()}`;
}

export function GameCard({ game }: { game: GachaGame }) {
  const [expanded, setExpanded] = useState(false);
  const { toggle, isWatchlisted } = useWatchlist();
  const followed = isWatchlisted(game.id);
  const countdown = useCountdown(game.releaseDate);
  const bannerLabel = getBannerLabel(game);

  return (
    <Card>
      <Banner $color={game.bannerColor} $image={game.bannerImage}>
        <BannerOverlay />
        <BannerBadgesLeft>
          <BannerBadge>{bannerLabel}</BannerBadge>
        </BannerBadgesLeft>
        {(game.status !== 'Released') && (
          <BannerBadgesRight>
            <BannerBadge>{STATUS_LABELS[game.status]}</BannerBadge>
            {game.devStatus && <BannerBadge>{game.devStatus.toUpperCase()}</BannerBadge>}
          </BannerBadgesRight>
        )}
      </Banner>

      <CardBody>
        <GameHeader>
          {game.profileImage ? (
            <GameIconImg src={game.profileImage} alt={game.name} />
          ) : (
            <GameIcon $color={game.bannerColor + 'cc'}>
              {game.iconInitials ?? game.name.slice(0, 2).toUpperCase()}
            </GameIcon>
          )}
          <GameMeta>
            <GameName title={game.name}>{game.name}</GameName>
            <DateRow>
              <FiCalendar size={12} />
              {game.status === 'Released'
                ? 'Released'
                : game.releaseDate
                ? countdown?.relative ?? 'TBA'
                : 'TBA'}
            </DateRow>
          </GameMeta>
        </GameHeader>

        <TagRow>
          <Tag>{game.genre}</Tag>
          {game.regions.map((r) => (
            <RegionTag key={r} $color={REGION_COLORS[r]}>
              {r}
            </RegionTag>
          ))}
        </TagRow>

        <DescBlock>
          <DescText $expanded={expanded}>{game.description}</DescText>
          <ReadMoreBtn onClick={() => setExpanded((v) => !v)}>
            {expanded ? (
              <>Show less <FiChevronUp size={12} /></>
            ) : (
              <>Read more <FiChevronDown size={12} /></>
            )}
          </ReadMoreBtn>
        </DescBlock>

        <ReleaseDateBlock>
          <ReleaseDateRow>
            <ReleaseDateText>
              <FiCalendar size={14} />
              {game.releaseDate ? formatDate(game.releaseDate) : 'TBA'}
            </ReleaseDateText>
            {game.releaseDate && game.releaseDateConfirmed === false && (
              <UnconfirmedBadge>UNCONFIRMED</UnconfirmedBadge>
            )}
          </ReleaseDateRow>
          {countdown && (
            <TagRow>
              <RelativeTime>{countdown.relative}</RelativeTime>
              <CountdownBadge>{countdown.exact}</CountdownBadge>
            </TagRow>
          )}
        </ReleaseDateBlock>

        <Divider />

        <PlatformsRow>
          <PlatformsGroup>
            <PlatformLabel>Platforms:</PlatformLabel>
            <PlatformBadges>
              {game.platforms.map((p) => (
                <PlatformBadge key={p}>
                  {PLATFORM_ICONS[p]} {p}
                </PlatformBadge>
              ))}
            </PlatformBadges>
          </PlatformsGroup>
          {game.engine && (
            <EngineGroup>
              <PlatformLabel>Engine:</PlatformLabel>
              <EngineBadge>{game.engine}</EngineBadge>
            </EngineGroup>
          )}
        </PlatformsRow>

        <Divider />

        <FollowRow>
          <FollowLabel>Follow:</FollowLabel>
          <FollowBtn
            $active={followed}
            onClick={() => toggle(game.id)}
            title={followed ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {followed ? (
              <><FiCheck size={12} /> Following</>
            ) : (
              <><FiBookmark size={12} /> Watch</>
            )}
          </FollowBtn>
        </FollowRow>
      </CardBody>
    </Card>
  );
}
