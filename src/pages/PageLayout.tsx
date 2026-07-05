import React from 'react';
import { HashRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PortfolioIcon from '../components/Common/PortfolioIcon';
import JukeBox from '../components/JukeBox/JukeBox';
import Zomboozled from '../components/Zomboozled/Zomboozled';
import { externalLinks } from '../content/portfolio';
import { DEVICE_TYPES } from '../global.const';
import Home from './Home/Home';
import Lab from './Lab/Lab';
import Projects from './Projects/Projects';
import Resume from './Resume/Resume';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Lab', path: '/lab' }
];

const MENU_CLOSE_DURATION_MS = 2500;

type Theme = 'dark' | 'light';

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
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}

function ExternalNavLink({ onNavigate }: { onNavigate?: () => void }) {
  if (externalLinks.github.pending) {
    return (
      <span className="nav-link nav-link--pending" title="GitHub URL pending">
        GitHub
      </span>
    );
  }

  return (
    <a className="nav-link" href={externalLinks.github.href} onClick={onNavigate} rel="noreferrer" target="_blank">
      GitHub
    </a>
  );
}

export function ThemeToggle({ setTheme, theme }: { setTheme: React.Dispatch<React.SetStateAction<Theme>>; theme: Theme }) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button aria-label={`Switch to ${nextTheme} mode`} aria-pressed={theme === 'light'} className={`theme-toggle theme-toggle--${theme}`} onClick={() => setTheme(nextTheme)} title={`Switch to ${nextTheme} mode`} type="button">
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

function SiteHeader({ setTheme, theme }: { setTheme: React.Dispatch<React.SetStateAction<Theme>>; theme: Theme }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMenuClosing, setIsMenuClosing] = React.useState(false);
  const closeTimeoutRef = React.useRef<number | null>(null);
  const isMenuOpenRef = React.useRef(isMenuOpen);
  const { pathname } = useLocation();

  React.useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  const clearCloseTimeout = React.useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const beginMenuClose = React.useCallback(() => {
    clearCloseTimeout();
    setIsMenuClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuClosing(false);
      closeTimeoutRef.current = null;
    }, MENU_CLOSE_DURATION_MS);
    setIsMenuOpen(false);
  }, [clearCloseTimeout]);

  const closeMenu = React.useCallback(() => {
    clearCloseTimeout();

    if (isMenuOpenRef.current) {
      beginMenuClose();
      return;
    }

    setIsMenuOpen(false);
  }, [beginMenuClose, clearCloseTimeout]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      beginMenuClose();
      return;
    }

    clearCloseTimeout();
    setIsMenuClosing(false);
    setIsMenuOpen(true);
  };

  React.useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  React.useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  const headerClassName = `site-header${isMenuOpen ? ' site-header--menu-open' : ''}${isMenuClosing ? ' site-header--menu-closing' : ''}`;

  return (
    <header className={headerClassName}>
      <Link className="brand-link" onClick={closeMenu} to="/">
        <span className="brand-mark" aria-hidden="true">
          NP
        </span>
        <span>Nate Pratt</span>
      </Link>
      <nav className="site-nav" id="primary-navigation" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`} end={item.path === '/'} key={item.path} onClick={closeMenu} to={item.path}>
            {item.label}
          </NavLink>
        ))}
        <ExternalNavLink onNavigate={closeMenu} />
      </nav>
      <ThemeToggle setTheme={setTheme} theme={theme} />
      <button className="mobile-menu-button" aria-controls="primary-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={toggleMenu} type="button">
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
        <span>Senior full-stack engineer</span>
      </div>
      <div className="footer-links">
        <Link to="/lab/archive">Archive</Link>
        <Link to="/lab">Lab</Link>
      </div>
    </footer>
  );
}

function ArchivePage({ deviceType }: { deviceType: string }) {
  React.useEffect(() => {
    document.body.classList.add('legacy-archive-body');

    return () => {
      document.body.classList.remove('legacy-archive-body');
    };
  }, []);

  return (
    <div className="legacy-archive-page">
      <div className="archive-note">
        <div className="archive-note__links">
          <Link to="/">Back to current portfolio</Link>
          <Link to="/lab">Back to Lab</Link>
        </div>
      </div>
      <div className="archive-jukebox-frame">
        <JukeBox archiveMode deviceType={deviceType} />
      </div>
    </div>
  );
}

function PortfolioRoutes() {
  const deviceType = useDeviceType();
  const location = useLocation();
  const { setTheme, theme } = usePortfolioTheme();

  if (location.pathname === '/zomboozled') {
    return (
      <Routes>
        <Route path="/zomboozled" element={<Zomboozled deviceType={deviceType} />} />
      </Routes>
    );
  }

  if (location.pathname === '/lab/archive') {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/lab/archive" element={<ArchivePage deviceType={deviceType} />} />
        </Routes>
      </>
    );
  }

  return (
    <div className={`site-shell theme-${theme}`}>
      <SiteHeader setTheme={setTheme} theme={theme} />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home deviceType={deviceType} />} />
          <Route path="/projects" element={<Projects deviceType={deviceType} />} />
          <Route path="/experience" element={<Resume deviceType={deviceType} />} />
          <Route path="/resume" element={<Resume deviceType={deviceType} />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/lab/archive" element={<ArchivePage deviceType={deviceType} />} />
          <Route path="/archive" element={<Navigate replace to="/lab/archive" />} />
          <Route path="/about" element={<Home deviceType={deviceType} />} />
          <Route path="/about me" element={<Home deviceType={deviceType} />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function PageLayout() {
  return (
    <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <PortfolioRoutes />
    </HashRouter>
  );
}
