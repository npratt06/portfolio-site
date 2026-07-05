import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { labItems } from './content/portfolio';
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

  it('keeps the original portfolio framed as a Lab archive item', () => {
    const archiveItem = labItems.find((item) => item.title === 'Original portfolio interface');

    expect(archiveItem).toMatchObject({
      category: 'Archive',
      href: '#/lab/archive',
      linkLabel: 'View archive'
    });
    expect(archiveItem?.summary).toContain('box of scraps');
  });
});
