import { Link } from 'react-router-dom';
import PortfolioIcon from '../../components/Common/PortfolioIcon';
import { labItems } from '../../content/portfolio';
import labArcadeIcon from '../../img/mockup-icons/lab-arcade.png';
import labArchiveIcon from '../../img/mockup-icons/lab-archive.png';
import labDevIcon from '../../img/mockup-icons/lab-dev.png';

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

function getGroupIcon(group: (typeof labGroups)[number]) {
  if (group === 'Dev Environment') return labDevIcon;
  if (group === 'Arcade') return labArcadeIcon;
  return labArchiveIcon;
}

function getGroupSummary(group: (typeof labGroups)[number]) {
  if (group === 'Dev Environment') return 'Dotfiles and setup notes.';
  if (group === 'Arcade') return 'Small playable experiments.';
  return 'Earlier work kept for posterity.';
}

export default function Lab() {
  return (
    <div className="page">
      <section className="page-intro">
        <h1>Lab</h1>
        <p>Tools, games, and older experiments.</p>
      </section>

      <div className="lab-groups">
        {labGroups.map((group) => {
          const items = labItems.filter((item) => item.category === group);

          return (
            <section className={`lab-group lab-group--${group.toLowerCase().replace(/\s+/g, '-')}`} key={group}>
              <div className="lab-group-main">
                <div className="icon-tile icon-tile--large icon-tile--image">
                  <img className="mockup-icon-image" src={getGroupIcon(group)} alt="" draggable="false" />
                </div>
                <div className="lab-group-copy">
                  <h2>{group}</h2>
                  <p>{getGroupSummary(group)}</p>
                </div>
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
