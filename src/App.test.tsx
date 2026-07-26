import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import ArtifactHeader from './components/Common/ArtifactHeader';
import DesktopGameFrame from './components/Common/DesktopGameFrame';
import { labItems, projects } from './content/portfolio';
import { DEVICE_TYPES } from './global.const';
import { ThemeToggle } from './pages/PageLayout';

describe('App', () => {
  it('renders the theme toggle as one icon-only button', () => {
    const markup = renderToStaticMarkup(<ThemeToggle setTheme={vi.fn()} theme="dark" />);

    expect(markup).toContain('aria-label="Switch to light mode"');
    expect(markup).toContain('class="theme-toggle theme-toggle--dark"');
    expect(markup).toContain('theme-toggle__icon--moon');
    expect(markup).toContain('theme-toggle__icon--sun');
    expect(markup).not.toContain('>Dark<');
    expect(markup).not.toContain('>Light<');
  });

  it('keeps the original portfolio available in the projects archive', () => {
    const archiveItem = labItems.find((item) => item.title === 'Original portfolio interface');

    expect(archiveItem).toMatchObject({
      category: 'Archive',
      href: '#/lab/archive',
      linkLabel: 'View archive'
    });
    expect(archiveItem?.summary).toContain('created in a cave with a box of scraps');
  });

  it('includes the in-progress fantasy football project', () => {
    expect(projects).toContainEqual(
      expect.objectContaining({
        name: 'Fantasy Football Recap Generator',
        status: 'In development'
      })
    );
  });

  it('uses a shared arcade frame around playable desktop games', () => {
    const markup = renderToStaticMarkup(
      <DesktopGameFrame description="A preserved game." deviceType={DEVICE_TYPES.DESKTOP} title="Pong">
        <div>Playable game</div>
      </DesktopGameFrame>
    );

    expect(markup).toContain('Arcade');
    expect(markup).toContain('Pong');
    expect(markup).toContain('← Back to Projects');
    expect(markup).toContain('#/projects#experiments');
    expect(markup).toContain('href="#/"');
    expect(markup).toContain('Playable game');
  });

  it('uses the shared arcade frame for desktop-only games on mobile', () => {
    const markup = renderToStaticMarkup(
      <DesktopGameFrame description="A preserved game." deviceType={DEVICE_TYPES.MOBILE} title="Pong">
        <div>Playable game</div>
      </DesktopGameFrame>
    );

    expect(markup).toContain('Pong is only implemented for desktop right now');
    expect(markup).toContain('← Back to Projects');
    expect(markup).toContain('#/projects#experiments');
    expect(markup).not.toContain('Playable game');
  });

  it('supports the same preserved-artifact header for the portfolio archive', () => {
    const markup = renderToStaticMarkup(<ArtifactHeader category="Archive" title="Original Portfolio" />);

    expect(markup).toContain('Archive');
    expect(markup).toContain('Original Portfolio');
    expect(markup).toContain('← Back to Projects');
    expect(markup).toContain('href="#/"');
  });
});
