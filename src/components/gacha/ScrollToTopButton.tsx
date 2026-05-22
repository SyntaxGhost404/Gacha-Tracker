import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';

const FloatingButton = styled.button<{ $visible: boolean; $showBottomNav: boolean }>`
  position: fixed;
  bottom: ${({ $showBottomNav }) => ($showBottomNav ? '5.75rem' : '1.5rem')};
  right: 1.5rem;
  z-index: 99;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: var(--global-card-bg);
  color: var(--global-text);
  border: 1px solid var(--global-border);
  box-shadow: 0 4px 20px var(--global-card-shadow);
  cursor: pointer;
  
  border-radius: var(--global-border-radius, 0.4rem);
  padding: 0.75rem;

  /* Transition and Visibility states */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '15px')});
  transition: opacity 0.25s ease, transform 0.25s ease, bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s, color 0.2s;
  
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  &:hover {
    background: var(--global-secondary-bg);
    border-color: var(--primary-accent);
    color: var(--primary-accent);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  /* Desktop Viewport */
  @media (min-width: 769px) {
    bottom: 2rem;
    right: 2rem;
    padding: 0.6rem 1.1rem;
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const ButtonText = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  
  /* Hide text on mobile */
  display: none;
  
  @media (min-width: 769px) {
    display: inline;
  }
`;

export function ScrollToTopButton({ showBottomNav = true }: { showBottomNav?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    const toggleVisibility = () => {
      if (container) {
        if (container.scrollTop > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      } else {
        if (window.scrollY > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', toggleVisibility);
    } else {
      window.addEventListener('scroll', toggleVisibility);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', toggleVisibility);
      } else {
        window.removeEventListener('scroll', toggleVisibility);
      }
    };
  }, []);

  const scrollToTop = () => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <FloatingButton 
      id="scroll-to-top-btn"
      $visible={visible} 
      $showBottomNav={showBottomNav}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      <ArrowUp size={16} strokeWidth={2.5} />
      <ButtonText>Scroll to Top</ButtonText>
    </FloatingButton>
  );
}
