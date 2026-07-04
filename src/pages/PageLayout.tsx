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

function ExternalNavLink() {
  if (externalLinks.github.pending) {
    return (
      <span className="nav-link nav-link--pending" title="GitHub URL pending">
        GitHub
      </span>
    );
  }

  return (
    <a className="nav-link" href={externalLinks.github.href} rel="noreferrer" target="_blank">
      GitHub
    </a>
  );
}

function ThemeToggle({ setTheme, theme }: { setTheme: React.Dispatch<React.SetStateAction<Theme>>; theme: Theme }) {
  return (
    <div className="theme-toggle" aria-label="Theme">
      <button aria-pressed={theme === 'dark'} className={theme === 'dark' ? 'theme-toggle__option theme-toggle__option--active' : 'theme-toggle__option'} onClick={() => setTheme('dark')} type="button">
        <PortfolioIcon name="moon" />
        <span>Dark</span>
      </button>
      <span className="theme-toggle__divider" aria-hidden="true" />
      <button aria-pressed={theme === 'light'} className={theme === 'light' ? 'theme-toggle__option theme-toggle__option--active' : 'theme-toggle__option'} onClick={() => setTheme('light')} type="button">
        <span>Light</span>
        <PortfolioIcon name="sun" />
      </button>
    </div>
  );
}

function SiteHeader({ setTheme, theme }: { setTheme: React.Dispatch<React.SetStateAction<Theme>>; theme: Theme }) {
  return (
    <header className="site-header">
      <Link className="brand-link" to="/">
        <span className="brand-mark" aria-hidden="true">
          NP
        </span>
        <span>Nate Pratt</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`} end={item.path === '/'} key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
        <ExternalNavLink />
      </nav>
      <ThemeToggle setTheme={setTheme} theme={theme} />
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
  return (
    <div className="legacy-archive-page">
      <div className="archive-note">
        <div className="archive-note__links">
          <Link to="/">Back to current portfolio</Link>
          <Link to="/lab">Back to Lab</Link>
        </div>
        <h1>Original portfolio interface</h1>
        <p>This handmade jukebox shell is here for nostalgia. The old navigation is unplugged on purpose, so it cannot send anyone into stale About, Projects, or Resume pages.</p>
      </div>
      <JukeBox archiveMode deviceType={deviceType} />
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
