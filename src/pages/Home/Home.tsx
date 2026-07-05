import React from 'react';
import { Link } from 'react-router-dom';
import PortfolioIcon from '../../components/Common/PortfolioIcon';
import { externalLinks, heroStatement, homeStats, selectedWorkItems } from '../../content/portfolio';
import workGithubIcon from '../../img/mockup-icons/work-github.png';
import workLabIcon from '../../img/mockup-icons/work-lab.png';
import workWiffleIcon from '../../img/mockup-icons/work-wiffle.png';

interface HomeProps {
  deviceType?: string;
}

function SmartLink({ children, className, href, pending }: { children: React.ReactNode; className: string; href: string; pending?: boolean }) {
  if (pending || (href.startsWith('#') && !href.startsWith('#/'))) {
    return (
      <span className={`${className} is-disabled`} title="URL pending">
        {children}
      </span>
    );
  }

  if (href.startsWith('#/')) {
    return (
      <Link className={className} to={href.replace('#', '')}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}

const selectedWorkImages = {
  wiffle: workWiffleIcon,
  github: workGithubIcon,
  flask: workLabIcon
} as const;

export default function Home({ deviceType }: HomeProps) {
  void deviceType;

  return (
    <div className="page page--home">
      <section className="hero-section">
        <div className="hero-copy">
          <h1>{heroStatement.name}</h1>
          <p className="hero-title">{heroStatement.title}</p>
          <p className="hero-summary">{heroStatement.summary}</p>
          <section className="stat-rail" aria-label="Professional summary">
            {homeStats.map((stat) => (
              <article className="stat-item" key={stat.label}>
                <PortfolioIcon name={stat.icon} />
                <div>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.detail}</p>
                </div>
              </article>
            ))}
          </section>
          <div className="button-row">
            <Link className="button button--primary" to="/projects">
              View projects
              <PortfolioIcon name="arrow" />
            </Link>
            <Link className="button button--secondary" to="/experience">
              View experience
              <PortfolioIcon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="hero-aside" aria-label="Portfolio focus">
          <p>{heroStatement.detail}</p>
          <div className="dot-field" aria-hidden="true" />
        </div>
      </section>

      <section className="selected-work-section">
        <div className="section-heading">
          <p>Selected public work</p>
          <span>A focused launch selection. More projects and code are available on GitHub.</span>
        </div>
        <div className="selected-work-grid">
          {selectedWorkItems.map((item) => (
            <article className={`work-card work-card--${item.icon}`} key={item.title}>
              <div className="icon-tile icon-tile--image">
                <img className="mockup-icon-image" src={selectedWorkImages[item.icon]} alt="" draggable="false" />
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <SmartLink className="text-link" href={item.href} pending={item.pending}>
                  {item.pending ? `${item.linkLabel} TODO` : item.linkLabel}
                  <PortfolioIcon name={item.pending ? 'info' : 'arrow'} />
                </SmartLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      {externalLinks.github.pending ? <p className="pending-note">GitHub and LinkedIn URLs are still pending content inputs.</p> : null}
    </div>
  );
}
