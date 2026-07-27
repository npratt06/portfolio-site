import React from 'react';
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ArtifactHeader from '../components/Common/ArtifactHeader';
import DesktopGameFrame from '../components/Common/DesktopGameFrame';
import PortfolioIcon from '../components/Common/PortfolioIcon';
import JukeBox from '../components/JukeBox/JukeBox';
import Zomboozled from '../components/Zomboozled/Zomboozled';
import { externalLinks } from '../content/portfolio';
import { DEVICE_TYPES } from '../global.const';
import Home from './Home/Home';
import Projects from './Projects/Projects';
import Resume from './Resume/Resume';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' }
];

type Theme = 'dark' | 'light';
type MenuPhase = 'closed' | 'open' | 'closing';
type HomeLightPhase = 'inactive' | 'igniting' | 'active' | 'cooling';

function getDeviceType(windowWidth: number, windowHeight: number) {
  return windowWidth < windowHeight * 0.95 ? DEVICE_TYPES.MOBILE : DEVICE_TYPES.DESKTOP;
}

function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState(DEVICE_TYPES.DESKTOP);

  React.useEffect(() => {
    const updateDimensions = () => {
      setDeviceType(getDeviceType(window.innerWidth, window.innerHeight));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return deviceType;
}

function usePortfolioTheme() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem('portfolio-theme');
    return storedTheme === 'light' ? 'light' : 'dark';
  });

  React.useEffect(() => {
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return { setTheme, theme };
}

function ScrollToTop() {
  const { hash, pathname } = useLocation();
  const previousPathname = React.useRef(pathname);

  React.useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  React.useLayoutEffect(() => {
    const pageChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (!pageChanged && hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    let secondFrame = 0;

    const resetScroll = () => {
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    root.style.scrollBehavior = 'auto';
    resetScroll();

    const firstFrame = window.requestAnimationFrame(() => {
      resetScroll();
      secondFrame = window.requestAnimationFrame(() => {
        resetScroll();
        root.style.scrollBehavior = previousScrollBehavior;
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [hash, pathname]);

  return null;
}

export function ThemeToggle({ setTheme, theme }: { setTheme: React.Dispatch<React.SetStateAction<Theme>>; theme: Theme }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === 'light'}
      className={`theme-toggle theme-toggle--${theme}`}
      onClick={() => setTheme(nextTheme)}
      title={`Switch to ${nextTheme} mode`}
      type="button"
    >
      <span className="theme-toggle__icon-track" aria-hidden="true">
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <PortfolioIcon name="moon" />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <PortfolioIcon name="sun" />
        </span>
      </span>
    </button>
  );
}

function HomeMark({ isHome }: { isHome: boolean }) {
  const [lightPhase, setLightPhase] = React.useState<HomeLightPhase>(isHome ? 'active' : 'inactive');
  const previousIsHome = React.useRef(isHome);

  React.useEffect(() => {
    if (previousIsHome.current === isHome) {
      return;
    }

    previousIsHome.current = isHome;
    setLightPhase(isHome ? 'igniting' : 'cooling');

    const phaseTimer = window.setTimeout(
      () => setLightPhase(isHome ? 'active' : 'inactive'),
      isHome ? 560 : 720
    );

    return () => window.clearTimeout(phaseTimer);
  }, [isHome]);

  return (
    <span className={`brand-mark brand-home-mark brand-home-mark--${lightPhase}`} aria-hidden="true">
      <svg className="brand-home-mark__house" viewBox="0 0 24 24">
        <path className="brand-home-mark__light" d="M9.15 20.75V14.9Q12 13.55 14.85 14.9v5.85z" />
        <path
          className="brand-home-mark__outline"
          d="M3.5 10.25 12 3.25l8.5 7v10.5H15v-5.9Q12 13.45 9 14.85v5.9H3.5v-10.5Z"
        />
      </svg>
    </span>
  );
}

function SiteHeader({ setTheme, theme }: { setTheme: React.Dispatch<React.SetStateAction<Theme>>; theme: Theme }) {
  const [menuPhase, setMenuPhase] = React.useState<MenuPhase>('closed');
  const { pathname } = useLocation();

  const beginMenuClose = React.useCallback(() => {
    setMenuPhase((phase) => (phase === 'closed' ? 'closed' : 'closing'));
  }, []);

  const closeMenu = React.useCallback(() => {
    beginMenuClose();
  }, [beginMenuClose]);

  const toggleMenu = () => {
    if (menuPhase === 'open') {
      beginMenuClose();
      return;
    }

    setMenuPhase('open');
  };

  const finishMenuClose = (event: React.AnimationEvent<HTMLElement>) => {
    if (event.target === event.currentTarget && event.animationName === 'mobile-menu-container-close') {
      setMenuPhase((phase) => (phase === 'closing' ? 'closed' : phase));
    }
  };

  React.useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const isMenuOpen = menuPhase === 'open';
  const isHomePage = pathname === '/';
  const headerClassName = `site-header${menuPhase === 'open' ? ' site-header--menu-open' : ''}${menuPhase === 'closing' ? ' site-header--menu-closing' : ''}`;

  return (
    <header className={headerClassName}>
      <Link aria-current={isHomePage ? 'page' : undefined} className="brand-link" onClick={closeMenu} to="/">
        <HomeMark isHome={isHomePage} />
        <span>Nate Pratt</span>
      </Link>
      <nav className="site-nav" id="primary-navigation" aria-label="Primary navigation" onAnimationEnd={finishMenuClose}>
        {navItems.map((item) => (
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`} end={item.path === '/'} key={item.path} onClick={closeMenu} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <ThemeToggle setTheme={setTheme} theme={theme} />
      <button
        className="mobile-menu-button"
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={toggleMenu}
        type="button"
      >
        <span className="mobile-menu-button__lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Nate Pratt</strong>
        <span>Full-stack software engineer</span>
      </div>
      <div className="footer-links">
        <a href={externalLinks.github.href} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <a href={externalLinks.linkedIn.href} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

function ArchivePage({ deviceType }: { deviceType: string }) {
  React.useLayoutEffect(() => {
    document.body.classList.add('legacy-archive-body');

    return () => {
      document.body.classList.remove('legacy-archive-body');
    };
  }, []);

  return (
    <div className="legacy-archive-page">
      <ArtifactHeader category="Archive" title="Original Portfolio" />
      <div className="archive-jukebox-frame">
        <JukeBox deviceType={deviceType} />
      </div>
    </div>
  );
}

function PongPage({ deviceType }: { deviceType: string }) {
  return (
    <DesktopGameFrame description="A preserved two-player canvas game experiment controlled with A/Z and the arrow keys." deviceType={deviceType} title="Pong">
      <iframe className="static-game-frame" src={`${import.meta.env.BASE_URL}games/pong.html`} title="Pong game" />
    </DesktopGameFrame>
  );
}

function ZomboozledPage({ deviceType }: { deviceType: string }) {
  return (
    <DesktopGameFrame description="A preserved browser game experiment from 2017, kept playable with offline high scores." deviceType={deviceType} title="Zomboozled">
      <Zomboozled deviceType={deviceType} />
    </DesktopGameFrame>
  );
}

function PortfolioRoutes() {
  const deviceType = useDeviceType();
  const location = useLocation();
  const { setTheme, theme } = usePortfolioTheme();

  if (location.pathname === '/zomboozled' || location.pathname === '/pong') {
    return (
      <Routes>
        <Route path="/zomboozled" element={<ZomboozledPage deviceType={deviceType} />} />
        <Route path="/pong" element={<PongPage deviceType={deviceType} />} />
      </Routes>
    );
  }

  if (location.pathname === '/lab/archive') {
    return (
      <Routes>
        <Route path="/lab/archive" element={<ArchivePage deviceType={deviceType} />} />
      </Routes>
    );
  }

  return (
    <div className={`site-shell theme-${theme}`}>
      <SiteHeader setTheme={setTheme} theme={theme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Resume />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/lab" element={<Navigate replace to="/projects#experiments" />} />
          <Route path="/archive" element={<Navigate replace to="/lab/archive" />} />
          <Route path="/about" element={<Home />} />
          <Route path="/about me" element={<Home />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function PageLayout() {
  return (
    <HashRouter>
      <ScrollToTop />
      <PortfolioRoutes />
    </HashRouter>
  );
}
