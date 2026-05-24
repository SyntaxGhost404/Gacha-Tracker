import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';

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
            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
              <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83s.83-.381.83-.83a.831.831 0 0 0-1.66 0z" />
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224q-.03.17-.029.353c0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165" />
            </svg>
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
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
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
