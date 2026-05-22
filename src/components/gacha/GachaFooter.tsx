import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaReddit, FaDiscord, FaTwitter } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  margin-top: 4rem;
  border-top: 1px solid var(--global-border);

  @media (max-width: 768px) {
    padding-bottom: 5.25rem; /* Make room for MobileBottomNavbar on mobile */
  }
`;

const FooterInner = styled.div`
  max-width: 105rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 22rem;
`;

const FooterLogo = styled.span`
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--global-text);

  span {
    color: var(--primary-accent);
  }
`;

const FooterText = styled.p`
  font-size: 0.78rem;
  color: var(--global-text-muted);
  line-height: 1.6;
  margin: 0;
`;

const FooterRight = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    gap: 2rem;
  }
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ColTitle = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--global-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 0.25rem;
`;

const FooterLink = styled.a`
  font-size: 0.82rem;
  color: var(--global-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: var(--global-text);
  }
`;

const FooterRouterLink = styled(Link)`
  font-size: 0.82rem;
  color: var(--global-text-muted);
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: var(--global-text);
  }
`;

const SubFooter = styled.div`
  max-width: 105rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--global-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  color: var(--global-text-muted);
  margin: 0;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: var(--global-text-muted);
  transition: color 0.15s ease, transform 0.15s ease;
  font-size: 1.1rem;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--global-text);
    transform: scale(1.15);
  }
`;

const Disclaimer = styled.p`
  font-size: 0.7rem;
  color: var(--global-text-muted);
  line-height: 1.5;
  margin: 0;
  max-width: 105rem;
  margin: 0 auto;
  padding: 0.75rem 1.5rem 1.25rem;
  opacity: 0.7;
`;

export function GachaFooter() {
  const location = useLocation();

  const handleLinkClick = (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === to) {
      e.preventDefault();
      const container = document.getElementById('main-scroll-container');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLeft>
          <FooterLogo>
            GACHA<span>TRACKER</span>
          </FooterLogo>
          <FooterText>
            An independent platform tracking upcoming gacha games, release dates,
            and development status. Not affiliated with or endorsed by any
            featured gacha game or company.
          </FooterText>
        </FooterLeft>

        <FooterRight>
          <FooterCol>
            <ColTitle>Community</ColTitle>
            <FooterLink
              href='https://www.reddit.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Reddit
            </FooterLink>
            <FooterLink
              href='https://discord.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Discord
            </FooterLink>
            <FooterLink
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </FooterLink>
          </FooterCol>

          <FooterCol>
            <ColTitle>Resources</ColTitle>
            <FooterRouterLink to='/changelog' id="footer-changelog-link" onClick={handleLinkClick('/changelog')}>Changelog</FooterRouterLink>
            <FooterRouterLink to='/feedback' id="footer-feedback-link" onClick={handleLinkClick('/feedback')}>Feedback</FooterRouterLink>
          </FooterCol>
        </FooterRight>
      </FooterInner>

      <SubFooter>
        <Copyright>
          © 2024–2026 GACHATRACKER · Powered by community data
        </Copyright>
        <SocialRow>
          <SocialIcon
            href='https://www.reddit.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Reddit'
          >
            <FaReddit />
          </SocialIcon>
          <SocialIcon
            href='https://discord.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Discord'
          >
            <FaDiscord />
          </SocialIcon>
          <SocialIcon
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Twitter'
          >
            <FaTwitter />
          </SocialIcon>
        </SocialRow>
      </SubFooter>

      <Disclaimer>
        This website is an independent, free-to-use platform and is not affiliated with or endorsed by any of
        the companies or games featured on it. All images and intellectual property belong to their respective copyright holders.
      </Disclaimer>
    </FooterWrapper>
  );
}
