import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCalendar, FiChevronDown, FiChevronUp, FiBookmark, FiCheck } from 'react-icons/fi';
import { type GachaGame, STATUS_LABELS, REGION_COLORS } from '../../data/gachaGames';
import { useWatchlist } from '../../context/WatchlistContext';
import { ScrollableSocialContainer } from './ScrollableSocialContainer';

// Scalable, crisp inline SVG brand logos for platforms & engines
const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-5.48-4.14l1.23-1.23c.2-.2.2-.51 0-.71a.495.495 0 0 0-.71 0L14.2 3.25C13.51 2.94 12.77 2.77 12 2.77c-.77 0-1.51.17-2.2.49L8.47 1.93a.495.495 0 0 0-.71 0c-.2.2-.2.51 0 .71l1.23 1.23C7.4 5.17 6.4 7.03 6.13 9.23h11.75c-.28-2.2-1.28-4.06-2.86-5.37zM9 7.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm6 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z" />
  </svg>
);

const PcIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SwitchIcon = () => (
  <svg viewBox="0 0 100 100" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="m22.1 1.1c-9 1.1-16.8 7.9-19.9 16.5-1.5 4.2-1.5 5.2-1.4 32.1 0.1 26.3 0.1 28 0.8 30.3 2.3 8.6 8.1 15.1 15.8 17.9 1.5 0.6 3.6 1.2 4.7 1.3 1.1 0.2 7.2 0.3 13.5 0.3 8.9 0.1 12.3 0 12.4-0.2 0.3-0.3 0.4-8.6 0.3-49.4 0-27.5-0.1-48.3-0.2-48.8s-0.5-0.5-12.1-0.4c-6.5 0-12.8 0.1-13.9 0.4zm18.3 48.9v41.7l-7.9-0.1c-7.1 0-9.2-0.1-10.8-0.5-5.6-1.3-10.3-5.4-12.2-10.9-0.9-2.5-0.9-2.8-1-25 0-12.3 0-25 0.2-32.1 0.7-5.5 5.6-12 12.2-14.1 1.8-0.6 3.2-0.6 9.8-0.7h9.7v41.7z"/>
    <path d="m22.7 21.1c-4 1.2-6.9 4.3-7 8.3 0 1.1 0.1 2.4 0.4 3.2 1 2.7 2.8 4.8 5.6 6 0.9 0.5 1.9 0.7 4 0.7 3.8 0.1 8.7-3.3 9-8.4 0.3-5.9-4.7-10.9-10.2-10.1-0.4 0-1.2 0.1-1.8 0.3z"/>
    <path d="m58.4 0.9c-0.2 0.3-0.2 98.2 0.2 98.5 0.2 0.2 5.4 0.2 10.8 0.2 8.6-0.1 8.7-0.1 11.5-0.7 7.1-1.6 13.2-6.5 16.1-12.7 2.3-5.2 2.3-5.3 2.2-33.8 0-25.1 0-29.8-0.8-32.4-2.3-8.9-9.1-15.7-17.6-18.3-2.7-0.8-3.3-0.9-12.4-0.9-5.1 0-9.8 0-10 0.1zm24 45.1c2.1 1 4.1 3.1 5 5.6 0.6 1.7 0.7 4.6 0.1 6.5-2.1 5.5-7.9 7.9-12.9 5.8-2.6-1.1-5-3.4-6.1-6.5-0.4-1.4-0.4-4.1 0-5.4 1.4-4.5 5.9-7.4 10.4-7 1 0.1 2.6 0.4 3.5 1z"/>
  </svg>
);

const PlaystationIcon = () => (
  <svg viewBox="0 0 128 128" width="12" height="12" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path fill="#F1C400" d="m48.6 93.4-9.6-2.9-9.7 3.2c-2.6 0.9-6.2 0.6-7.5-1.1-1.2-1.5-0.5-3 2.1-4l4.4-1.7-17.3-6c-5 1.7-9.1 5.1-9.1 10.3 0 5.3 7.4 6.9 20.4 8.7 8.6 1.3 16.4 2.1 26.3-0.7v-5.8z"/>
    <path fill="#F1C400" d="m68.5 99.8v11.7l18-6.2-18-5.5z"/>
    <path fill="#00ACA3" d="m48.6 73.9-8-2.4-29.6 9.4 17.3 5.8 20.3-7.3v-5.5z"/>
    <path fill="#00ACA3" d="m39 90.4 9.6 2.9v-6.2l-9.6 3.3z"/>
    <path fill="#00ACA3" d="m68.5 79.8v12.2l18.3-6.3-18.3-5.9z"/>
    <path fill="#00ACA3" d="m96.9 89-28.4 9.8v1l18 5.5 29.8-10-19.4-6.3z"/>
    <path fill="#386EB5" d="m48.6 68.8-8 2.7 8 2.4v-5.1z"/>
    <path fill="#386EB5" d="m96.9 74.5c-6.2 0-16.3 1.4-23.9 3.8l-4.5 1.5 18.2 5.8 10.2-3.4c2.7-0.9 9.8-1.9 11.3 0.1 1.4 1.9-3.4 3.8-6.2 4.6l-5.1 2 19.4 6.4c5.4-1.9 9.8-4.6 9.7-9.4-0.4-8-16-11.4-29.1-11.4z"/>
    <path fill="#DE052B" d="m74.9 23.2-26.3-7v88.7l19.9 6.6v-75.7c0-3.5 8-4.1 8 0.3v35c11.8 3.5 23.4 2.4 24.2-17 0.8-14-6.3-25.8-25.8-30.9z"/>
  </svg>
);

const UnrealIcon = () => (
  <svg viewBox="0 0 150 150" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="m75 4.7c-38.5 0-69.9 31.1-69.9 70.7 0 38.4 30.2 69.9 69.9 69.9 39.3 0 70.3-30.6 70.3-69.9 0-33.6-28.5-70.7-70.3-70.7zm-0.4 6.2c34.2 0 64.6 28.3 64.6 64.5 0 34-26.6 63.7-64.6 63.7-34.5 0-63.8-27.1-63.8-63.7 0-32.9 27-64.5 63.8-64.5z"/>
    <path d="m122.9 86.6c-0.6-1.9-3.4-2.9-5-1.2-3 2.6-6.8 5.4-14.1 5.8v-34.7c2.4-5.2 6.5-11.7 12.3-17.9 1.8-1.9 0.4-5.4-2.5-5.1-9.5 0.3-21.8 7.7-30.2 17.4l-1.9 3.2c-0.2 0.6-0.5 1.1-0.4 1.9v36.1c-4.5 2.1-7.2 2.2-9.4 0.4v-59.2c0-2-2.2-3.9-4.5-2.8-15.6 5.9-26.9 15.5-36.2 30.6-3.7 6.2-6.5 13-8.9 21.9-1 3.6 3 6 5.2 3.5 3.4-3.7 8.8-12.7 13.5-16.6 2.1-1.7 5.1-2.8 8.5-2.9v30.1h-6.8c-2.4 0-4.2 2.5-2.6 4.9 6.5 9.1 20.1 17.2 35.2 17.9 0.9 0 1.4-0.1 1.6-0.4l8-7.8 7.8 4.8c1 0.5 2.1 0.7 3 0.4 7.8-2.2 20.4-12.4 27.4-27.6 0.5-0.9 0.5-1.9 0-2.7zm-27.7 24.1-8.8-5.9c-1.3-0.9-3.1-1.4-4.6 0l-8.1 9c-7.2-0.3-15.6-3.9-23.5-10h2.3c2 0 3.4-1.2 3.4-3.2l-0.1-36.6c0-1.7-1.4-3-3-3h-4.2c-3.9 0-7.8 1.3-11.7 4.4 5.6-10 14.5-20.9 28.5-27.5l0.1 56.1c0 1 0.5 1.8 1.2 2.4 5 4.3 10.2 5.4 18.9 0.5 1.1-0.4 2.1-1.5 2.1-2.8v-37.4c3.8-6.1 9.9-11.3 17-14.9-2.5 3.6-5.2 8-7.2 13l-0.1 38.9c0.1 1.9 1.5 3.2 3.2 3.3 4.2 0.5 7.6 0.2 10-0.5-5.2 6.7-11.5 12.3-15.4 14.2z"/>
  </svg>
);

const UnityIcon = () => (
  <svg viewBox="0 0 125 140" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="m67.8 24.4 22.6 12.6c1 0.6 1 1.6 0 2.2l-26.8 16c-0.6 0.3-1.4 0.3-2 0l-27.2-15.8c-0.9-0.4-0.9-1.8 0-2.3l22.6-12.7v-24.4l-57 32.1v66.4l21.4-13.1v-25.6c0-0.9 1-1.5 1.7-1l27.3 15.2c0.7 0.4 1.2 1.2 1.2 2v31.4c0 0.9-1 1.5-1.8 1.1l-22.9-13.4-21.9 13.1 57.5 31.9 57.6-31.9-22.2-13.1-22.5 13.4c-0.8 0.5-1.8-0.1-1.8-1v-31.4c0-0.7 0.4-1.4 1.1-1.8l27-15.5c0.8-0.5 1.8 0.1 1.8 1v25.7l21.5 13v-66.3l-57.2-32.2v24.4z"/>
  </svg>
);

const BrandGlobeIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const BrandXIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BrandYouTubeIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.515 12 3.515 12 3.515s-7.53 0-9.388.54a3.003 3.003 0 0 0-2.11 2.108c-.54 1.85-.54 5.717-.54 5.717s0 3.868.54 5.718a3.003 3.003 0 0 0 2.11 2.108c1.858.54 9.388.54 9.388.54s7.53 0 9.388-.54a3.003 3.003 0 0 0 2.11-2.108c.54-1.85.54-5.718.54-5.718s0-3.868-.54-5.717zm-13.886 9.42V8.18l6.21 3.702-6.21 3.7z" />
  </svg>
);

const BrandRedditIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z"/>
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165"/>
  </svg>
);

const BrandDiscordIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 127.14 96.36" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.53-2a75.58,75.58,0,0,0,73,0c.81.71,1.65,1.4,2.53,2a68.43,68.43,0,0,1-10.5,5A77.7,77.7,0,0,0,95.14,96.36a105.73,105.73,0,0,0,31-18.83C130,51,123.36,28.24,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.14,46,96.14,53,91,65.69,84.69,65.69Z" />
  </svg>
);

const BrandFacebookIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const BrandInstagramIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const BrandTikTokIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.18 1.12 1.09 2.69 1.66 4.22 1.75v3.9c-1.43-.01-2.86-.33-4.13-1.01-.13-.07-.26-.15-.4-.23V14.5c.06 1.73-.42 3.52-1.52 4.86-1.12 1.36-2.84 2.25-4.59 2.45-1.93.22-3.99-.21-5.54-1.44-1.54-1.22-2.5-3.15-2.53-5.11-.04-2.22 1.05-4.42 2.87-5.69 1.62-1.14 3.76-1.55 5.67-1.1v3.91c-1.04-.3-2.19-.13-3.11.45-.88.56-1.42 1.58-1.42 2.63-.01 1.01.52 1.99 1.36 2.54.85.56 1.93.68 2.88.31.63-.25 1.19-.71 1.52-1.31.25-.46.36-.98.35-1.51V.02z" />
  </svg>
);

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'Android':
      return <AndroidIcon />;
    case 'iOS':
      return <AppleIcon />;
    case 'PC':
      return <PcIcon />;
    case 'Switch':
      return <SwitchIcon />;
    case 'PS5':
      return <PlaystationIcon />;
    default:
      return null;
  }
};

const getEngineIcon = (engine: string) => {
  const norm = engine.toLowerCase();
  if (norm.includes('unreal')) {
    return <UnrealIcon />;
  }
  if (norm.includes('unity')) {
    return <UnityIcon />;
  }
  return null;
};

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

const Banner = styled(Link)<{ $color: string; $image?: string }>`
  position: relative;
  height: 10rem;
  background-color: ${({ $color }) => $color};
  ${({ $image }) => $image && `
    background-image: url(${$image});
    background-size: cover;
    background-position: center top;
  `}
  overflow: hidden;
  display: block;
  text-decoration: none;

  @media (max-width: 600px) {
    height: 8rem;
  }
`;

const IconLink = styled(Link)`
  display: flex;
  flex-shrink: 0;
  text-decoration: none;
  outline: none;
  border-radius: 0.6rem;
  overflow: hidden;
`;

const GameNameLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline: none;
  min-width: 0;
  display: block;

  &:hover h3 {
    color: var(--primary-accent, #3b82f6);
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
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
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
  justify-content: space-between;
  gap: 0.75rem;
`;

const FollowLabel = styled.span`
  font-size: 0.78rem;
  color: var(--global-text-muted);
  font-weight: 600;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SocialGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 1;
  min-width: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a<{ $hoverColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 0.35rem;
  border: 1px solid var(--global-border);
  background: var(--global-card-bg);
  color: var(--global-text-muted);
  transition: all 0.15s ease-in-out;
  flex-shrink: 0;

  &:hover {
    color: ${({ $hoverColor }) => $hoverColor};
    border-color: ${({ $hoverColor }) => $hoverColor}dd;
    background: var(--global-secondary-bg);
    transform: translateY(-1px);
  }

  svg {
    display: block;
    flex-shrink: 0;
  }
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
      <Banner to={`/game/${game.id}`} $color={game.bannerColor} $image={game.bannerImage}>
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
            <IconLink to={`/game/${game.id}`}>
              <GameIconImg src={game.profileImage} alt={game.name} />
            </IconLink>
          ) : (
            <IconLink to={`/game/${game.id}`}>
              <GameIcon $color={game.bannerColor + 'cc'}>
                {game.iconInitials ?? game.name.slice(0, 2).toUpperCase()}
              </GameIcon>
            </IconLink>
          )}
          <GameMeta>
            <GameNameLink to={`/game/${game.id}`}>
              <GameName title={game.name}>{game.name}</GameName>
            </GameNameLink>
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
          {game.description.length > 180 && (
            <ReadMoreBtn onClick={() => setExpanded((v) => !v)}>
              {expanded ? (
                <>Show less <FiChevronUp size={12} /></>
              ) : (
                <>Read more <FiChevronDown size={12} /></>
              )}
            </ReadMoreBtn>
          )}
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
                  {getPlatformIcon(p)}
                  <span>{p}</span>
                </PlatformBadge>
              ))}
            </PlatformBadges>
          </PlatformsGroup>
          {game.engine && (
            <EngineGroup>
              <PlatformLabel>Engine:</PlatformLabel>
              <EngineBadge>
                {getEngineIcon(game.engine)}
                <span>{game.engine}</span>
              </EngineBadge>
            </EngineGroup>
          )}
        </PlatformsRow>

        <Divider />

        <FollowRow>
          <SocialGroup>
            <FollowLabel>Follow:</FollowLabel>
            {(() => {
              const socialLinksCount = [
                game.socialLinks?.website,
                game.socialLinks?.twitter,
                game.socialLinks?.youtube,
                game.socialLinks?.reddit,
                game.socialLinks?.discord,
                game.socialLinks?.facebook,
                game.socialLinks?.instagram,
                game.socialLinks?.tiktok
              ].filter(Boolean).length;

              const socialMediaElements = (
                <>
                  {game.socialLinks?.website && (
                    <SocialLink href={game.socialLinks.website} target="_blank" rel="noopener noreferrer" title="Official Website" $hoverColor="#3b82f6">
                      <BrandGlobeIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.twitter && (
                    <SocialLink href={game.socialLinks.twitter} target="_blank" rel="noopener noreferrer" title="X (Twitter)" $hoverColor="var(--global-text)">
                      <BrandXIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.youtube && (
                    <SocialLink href={game.socialLinks.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" $hoverColor="#ef4444">
                      <BrandYouTubeIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.reddit && (
                    <SocialLink href={game.socialLinks.reddit} target="_blank" rel="noopener noreferrer" title="Reddit" $hoverColor="#ff4500">
                      <BrandRedditIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.discord && (
                    <SocialLink href={game.socialLinks.discord} target="_blank" rel="noopener noreferrer" title="Discord" $hoverColor="#5865f2">
                      <BrandDiscordIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.facebook && (
                    <SocialLink href={game.socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" $hoverColor="#1877f2">
                      <BrandFacebookIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.instagram && (
                    <SocialLink href={game.socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" $hoverColor="#e1306c">
                      <BrandInstagramIcon size={13} />
                    </SocialLink>
                  )}
                  {game.socialLinks?.tiktok && (
                    <SocialLink href={game.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok" $hoverColor="#fe2c55">
                      <BrandTikTokIcon size={13} />
                    </SocialLink>
                  )}
                </>
              );

              return socialLinksCount > 4 ? (
                <ScrollableSocialContainer $variant="card">
                  {socialMediaElements}
                </ScrollableSocialContainer>
              ) : (
                <SocialLinks>
                  {socialMediaElements}
                </SocialLinks>
              );
            })()}
          </SocialGroup>
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
