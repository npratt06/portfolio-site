import { Link } from 'react-router-dom';
import PortfolioIcon from '../../components/Common/PortfolioIcon';
import { externalLinks, featuredProject } from '../../content/portfolio';

interface ProjectsProps {
  deviceType?: string;
}

function ProjectLink({ href, label, pending }: { href: string; label: string; pending?: boolean }) {
  if (pending || href.startsWith('#')) {
    return (
      <span className="button button--secondary is-disabled" title={`${label} pending`}>
        {label}
      </span>
    );
  }

  return (
    <a className="button button--secondary" href={href} rel="noreferrer" target="_blank">
      {label}
      <PortfolioIcon name="external" />
    </a>
  );
}

export default function Projects({ deviceType }: ProjectsProps) {
  void deviceType;

  return (
    <div className="page">
      <section className="page-intro">
        <h1>Projects</h1>
        <p>Selected public work, framed honestly.</p>
        <span>I keep this page selective by design. One featured build that represents the kind of product work I do, and direct access to more public code on GitHub.</span>
      </section>

      <section className="project-feature">
        <div className="project-copy">
          <p className="section-label">Featured project</p>
          <h2>{featuredProject.name}</h2>
          <p>{featuredProject.summary}</p>
          <ul className="detail-list">
            {featuredProject.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="button-row">
            {featuredProject.links.map((link) => (
              <ProjectLink href={link.href} key={link.label} label={link.label} pending={link.pending} />
            ))}
            {externalLinks.github.pending ? (
              <span className="button button--secondary is-disabled">More on GitHub TODO</span>
            ) : (
              <a className="button button--secondary" href={externalLinks.github.href} rel="noreferrer" target="_blank">
                More on GitHub
                <PortfolioIcon name="github" />
              </a>
            )}
          </div>
        </div>
        <div className="project-visual" aria-hidden="true">
          <div className="wiffle-ball">
            <PortfolioIcon name="wiffle" />
          </div>
        </div>
      </section>

      <section className="callout-row">
        <PortfolioIcon name="flask" />
        <div>
          <h2>Games, dotfiles, and archive experiments live in Lab.</h2>
          <p>It is where the maker energy lives, without getting in the way here.</p>
        </div>
        <Link className="text-link" to="/lab">
          Explore Lab
          <PortfolioIcon name="arrow" />
        </Link>
      </section>
    </div>
  );
}
