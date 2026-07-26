import PortfolioIcon from '../../components/Common/PortfolioIcon';
import { heroStatement, homeStats } from '../../content/portfolio';

export default function Home() {
  return (
    <div className="page page--home">
      <section className="home-intro">
        <div className="hero-copy">
          <p className="hero-eyebrow">{heroStatement.title}</p>
          <h1>{heroStatement.name}</h1>
          <p className="hero-summary">{heroStatement.summary}</p>
        </div>

        <section className="home-facts" aria-label="Professional summary">
          {homeStats.map((stat) => (
            <article className="home-fact" key={stat.label}>
              <PortfolioIcon name={stat.icon} />
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                {stat.detail ? <p>{stat.detail}</p> : null}
              </div>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}
