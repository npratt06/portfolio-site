export type PortfolioIconName =
  | 'archive'
  | 'arrow'
  | 'briefcase'
  | 'calendar'
  | 'code'
  | 'external'
  | 'flask'
  | 'github'
  | 'info'
  | 'joystick'
  | 'moon'
  | 'search'
  | 'sun'
  | 'terminal'
  | 'target'
  | 'users'
  | 'wiffle';

interface PortfolioIconProps {
  name: PortfolioIconName;
  className?: string;
}

export default function PortfolioIcon({ name, className }: PortfolioIconProps) {
  const commonProps = {
    className: `portfolio-icon${className ? ` ${className}` : ''}`,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
    viewBox: '0 0 24 24',
    'aria-hidden': true
  };

  switch (name) {
    case 'archive':
      return (
        <svg {...commonProps}>
          <path d="M4 7.5h16v11H4z" />
          <path d="M6 4.5h12l2 3H4z" />
          <path d="M9.5 11h5" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...commonProps}>
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...commonProps}>
          <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />
          <path d="M4 8h16v10.5H4z" />
          <path d="M4 12h16" />
          <path d="M10 12v1h4v-1" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...commonProps}>
          <path d="M5 5.5h14v14H5z" />
          <path d="M8 3.5v4" />
          <path d="M16 3.5v4" />
          <path d="M5 9h14" />
        </svg>
      );
    case 'code':
      return (
        <svg {...commonProps}>
          <path d="m9 8-4 4 4 4" />
          <path d="m15 8 4 4-4 4" />
          <path d="m13 5-2 14" />
        </svg>
      );
    case 'external':
      return (
        <svg {...commonProps}>
          <path d="M8 6h10v10" />
          <path d="m18 6-12 12" />
        </svg>
      );
    case 'flask':
      return (
        <svg {...commonProps}>
          <path d="M9 3.5h6" />
          <path d="M10 3.5v6.2l-4.5 7.5A2.2 2.2 0 0 0 7.4 20.5h9.2a2.2 2.2 0 0 0 1.9-3.3L14 9.7V3.5" />
          <path d="M8 15h8" />
        </svg>
      );
    case 'github':
      return (
        <svg {...commonProps}>
          <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.46.08.62-.2.62-.44v-1.6c-2.52.55-3.05-1.08-3.05-1.08-.42-1.04-1.02-1.32-1.02-1.32-.83-.56.06-.55.06-.55.92.07 1.4.95 1.4.95.82 1.4 2.15 1 2.68.76.08-.6.32-1 .58-1.23-2.02-.23-4.14-1-4.14-4.49 0-.99.36-1.8.94-2.44-.1-.23-.41-1.16.09-2.4 0 0 .77-.25 2.52.93A8.6 8.6 0 0 1 12 7.48c.78 0 1.55.1 2.28.31 1.75-1.18 2.52-.93 2.52-.93.5 1.24.19 2.17.09 2.4.59.64.94 1.45.94 2.44 0 3.5-2.13 4.25-4.16 4.48.33.29.62.84.62 1.7v2.38c0 .24.17.52.63.44A9.2 9.2 0 0 0 12 2.8Z" />
        </svg>
      );
    case 'info':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10.5v5" />
          <path d="M12 7.7h.01" />
        </svg>
      );
    case 'joystick':
      return (
        <svg {...commonProps}>
          <path d="M12 13V6" />
          <circle cx="12" cy="5" r="2.5" />
          <path d="M5.5 13h13l1.5 5.5H4z" />
          <path d="M8 16.2h3" />
          <path d="M16.5 16.2h.01" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...commonProps}>
          <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...commonProps}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 4 4" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.8v2" />
          <path d="M12 19.2v2" />
          <path d="m4.5 4.5 1.4 1.4" />
          <path d="m18.1 18.1 1.4 1.4" />
          <path d="M2.8 12h2" />
          <path d="M19.2 12h2" />
          <path d="m4.5 19.5 1.4-1.4" />
          <path d="m18.1 5.9 1.4-1.4" />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...commonProps}>
          <path d="m6 8 4 4-4 4" />
          <path d="M12 16h6" />
          <path d="M3.5 4.5h17v15h-17z" />
        </svg>
      );
    case 'target':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 4v3" />
          <path d="M20 12h-3" />
        </svg>
      );
    case 'users':
      return (
        <svg {...commonProps}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="16.5" cy="9.5" r="2.3" />
          <path d="M3.8 19a5.2 5.2 0 0 1 10.4 0" />
          <path d="M14.8 15.2A4.3 4.3 0 0 1 20.5 19" />
        </svg>
      );
    case 'wiffle':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8.5" />
          <ellipse cx="9" cy="8" rx="1.4" ry="2.5" transform="rotate(-35 9 8)" />
          <ellipse cx="15" cy="8" rx="1.4" ry="2.5" transform="rotate(35 15 8)" />
          <ellipse cx="8.8" cy="14.5" rx="1.4" ry="2.5" transform="rotate(25 8.8 14.5)" />
          <ellipse cx="15.2" cy="14.5" rx="1.4" ry="2.5" transform="rotate(-25 15.2 14.5)" />
        </svg>
      );
    default:
      return null;
  }
}
