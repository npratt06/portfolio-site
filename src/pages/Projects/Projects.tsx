import { Link } from 'react-router-dom';
import PortfolioIcon from '../../components/Common/PortfolioIcon';
import { labItems, projects } from '../../content/portfolio';
import wiffleMark from '../../img/mockup-icons/project-wiffle.png';

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

function ExperimentLink({ href, label, pending }: { href: string; label: string; pending?: boolean }) {
  if (pending) {
    return <span className="text-link is-disabled">{label}</span>;
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

export default function Projects({ deviceType }: ProjectsProps) {
  void deviceType;

  return (
    <div className="page">
      <section className="page-intro">
        <h1>Projects</h1>
        <p>Products I build, plus smaller experiments worth keeping around.</p>
      </section>

      <section className="featured-projects" aria-labelledby="featured-projects-heading">
        <h2 className="section-heading" id="featured-projects-heading">
          Featured work
        </h2>
        {projects.map((project, index) => (
          <article className="project-entry" key={project.name}>
            <div className="project-meta">
              <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="project-status">{project.status}</span>
              {index === 0 ? <img className="project-mark" src={wiffleMark} alt="" draggable="false" /> : null}
            </div>
            <div className="project-copy">
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              {project.details.length > 0 ? (
                <ul className="detail-list">
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
              {project.links.length > 0 ? (
                <div className="button-row project-actions">
                  {project.links.map((link) => (
                    <ProjectLink href={link.href} key={link.label} label={link.label} pending={link.pending} />
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="experiments-section" id="experiments" aria-labelledby="experiments-heading">
        <div className="experiments-heading">
          <h2 className="section-heading" id="experiments-heading">
            Experiments &amp; archive
          </h2>
          <p>Smaller tools, games, and earlier work.</p>
        </div>
        <div className="experiment-list">
          {labItems.map((item) => (
            <article className="experiment-row" key={item.title}>
              <span className="experiment-category">{item.category}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <ExperimentLink href={item.href} label={item.linkLabel} pending={item.pending} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
