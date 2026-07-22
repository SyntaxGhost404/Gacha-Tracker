import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Gamepad2, Newspaper, MoreHorizontal, Clock, MessageSquare, Settings } from 'lucide-react';

const BottomBarContainer = styled.nav<{ $visible: boolean }>`
  position: fixed;
  bottom: calc(0.65rem + env(safe-area-inset-bottom, 0px));
  left: 50%;
  width: min(32rem, calc(100% - 1.25rem));
  height: 4.35rem;
  background-color: var(--nav-bg);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  border: 1px solid var(--global-border-strong);
  border-radius: 1.2rem;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.38rem;

  /* Scroll Hide transition */
  transform: translate(-50%, ${({ $visible }) => ($visible ? '0' : 'calc(120% + 1rem)')});
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s;

  @media (min-width: 769px) {
    display: none; /* Only visible on Mobile & Tablet */
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--primary-accent-soft)' : 'transparent')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(155, 140, 255, 0.18)' : 'transparent')};
  border-radius: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  color: ${({ $active }) => ($active ? 'var(--primary-accent)' : 'var(--global-text-muted)')};
  font-size: 0.68rem;
  font-weight: ${({ $active }) => ($active ? '800' : '600')};
  cursor: pointer;
  width: 25%;
  height: 100%;
  transition: color 0.15s ease, transform 0.1s ease, background-color 0.18s ease, border-color 0.18s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: scale(${({ $active }) => ($active ? '1.1' : '1')});
  }

  &:hover {
    color: ${({ $active }) => ($active ? 'var(--primary-accent)' : 'var(--global-text)')};
  }

  &:active {
    transform: scale(0.94);
  }
`;

const PopupMenu = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: calc(100% + 0.75rem);
  right: 0.1rem;
  width: 12rem;
  background-color: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-radius: 1rem;
  box-shadow: 0 18px 48px var(--global-card-shadow);
  padding: 0.42rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  z-index: 100;

  /* Animation and display states */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.95)}) translateY(${({ $visible }) => ($visible ? '0' : '10px')});
  transform-origin: bottom right;
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s;

  /* Elegantly aligned caret/arrow pointing directly down above the OTHERS button center */
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 1.8rem;
    width: 10px;
    height: 10px;
    background-color: var(--global-card-bg);
    border-right: 1px solid var(--global-border);
    border-bottom: 1px solid var(--global-border);
    transform: rotate(45deg);
    transition: background-color 0.2s;
  }
`;

const PopupItem = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  background: none;
  border: none;
  width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 0.72rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: ${({ $disabled, $active }) => 
    $disabled 
      ? 'var(--global-text-muted)' 
      : $active 
        ? 'var(--primary-accent)' 
        : 'var(--global-text)'};
  background-color: ${({ $active }) => ($active ? 'rgba(128, 128, 207, 0.12)' : 'transparent')};
  opacity: ${({ $disabled }) => ($disabled ? '0.45' : '1')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? '750' : '600')};
  text-align: left;
  transition: background-color 0.15s, color 0.15s, transform 0.1s ease;
  -webkit-tap-highlight-color: transparent;

  svg {
    width: 0.95rem;
    height: 0.95rem;
    flex-shrink: 0;
    color: ${({ $active, $disabled }) => 
      $disabled 
        ? 'var(--global-text-muted)' 
        : $active 
          ? 'var(--primary-accent)' 
          : 'var(--global-text-muted)'};
    transition: color 0.15s;
  }

  &:hover {
    ${({ $disabled }) => !$disabled && `
      background-color: rgba(128, 128, 207, 0.12);
      color: var(--primary-accent);
      svg {
        color: var(--primary-accent);
      }
    `}
  }

  &:active {
    ${({ $disabled }) => !$disabled && 'transform: scale(0.98);'}
  }
`;

interface MobileBottomNavbarProps {
  visible?: boolean;
  popupOpen?: boolean;
  onPopupOpenChange?: (open: boolean) => void;
}

export function MobileBottomNavbar({ 
  visible = true, 
  popupOpen: controlledPopupOpen,
  onPopupOpenChange
}: MobileBottomNavbarProps) {
  const [localPopupOpen, setLocalPopupOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLElement>(null);

  const isPopupOpen = controlledPopupOpen !== undefined ? controlledPopupOpen : localPopupOpen;

  const setPopupOpen = useCallback((open: boolean) => {
    if (onPopupOpenChange) {
      onPopupOpenChange(open);
    } else {
      setLocalPopupOpen(open);
    }
  }, [onPopupOpenChange]);

  const activeTab = location.pathname;

  // Auto-close others menu on route change
  useEffect(() => {
    setPopupOpen(false);
  }, [location.pathname, setPopupOpen]);

  // Click outside to close the popup menu
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setPopupOpen]);

  const handleTabClick = (path: string) => {
    setPopupOpen(false);
    navigate(path);
  };

  const isOthersActive = ['/changelog', '/feedback', '/archive'].includes(activeTab) || isPopupOpen;

  return (
    <BottomBarContainer $visible={visible} ref={navbarRef}>
      <TabButton
        $active={activeTab === '/'}
        onClick={() => handleTabClick('/')}
        aria-label='Home'
      >
        <Home />
        <span>Home</span>
      </TabButton>

      <TabButton
        $active={activeTab.startsWith('/games')}
        onClick={() => handleTabClick('/games')}
        aria-label='Games'
      >
        <Gamepad2 />
        <span>Games</span>
      </TabButton>

      <TabButton
        $active={activeTab.startsWith('/news')}
        onClick={() => handleTabClick('/news')}
        aria-label='News'
      >
        <Newspaper />
        <span>News</span>
      </TabButton>

      <TabButton
        $active={isOthersActive}
        onClick={() => setPopupOpen(!isPopupOpen)}
        id='bottom-others-btn'
        aria-label='Others Menu'
        aria-haspopup='true'
        aria-expanded={isPopupOpen}
      >
        <MoreHorizontal />
        <span>Others</span>
      </TabButton>

      <PopupMenu $visible={isPopupOpen}>
        <PopupItem
          onClick={() => navigate('/archive')}
          id='popup-archive-btn'
          $active={activeTab === '/archive'}
        >
          <Gamepad2 />
          <span>Archive</span>
        </PopupItem>

        <PopupItem
          onClick={() => navigate('/changelog')}
          id='popup-changelog-btn'
          $active={activeTab === '/changelog'}
        >
          <Clock />
          <span>Changelog</span>
        </PopupItem>

        <PopupItem
          onClick={() => navigate('/feedback')}
          id='popup-feedback-btn'
          $active={activeTab === '/feedback'}
        >
          <MessageSquare />
          <span>Feedback</span>
        </PopupItem>

        <PopupItem
          $disabled={true}
          title='Settings — COMING SOON'
          id='popup-settings-btn'
          aria-disabled='true'
        >
          <Settings />
          <span>Settings</span>
        </PopupItem>
      </PopupMenu>
    </BottomBarContainer>
  );
}
