import { Link } from 'react-router-dom';
import PortfolioIcon, { PortfolioIconName } from '../../components/Common/PortfolioIcon';
import { labItems } from '../../content/portfolio';

const labGroups = ['Dev Environment', 'Arcade', 'Archive'] as const;

function LabLink({ href, label, pending }: { href: string; label: string; pending?: boolean }) {
  if (pending || (href.startsWith('#') && !href.startsWith('#/'))) {
    return (
      <span className="text-link is-disabled" title={`${label} pending`}>
        {label}
      </span>
    );
  }

  if (href.startsWith('#/')) {
    return (
      <Link className="text-link" to={href.replace('#', '')}>
        {label}
        <PortfolioIcon name="arrow" />
      </Link>
    );
  }

  return (
    <a className="text-link" href={href} rel="noreferrer" target="_blank">
      {label}
      <PortfolioIcon name="external" />
    </a>
  );
}

function getGroupIcon(group: (typeof labGroups)[number]): PortfolioIconName {
  if (group === 'Dev Environment') return 'terminal';
  if (group === 'Arcade') return 'joystick';
  return 'archive';
}

function getGroupSummary(group: (typeof labGroups)[number]) {
  if (group === 'Dev Environment') return 'Notes, dotfiles, and setup guides that support how I build and work.';
  if (group === 'Arcade') return 'Small, interactive games and playful experiments built for learning and fun.';
  return 'Legacy projects and the original portfolio interface from over the years.';
}

export default function Lab() {
  return (
    <div className="page">
      <section className="page-intro">
        <h1>Lab</h1>
        <p>A space for experiments, tools, and digital artifacts.</p>
      </section>

      <div className="lab-groups">
        {labGroups.map((group) => {
          const items = labItems.filter((item) => item.category === group);
          const primaryItem = items[0];

          return (
            <section className={`lab-group lab-group--${group.toLowerCase().replace(/\s+/g, '-')}`} key={group}>
              <div className="lab-group-main">
                <div className="icon-tile icon-tile--large">
                  <PortfolioIcon name={getGroupIcon(group)} />
                </div>
                <h2>{group}</h2>
                <p>{getGroupSummary(group)}</p>
                {primaryItem ? <LabLink href={primaryItem.href} label={group === 'Arcade' ? 'Explore arcade' : 'Explore'} pending={group === 'Dev Environment'} /> : null}
              </div>
              <div className="lab-group-detail">
                {items.map((item) => (
                  <article className="lab-card" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <LabLink href={item.href} label={item.linkLabel} pending={item.pending} />
                  </article>
                ))}
              </div>
              <div className="lab-group-visual" aria-hidden="true">
                <PortfolioIcon name={getGroupIcon(group)} />
              </div>
            </section>
          );
        })}
      </div>

      <section className="lab-note">
        <PortfolioIcon name="info" />
        <div>
          <p>The original portfolio lives here as part of the archive. Its old navigation is disabled so it stays a nostalgia route, not a parallel stale portfolio.</p>
        </div>
        <Link className="text-link" to="/projects">
          Back to Projects
          <PortfolioIcon name="arrow" />
        </Link>
      </section>
    </div>
  );
}
