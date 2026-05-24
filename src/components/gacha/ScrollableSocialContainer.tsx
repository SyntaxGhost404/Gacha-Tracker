import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollableSocialContainerProps {
  children: React.ReactNode;
  $variant?: 'card' | 'detail';
}

const OuterWrapper = styled.div<{ $variant: 'card' | 'detail' }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  
  @media (max-width: 1024px) {
    width: ${({ $variant }) => ($variant === 'card' ? '6.55rem' : '7.66rem')};
    max-width: ${({ $variant }) => ($variant === 'card' ? '6.55rem' : '7.66rem')};
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  
  /* On desktop: standard static horizontal row side-by-side, no scroll */
  @media (min-width: 1025px) {
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow: visible;
    gap: 0.45rem;
  }

  /* On mobile and tablet: horizontally scrollable, hidden scrollbar */
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    gap: 0.5rem;
    padding: 0.25rem 0;
    
    & > * {
      flex-shrink: 0 !important;
    }

    /* Hide scrollbars */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* WebKit */
    }
  }
`;

const ChevronButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => ($position === 'left' ? 'left: -14px;' : 'right: -14px;')}
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--global-border);
  background: var(--global-card-bg-elevated, #161c24);
  color: var(--global-text);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    background: var(--global-secondary-bg);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.9);
  }

  /* Only present/visible on mobile & tablet */
  @media (min-width: 1025px) {
    display: none;
  }
`;

export const ScrollableSocialContainer: React.FC<ScrollableSocialContainerProps> = ({ children, $variant = 'card' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    if (window.innerWidth >= 1025) {
      setShowLeft(false);
      setShowRight(false);
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    // Show left if scrollLeft > 2px
    setShowLeft(scrollLeft > 2);
    // Show right if not fully scrolled to the right
    setShowRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Check after DOM is laid out
    const timer = setTimeout(checkScroll, 150);

    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });
      resizeObserver.observe(container);
    }

    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = $variant === 'card' ? 45 : 55; // scroll by about 1-2 items
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <OuterWrapper $variant={$variant}>
      {showLeft && (
        <ChevronButton $position="left" onClick={() => handleScroll('left')} aria-label="Scroll left">
          <ChevronLeft size={13} strokeWidth={2.5} />
        </ChevronButton>
      )}
      
      <ScrollWrapper ref={scrollRef}>
        {children}
      </ScrollWrapper>

      {showRight && (
        <ChevronButton $position="right" onClick={() => handleScroll('right')} aria-label="Scroll right">
          <ChevronRight size={13} strokeWidth={2.5} />
        </ChevronButton>
      )}
    </OuterWrapper>
  );
};
