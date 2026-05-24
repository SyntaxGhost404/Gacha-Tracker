import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Layout, 
  Settings, 
  ExternalLink,
  Bookmark,
  Check,
  ShieldAlert,
  HelpCircle,
  Clock,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { FiGlobe, FiTwitter, FiYoutube } from 'react-icons/fi';
import { 
  gachaGames, 
  type GachaGame, 
  STATUS_LABELS, 
  REGION_COLORS 
} from '../../data/gachaGames';
import { useWatchlist } from '../../context/WatchlistContext';

// Scalable, crisp inline SVG brand logos for platforms & engines
const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-5.48-4.14l1.23-1.23c.2-.2.2-.51 0-.71a.495.495 0 0 0-.71 0L14.2 3.25C13.51 2.94 12.77 2.77 12 2.77c-.77 0-1.51.17-2.2.49L8.47 1.93a.495.495 0 0 0-.71 0c-.2.2-.2.51 0 .71l1.23 1.23C7.4 5.17 6.4 7.03 6.13 9.23h11.75c-.28-2.2-1.28-4.06-2.86-5.37zM9 7.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm6 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z" />
  </svg>
);

const PcIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SwitchIcon = () => (
  <svg viewBox="0 0 100 100" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="m22.1 1.1c-9 1.1-16.8 7.9-19.9 16.5-1.5 4.2-1.5 5.2-1.4 32.1 0.1 26.3 0.1 28 0.8 30.3 2.3 8.6 8.1 15.1 15.8 17.9 1.5 0.6 3.6 1.2 4.7 1.3 1.1 0.2 7.2 0.3 13.5 0.3 8.9 0.1 12.3 0 12.4-0.2 0.3-0.3 0.4-8.6 0.3-49.4 0-27.5-0.1-48.3-0.2-48.8s-0.5-0.5-12.1-0.4c-6.5 0-12.8 0.1-13.9 0.4zm18.3 48.9v41.7l-7.9-0.1c-7.1 0-9.2-0.1-10.8-0.5-5.6-1.3-10.3-5.4-12.2-10.9-0.9-2.5-0.9-2.8-1-25 0-12.3 0-25 0.2-32.1 0.7-5.5 5.6-12 12.2-14.1 1.8-0.6 3.2-0.6 9.8-0.7h9.7v41.7z"/>
    <path d="m22.7 21.1c-4 1.2-6.9 4.3-7 8.3 0 1.1 0.1 2.4 0.4 3.2 1 2.7 2.8 4.8 5.6 6 0.9 0.5 1.9 0.7 4 0.7 3.8 0.1 8.7-3.3 9-8.4 0.3-5.9-4.7-10.9-10.2-10.1-0.4 0-1.2 0.1-1.8 0.3z"/>
    <path d="m58.4 0.9c-0.2 0.3-0.2 98.2 0.2 98.5 0.2 0.2 5.4 0.2 10.8 0.2 8.6-0.1 8.7-0.1 11.5-0.7 7.1-1.6 13.2-6.5 16.1-12.7 2.3-5.2 2.3-5.3 2.2-33.8 0-25.1 0-29.8-0.8-32.4-2.3-8.9-9.1-15.7-17.6-18.3-2.7-0.8-3.3-0.9-12.4-0.9-5.1 0-9.8 0-10 0.1zm24 45.1c2.1 1 4.1 3.1 5 5.6 0.6 1.7 0.7 4.6 0.1 6.5-2.1 5.5-7.9 7.9-12.9 5.8-2.6-1.1-5-3.4-6.1-6.5-0.4-1.4-0.4-4.1 0-5.4 1.4-4.5 5.9-7.4 10.4-7 1 0.1 2.6 0.4 3.5 1z"/>
  </svg>
);

const PlaystationIcon = () => (
  <svg viewBox="0 0 128 128" width="12" height="12" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
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
  <svg viewBox="0 0 150 150" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="m75 4.7c-38.5 0-69.9 31.1-69.9 70.7 0 38.4 30.2 69.9 69.9 69.9 39.3 0 70.3-30.6 70.3-69.9 0-33.6-28.5-70.7-70.3-70.7zm-0.4 6.2c34.2 0 64.6 28.3 64.6 64.5 0 34-26.6 63.7-64.6 63.7-34.5 0-63.8-27.1-63.8-63.7 0-32.9 27-64.5 63.8-64.5z"/>
    <path d="m122.9 86.6c-0.6-1.9-3.4-2.9-5-1.2-3 2.6-6.8 5.4-14.1 5.8v-34.7c2.4-5.2 6.5-11.7 12.3-17.9 1.8-1.9 0.4-5.4-2.5-5.1-9.5 0.3-21.8 7.7-30.2 17.4l-1.9 3.2c-0.2 0.6-0.5 1.1-0.4 1.9v36.1c-4.5 2.1-7.2 2.2-9.4 0.4v-59.2c0-2-2.2-3.9-4.5-2.8-15.6 5.9-26.9 15.5-36.2 30.6-3.7 6.2-6.5 13-8.9 21.9-1 3.6 3 6 5.2 3.5 3.4-3.7 8.8-12.7 13.5-16.6 2.1-1.7 5.1-2.8 8.5-2.9v30.1h-6.8c-2.4 0-4.2 2.5-2.6 4.9 6.5 9.1 20.1 17.2 35.2 17.9 0.9 0 1.4-0.1 1.6-0.4l8-7.8 7.8 4.8c1 0.5 2.1 0.7 3 0.4 7.8-2.2 20.4-12.4 27.4-27.6 0.5-0.9 0.5-1.9 0-2.7zm-27.7 24.1-8.8-5.9c-1.3-0.9-3.1-1.4-4.6 0l-8.1 9c-7.2-0.3-15.6-3.9-23.5-10h2.3c2 0 3.4-1.2 3.4-3.2l-0.1-36.6c0-1.7-1.4-3-3-3h-4.2c-3.9 0-7.8 1.3-11.7 4.4 5.6-10 14.5-20.9 28.5-27.5l0.1 56.1c0 1 0.5 1.8 1.2 2.4 5 4.3 10.2 5.4 18.9 0.5 1.1-0.4 2.1-1.5 2.1-2.8v-37.4c3.8-6.1 9.9-11.3 17-14.9-2.5 3.6-5.2 8-7.2 13l-0.1 38.9c0.1 1.9 1.5 3.2 3.2 3.3 4.2 0.5 7.6 0.2 10-0.5-5.2 6.7-11.5 12.3-15.4 14.2z"/>
  </svg>
);

const UnityIcon = () => (
  <svg viewBox="0 0 125 140" width="12" height="12" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
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
    case 'Playstation':
    case 'PlayStation':
    case 'PS4':
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

// Scalable developer & publisher lookup map since index schema is not in database-wide JSON entries yet
const GAME_DETAILS_EXTENSIONS: Record<string, { developer: string; publisher: string }> = {
  allfiring: { developer: 'Prometheus Studio', publisher: 'HERO Games' },
  'hololive-dreams': { developer: 'Cover Corporation & QualiArts', publisher: 'Cover Corporation' },
  ananta: { developer: 'Naked Rain Studio', publisher: 'NetEase Games' },
  'azur-promilia': { developer: 'Manjuu Co.', publisher: 'Manjuu Co.' },
  'chasing-kaleidorider': { developer: 'Papergames', publisher: 'Infold Games' },
  'codename-bang-bang': { developer: 'YoMioBeYoung', publisher: 'Yostar' },
  'digimon-alysion': { developer: 'Bandai Namco Entertainment', publisher: 'Bandai Namco' },
  'ete-shattered-skie': { developer: 'E.T.E Studio', publisher: 'CHENS GLOBAL LIMITED' },
  'honkai-nexus-anima': { developer: 'miHoYo', publisher: 'Cognosphere / miHoYo' },
  'illusion-connect-re': { developer: 'SuperPrism Technology', publisher: 'SuperPrism' },
  'kings-raid-revival': { developer: 'Vespa (Revived Team)', publisher: 'Vespa' },
  'last-origin-r-plus': { developer: 'Studio Vala / SmartJoy', publisher: 'PiG Corporation' },
  'miresi-invisible-future': { developer: 'Miresi Studio', publisher: 'Nexon' },
  'monster-hunter-outlanders': { developer: 'TiMi Studio Group', publisher: 'Capcom / Tencent' },
  'petit-planet': { developer: 'Petit Team', publisher: 'Yostar' },
  'project-2-3': { developer: 'Project 2/3 Studio', publisher: 'Yostar' },
  'rewinding-cadence': { developer: 'Yostar', publisher: 'Yostar' },
  'scarlet-tide-zeroera': { developer: 'YoMioBeYoung', publisher: 'YoMioBeYoung' },
  'silver-palace': { developer: 'Elementa Studio', publisher: 'Elementa' },
  terbis: { developer: 'Webzen', publisher: 'Webzen' },
};

const PageWrapper = styled.div`
  padding-top: 0;
  min-height: 100vh;
  background: var(--global-primary-bg);
  color: var(--global-text);
`;

const PageInner = styled.div`
  max-width: 68rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem 3rem;
  }
`;

const TopNavContainer = styled.div`
  max-width: 68rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 1.5rem 0rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavigationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    display: none; /* Hide top back navigation link on mobile viewports as per requirements */
  }
`;

const BackToDashBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.95rem;
  border-radius: var(--global-border-radius, 0.4rem);
  border: 1px solid var(--global-border);
  background: var(--global-button-bg, var(--global-card-bg));
  color: var(--global-text-muted);
  font-size: 0.82rem;
  font-weight: 650;
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    background: var(--global-button-hover-bg, var(--global-secondary-bg));
    color: var(--global-text);
    border-color: var(--global-text-muted);
  }
`;

const BannerContainer = styled.div<{ $color: string }>`
  position: relative;
  width: 100%;
  background-color: ${({ $color }) => $color};
  overflow: hidden;
  border-bottom: 1px solid var(--global-border);
  display: block;
`;

const BannerImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 28rem; /* Set an elegant max-height for large screens so it doesn't span too long vertically */
  
  @media (max-width: 768px) {
    min-height: 11rem;
    max-height: 18rem;
  }
`;

const BannerColorFallback = styled.div<{ $color: string }>`
  width: 100%;
  height: 18rem;
  background-color: ${({ $color }) => $color};
  display: block;

  @media (max-width: 768px) {
    height: 11rem;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.15) 45%, 
    rgba(0, 0, 0, 0.6) 80%, 
    var(--global-primary-bg) 100%
  );
  pointer-events: none;
`;

const BannerBadgesLeft = styled.div`
  position: absolute;
  top: 1.25rem;
  left: 1.5rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;

  @media (max-width: 768px) {
    left: 1rem;
    top: 1rem;
  }
`;

const BannerBadge = styled.span`
  padding: 0.25rem 0.65rem;
  border-radius: 0.25rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  text-transform: uppercase;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  margin-top: -4.5rem;
  padding: 0 1rem;
  position: relative;
  z-index: 5;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -3.5rem;
    gap: 0.75rem;
  }
`;

const BigProfileImage = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 1.25rem;
  object-fit: cover;
  border: 4px solid var(--global-card-bg);
  background: var(--global-card-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 7rem;
    height: 7rem;
    border-radius: 1rem;
  }
`;

const FallbackProfileInitials = styled.div<{ $color: string }>`
  width: 9rem;
  height: 9rem;
  border-radius: 1.25rem;
  background: ${({ $color }) => $color};
  border: 4px solid var(--global-card-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.82);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 7rem;
    height: 7rem;
    border-radius: 1rem;
    font-size: 2rem;
  }
`;

const HeaderTitles = styled.div`
  flex: 1;
  padding-bottom: 0.5rem;
  min-width: 0;
`;

const GameTitleText = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 850;
  color: var(--global-text);
  line-height: 1.2;
  margin: 0 0 0.35rem;
  letter-spacing: -0.03em;
`;

const AltTitleText = styled.p`
  font-size: 0.95rem;
  font-weight: 550;
  color: var(--global-text-muted);
  margin: 0 0 0.75rem;
`;

const HeaderBadgesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const GenreTag = styled.span`
  padding: 0.22rem 0.65rem;
  border-radius: 0.3rem;
  font-size: 0.76rem;
  font-weight: 700;
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  border: 1px solid var(--global-border);
`;

const RegionTag = styled.span<{ $color: string }>`
  padding: 0.22rem 0.65rem;
  border-radius: 0.3rem;
  font-size: 0.76rem;
  font-weight: 700;
  background: ${({ $color }) => $color}18;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}30;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 2rem;
  margin-top: 2.2rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const MainVolume = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionCard = styled.div`
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.6rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px var(--global-card-shadow, rgba(0, 0, 0, 0.02));
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 750;
  color: var(--global-text);
  margin: 0 0 1rem;
  border-bottom: 1px solid var(--global-border);
  padding-bottom: 0.6rem;

  svg {
    opacity: 0.75;
    color: var(--primary-accent);
  }
`;

const ParagraphText = styled.p`
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--global-text);
  opacity: 0.95;
  margin: 0 0 1rem;
  &:last-child {
    margin: 0;
  }
`;

const SidebarVolume = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const KeyValueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const KeyValueRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.84rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px dotted var(--global-border);
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
`;

const KeyLabel = styled.span`
  color: var(--global-text-muted);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  @media (max-width: 768px) {
    font-size: 0.78rem;
    text-align: left;
  }
`;

const ValueLabel = styled.span`
  color: var(--global-text);
  font-weight: 700;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
    width: 100%;
    font-size: 0.92rem;
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
  vertical-align: middle;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #f59e0b;
    flex-shrink: 0;
  }
`;

const DateValueContainer = styled(ValueLabel)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const PlatformPillGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: flex-start;
    width: 100%;
    margin-top: 0.15rem;
  }
`;

const PlatformMicroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.15rem 0.45rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  background: var(--global-secondary-bg);
  border: 1px solid var(--global-border);
  color: var(--global-text);
`;

const FollowWidget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const FollowBtn = styled.button<{ $active: boolean }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border-radius: 0.4rem;
  border: 1px solid var(--global-border);
  background: ${({ $active }) =>
    $active ? 'var(--global-tertiary-bg, rgba(255, 255, 255, 0.05))' : 'var(--global-text)'};
  color: ${({ $active }) =>
    $active ? 'var(--global-text)' : 'var(--global-primary-bg)'};
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    opacity: 0.95;
    background: ${({ $active }) =>
      $active ? 'var(--global-secondary-bg)' : 'var(--global-text)'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const GridSocialContainer = styled.div<{ $socialsCount: number }>`
  box-sizing: border-box;
  width: 100%;
  margin-top: 0.5rem;

  /* If socials > 4 */
  ${({ $socialsCount }) =>
    $socialsCount > 4
      ? `
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 0.5rem;
        justify-items: center;
        align-items: center;
        
        /* On very big desktops where horizontal space is ample, display in a single horizontal line */
        @media (min-width: 1400px) {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: nowrap;
          gap: 0.5rem;
        }
      `
      : `
        /* If 4 or fewer socials: always standard static horizontal row */
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
      `}
`;

const SocialRoundBtn = styled.a<{ $hoverColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.22rem;
  height: 2.22rem;
  border-radius: 50%;
  border: 1px solid var(--global-border);
  background: var(--global-secondary-bg);
  color: var(--global-text-muted);
  transition: all 0.15s ease-in-out;
  flex-shrink: 0;

  &:hover, &:active {
    color: ${({ $hoverColor }) => $hoverColor};
    border-color: ${({ $hoverColor }) => $hoverColor}dd;
    background: var(--global-secondary-bg);
    transform: translateY(-1px);
  }
`;

const PreRegGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

const PreRegButton = styled.a<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 1.25rem;
  border-radius: var(--global-border-radius, 0.4rem);
  border: 1px solid var(--global-border);
  background: ${props => props.$disabled ? 'rgba(255, 255, 255, 0.03)' : 'var(--global-button-bg, var(--global-secondary-bg))'};
  color: ${props => props.$disabled ? 'var(--global-text-muted, rgba(255, 255, 255, 0.35))' : 'var(--global-text)'};
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.15s ease-in-out;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  border-color: ${props => props.$disabled ? 'rgba(255, 255, 255, 0.05)' : 'var(--global-border)'};

  ${props => !props.$disabled && `
    &:hover {
      background: var(--global-button-hover-bg, var(--global-tertiary-bg));
      border-color: var(--primary-accent, #3b82f6);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}

  i {
    font-size: 1.15rem;
    flex-shrink: 0;
  }
  
  svg {
    flex-shrink: 0;
  }
`;

const ErrorState = styled.div`
  max-width: 32rem;
  margin: 5rem auto;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 0.6rem;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.55rem;
  font-weight: 850;
  color: var(--global-text);
  margin: 0;
`;

function useDetailedCountdown(dateStr: string | undefined) {
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

  return { exact: `${days} Days, ${hours} Hours, ${mins} Mins`, relative: `In ${days} Days` };
}

function formatDateFull(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toggle, isWatchlisted } = useWatchlist();

  // Find game details
  const game = useMemo(() => {
    return gachaGames.find((g) => g.id === id);
  }, [id]);

  const followed = game ? isWatchlisted(game.id) : false;
  const countdown = useDetailedCountdown(game?.releaseDate);

  // Extract developer & publisher info
  const metaExt = useMemo(() => {
    if (!game) return { developer: 'N/A', publisher: 'N/A' };
    return GAME_DETAILS_EXTENSIONS[game.id] || { developer: 'Community Submitted', publisher: 'N/A' };
  }, [game]);

  if (!game) {
    return (
      <PageWrapper id="game-error-wrapper">
        <PageInner>
          <ErrorState id="gamedetail-error-state">
            <ShieldAlert size={44} style={{ color: 'var(--primary-accent)', opacity: 0.8 }} />
            <ErrorTitle id="gamedetail-error-title">Title Index Not Found</ErrorTitle>
            <p style={{ color: 'var(--global-text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>
              The gacha title listing you are targeting does not seem to exist or may have been unlisted from our tracking database.
            </p>
            <Link
              to="/games"
              id="return-to-tracking-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '0.35rem',
                background: 'var(--global-text)',
                color: 'var(--global-primary-bg)',
                fontWeight: 700,
                fontSize: '0.82rem',
                textDecoration: 'none',
                transition: 'opacity 0.15s ease'
              }}
            >
              <ArrowLeft size={13} /> Return to Game Tracker
            </Link>
          </ErrorState>
        </PageInner>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper id={`game-detail-wrapper-${game.id}`}>
      <TopNavContainer id="game-detail-top-nav-container">
        <NavigationRow id="game-detail-back-navigation">
          <BackToDashBtn to={game.status === 'Released' ? '/archive' : '/games'} id="game-detail-back-button">
            <ArrowLeft size={12} /> Back to Directory
          </BackToDashBtn>
        </NavigationRow>
      </TopNavContainer>

      <BannerContainer id="game-detail-banner-container" $color={game.bannerColor}>
        {game.bannerImage ? (
          <BannerImg src={game.bannerImage} alt={game.name} id="game-detail-banner-image" />
        ) : (
          <BannerColorFallback $color={game.bannerColor} id="game-detail-banner-color-fallback" />
        )}
        <BannerOverlay />
        <BannerBadgesLeft>
          <BannerBadge>{STATUS_LABELS[game.status]}</BannerBadge>
          {game.devStatus && <BannerBadge>{game.devStatus.toUpperCase()}</BannerBadge>}
        </BannerBadgesLeft>
      </BannerContainer>

      <PageInner id="game-detail-inner">
        <ProfileSection id="game-detail-profile-section">
          {game.profileImage ? (
            <BigProfileImage src={game.profileImage} alt={game.name} id="game-detail-profile-image" />
          ) : (
            <FallbackProfileInitials $color={game.bannerColor} id="game-detail-profile-fallback">
              {game.iconInitials ?? game.name.slice(0, 2).toUpperCase()}
            </FallbackProfileInitials>
          )}

          <HeaderTitles id="game-detail-header-titles">
            <GameTitleText id="game-detail-title">{game.name}</GameTitleText>
            {game.alternativeName && (
              <AltTitleText id="game-detail-alternative-title">
                Also known as: {game.alternativeName}
              </AltTitleText>
            )}
            <HeaderBadgesRow id="game-detail-badges">
              <GenreTag id="game-detail-genre">{game.genre}</GenreTag>
              {game.regions.map((region) => (
                <RegionTag key={region} $color={REGION_COLORS[region]} id={`game-detail-region-${region}`}>
                  {region}
                </RegionTag>
              ))}
            </HeaderBadgesRow>
          </HeaderTitles>
        </ProfileSection>

        <DetailGrid id="game-detail-grid">
          <MainVolume id="game-detail-main-column">
            <SectionCard id="game-overview-card">
              <ParagraphText id="game-overview-description">
                {game.description}
              </ParagraphText>
            </SectionCard>

            {game.status === 'Pre-registration' && (
              <SectionCard id="game-pre-registration-campaign-card">
                <SectionTitle id="game-pre-registration-title">
                  Pre-Registration
                </SectionTitle>
                
                {countdown && (
                  <div 
                    id="game-detail-countdown-box"
                    style={{ 
                      marginBottom: '1.25rem', 
                      padding: '0.85rem 1.15rem', 
                      background: 'var(--global-secondary-bg)', 
                      border: '1px solid var(--global-border)', 
                      borderRadius: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', fontWeight: 650, display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--global-text-muted)' }}>
                      <Clock size={13} /> Exclusive Launch Countdown:
                    </span>
                    <span style={{ fontSize: '0.84rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--primary-accent)' }}>
                      {countdown.exact}
                    </span>
                  </div>
                )}

                <PreRegGrid id="game-pre-registration-grid">
                  {game.preRegistrationLinks && game.preRegistrationLinks.map((link, idx) => (
                    <PreRegButton 
                      key={idx} 
                      href={link.disabled ? undefined : link.url}
                      $disabled={link.disabled}
                      target={link.disabled ? undefined : "_blank"}
                      rel={link.disabled ? undefined : "noopener noreferrer"}
                      id={`prereg-btn-${game.id}-${idx}`}
                      onClick={(e) => {
                        if (link.disabled) e.preventDefault();
                      }}
                    >
                      {link.iconType === 'globe' ? (
                        <FiGlobe size={16} />
                      ) : (
                        <i 
                          className={link.iconClass} 
                          style={{ color: link.disabled ? 'inherit' : '#ffffff' }} 
                        />
                      )}
                      <span>{link.label}</span>
                    </PreRegButton>
                  ))}
                </PreRegGrid>
              </SectionCard>
            )}

            <SectionCard id="game-specs-card">
              <SectionTitle id="game-specs-title">
                Technical Specifications
              </SectionTitle>
              <KeyValueList id="game-technical-keys">
                <KeyValueRow>
                  <KeyLabel>Production Engine</KeyLabel>
                  <ValueLabel>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', verticalAlign: 'middle' }}>
                      {game.engine ? (
                        <>
                          {getEngineIcon(game.engine)}
                          <span>{game.engine}</span>
                        </>
                      ) : (
                        'N/A'
                      )}
                    </span>
                  </ValueLabel>
                </KeyValueRow>
                <KeyValueRow>
                  <KeyLabel>Developer</KeyLabel>
                  <ValueLabel>{metaExt.developer}</ValueLabel>
                </KeyValueRow>
                <KeyValueRow>
                  <KeyLabel>Publisher/Distributor</KeyLabel>
                  <ValueLabel>{metaExt.publisher}</ValueLabel>
                </KeyValueRow>
              </KeyValueList>
            </SectionCard>
          </MainVolume>

          <SidebarVolume id="game-detail-sidebar">
            <SectionCard id="game-meta-card">
              <SectionTitle id="game-meta-title">
                Game Specs
              </SectionTitle>
              <KeyValueList id="game-metadata-keys">
                <KeyValueRow>
                  <KeyLabel>Category</KeyLabel>
                  <ValueLabel>{game.genre}</ValueLabel>
                </KeyValueRow>
                <KeyValueRow>
                  <KeyLabel>Release Status</KeyLabel>
                  <ValueLabel>{STATUS_LABELS[game.status]}</ValueLabel>
                </KeyValueRow>
                {game.devStatus && (
                  <KeyValueRow>
                    <KeyLabel>Beta Info</KeyLabel>
                    <ValueLabel>{game.devStatus}</ValueLabel>
                  </KeyValueRow>
                )}
                <KeyValueRow>
                  <KeyLabel>Release Date</KeyLabel>
                  <DateValueContainer>
                    <span>{game.releaseDate ? formatDateFull(game.releaseDate) : 'TBA'}</span>
                    {game.releaseDateConfirmed === false && (
                      <UnconfirmedBadge>
                        UNCONFIRMED
                      </UnconfirmedBadge>
                    )}
                  </DateValueContainer>
                </KeyValueRow>
                <KeyValueRow>
                  <KeyLabel>Platforms</KeyLabel>
                  <PlatformPillGroup>
                    {game.platforms.map((p) => (
                      <PlatformMicroBadge key={p}>
                        {getPlatformIcon(p)}
                        <span>{p}</span>
                      </PlatformMicroBadge>
                    ))}
                  </PlatformPillGroup>
                </KeyValueRow>
              </KeyValueList>
            </SectionCard>

            <SectionCard id="game-action-watchlist">
              <SectionTitle id="game-action-title">
                Watchlist
              </SectionTitle>
              <FollowWidget id="game-watchlist-widget">
                <FollowBtn 
                  id="game-detail-watchlist-button"
                  $active={followed}
                  onClick={() => toggle(game.id)}
                >
                  {followed ? (
                    <>
                      <Check size={14} strokeWidth={2.5} /> Following
                    </>
                  ) : (
                    <>
                      <Bookmark size={14} /> Bookmark Title
                    </>
                  )}
                </FollowBtn>

                <p style={{ fontSize: '0.74rem', color: 'var(--global-text-muted)', textAlign: 'center', margin: '0.2rem 0 0.5rem', lineHeight: '1.4' }}>
                  {followed 
                    ? 'This title is saved in your watchlist database, synced live on your dashboard pipeline.'
                    : 'Toggle watch to track status changes and custom schedules live on your dashboard.'}
                </p>

                <SectionTitle id="game-social-title" style={{ fontSize: '0.85rem', borderBottom: '1px solid var(--global-border)', paddingBottom: '0.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                  Connect/Share
                </SectionTitle>
                {(() => {
                  const socialsCount = [
                    game?.socialLinks?.website,
                    game?.socialLinks?.twitter,
                    game?.socialLinks?.youtube,
                    game?.socialLinks?.reddit,
                    game?.socialLinks?.discord,
                    game?.socialLinks?.facebook,
                    game?.socialLinks?.instagram,
                    game?.socialLinks?.tiktok
                  ].filter(Boolean).length;

                  const socialMediaElements = (
                    <>
                      {game?.socialLinks?.website && (
                        <SocialRoundBtn 
                          href={game.socialLinks.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Official Website"
                          $hoverColor="#3b82f6"
                          id="social-link-website"
                        >
                          <BrandGlobeIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.twitter && (
                        <SocialRoundBtn 
                          href={game.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="X (Twitter)"
                          $hoverColor="var(--global-text)"
                          id="social-link-twitter"
                        >
                          <BrandXIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.youtube && (
                        <SocialRoundBtn 
                          href={game.socialLinks.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="YouTube"
                          $hoverColor="#ef4444"
                          id="social-link-youtube"
                        >
                          <BrandYouTubeIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.reddit && (
                        <SocialRoundBtn 
                          href={game.socialLinks.reddit} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Reddit"
                          $hoverColor="#ff4500"
                          id="social-link-reddit"
                        >
                          <BrandRedditIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.discord && (
                        <SocialRoundBtn 
                          href={game.socialLinks.discord} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Discord"
                          $hoverColor="#5865f2"
                          id="social-link-discord"
                        >
                          <BrandDiscordIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.facebook && (
                        <SocialRoundBtn 
                          href={game.socialLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Facebook"
                          $hoverColor="#1877f2"
                          id="social-link-facebook"
                        >
                          <BrandFacebookIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.instagram && (
                        <SocialRoundBtn 
                          href={game.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Instagram"
                          $hoverColor="#e1306c"
                          id="social-link-instagram"
                        >
                          <BrandInstagramIcon size={14} />
                        </SocialRoundBtn>
                      )}
                      {game?.socialLinks?.tiktok && (
                        <SocialRoundBtn 
                          href={game.socialLinks.tiktok} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="TikTok"
                          $hoverColor="#fe2c55"
                          id="social-link-tiktok"
                        >
                          <BrandTikTokIcon size={14} />
                        </SocialRoundBtn>
                      )}
                    </>
                  );

                  return (
                    <GridSocialContainer $socialsCount={socialsCount}>
                      {socialMediaElements}
                    </GridSocialContainer>
                  );
                })()}
              </FollowWidget>
            </SectionCard>
          </SidebarVolume>
        </DetailGrid>
      </PageInner>
    </PageWrapper>
  );
}
