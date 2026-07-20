import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import DesktopGameFrame from './components/Common/DesktopGameFrame';
import { labItems, projects } from './content/portfolio';
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
    expect(archiveItem?.summary).toContain('snapshot of earlier work');
  });

  it('includes the in-progress fantasy football project', () => {
    expect(projects).toContainEqual(
      expect.objectContaining({
        name: 'Fantasy Football Recap Generator',
        status: 'In development'
      })
    );
  });

  it('uses a shared desktop-only frame for arcade games on mobile', () => {
    const markup = renderToStaticMarkup(
      <DesktopGameFrame description="A preserved game." deviceType="mobile" title="Pong">
        <div>Playable game</div>
      </DesktopGameFrame>
    );

    expect(markup).toContain('Pong is only implemented for desktop right now');
    expect(markup).toContain('Back to projects');
    expect(markup).toContain('#/projects#experiments');
    expect(markup).not.toContain('Playable game');
  });
});
