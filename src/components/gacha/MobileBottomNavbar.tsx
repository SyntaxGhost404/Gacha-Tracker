import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Gamepad2, Newspaper, MoreHorizontal, Clock, MessageSquare, Settings } from 'lucide-react';

const BottomBarContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.25rem;
  background-color: var(--global-card-bg);
  border-top: 1px solid var(--global-border);
  box-shadow: 0 -4px 12px var(--global-card-shadow);
  z-index: 99;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(${({ $visible }) => ($visible ? '0' : '100%')});
  padding-bottom: env(safe-area-inset-bottom, 0);

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavTab = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: var(--global-text-muted);
  text-decoration: none;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  gap: 0.25rem;
  transition: color 0.2s, background-color 0.2s;
  position: relative;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.2s;
  }

  &:hover {
    color: var(--global-text);
  }

  &.active {
    color: var(--primary-accent);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

const DummyTab = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: ${({ $active }) => ($active ? 'var(--primary-accent)' : 'var(--global-text-muted)')};
  cursor: pointer;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  gap: 0.25rem;
  transition: color 0.15s;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.2s;
    transform: ${({ $active }) => ($active ? 'scale(1.1)' : 'scale(1)')};
  }

  &:hover {
    color: var(--global-text);
  }

  &:focus {
    outline: none;
  }
`;

const OthersWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const PopupMenu = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 100%;
  right: 0.5rem;
  width: 14rem;
  background-color: var(--global-card-bg);
  border: 1px solid var(--global-border);
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--global-border-radius, 0.4rem);
  border-top-right-radius: var(--global-border-radius, 0.4rem);
  box-shadow: 0 -4px 12px var(--global-card-shadow);
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  padding: 0.5rem;
  z-index: 100;
  animation: slideUpPopup 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: -1px; /* Flush layout: overlaps the 1px top border of the bottom navbar directly */

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 1px;
    right: 1px;
    height: 3px;
    background-color: var(--global-card-bg);
    z-index: 101;
  }

  @keyframes slideUpPopup {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PopupItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.65rem 0.75rem;
  background: none;
  border: none;
  border-radius: calc(var(--global-border-radius, 0.4rem) - 0.1rem);
  color: var(--global-text);
  font-size: 0.85rem;
  font-weight: 550;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;

  svg {
    width: 1rem;
    height: 1rem;
    color: var(--global-text-muted);
  }

  &:hover:not(:disabled) {
    background-color: var(--global-secondary-bg);
    color: var(--primary-accent);

    svg {
      color: var(--primary-accent);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--global-text-muted);
  }
`;

interface MobileBottomNavbarProps {
  visible: boolean;
}

export function MobileBottomNavbar({ visible }: MobileBottomNavbarProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close popup on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setPopupOpen(false);
      }
    }
    
    if (popupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupOpen]);

  // Close popup when path changes
  useEffect(() => {
    setPopupOpen(false);
  }, [location.pathname]);

  const isOthersRouteActive = location.pathname === '/changelog' || location.pathname === '/feedback';

  return (
    <BottomBarContainer $visible={visible}>
      <NavTab to="/" end>
        <Home />
        <span>Home</span>
      </NavTab>

      <NavTab to="/games">
        <Gamepad2 />
        <span>Games</span>
      </NavTab>

      <NavTab to="/news">
        <Newspaper />
        <span>News</span>
      </NavTab>

      <OthersWrapper ref={popupRef}>
        <DummyTab 
          onClick={() => setPopupOpen(!popupOpen)} 
          $active={popupOpen || isOthersRouteActive}
        >
          <MoreHorizontal />
          <span>Others</span>
        </DummyTab>

        <PopupMenu $visible={popupOpen}>
          <PopupItem onClick={() => navigate('/changelog')}>
            <Clock />
            <span>Changelog</span>
          </PopupItem>
          <PopupItem onClick={() => navigate('/feedback')}>
            <MessageSquare />
            <span>Feedback</span>
          </PopupItem>
          <PopupItem disabled title="Experimental option coming soon">
            <Settings />
            <span>Settings</span>
          </PopupItem>
        </PopupMenu>
      </OthersWrapper>
    </BottomBarContainer>
  );
}
