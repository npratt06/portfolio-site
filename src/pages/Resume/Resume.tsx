import { skillGroups } from '../../content/portfolio';
import { Job } from './Resume.interface';
import { MyResumeContent } from './Resume.const';

interface ResumeProps {
  deviceType?: string;
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="timeline-item">
      <div className="timeline-date">{job.Dates}</div>
      <div className="timeline-marker" aria-hidden="true" />
      <div className="timeline-copy">
        <h3>{job.CompanyName}</h3>
        <p>{job.Position}</p>
      </div>
    </article>
  );
}

export default function Resume({ deviceType }: ResumeProps) {
  void deviceType;

  return (
    <div className="page">
      <section className="page-intro">
        <h1>Experience</h1>
        <p>Roles, tools, and education.</p>
      </section>

      <div className="experience-layout">
        <section className="timeline-section" aria-label="Role history">
          <h2>Role history</h2>
          <div className="timeline-list">
            {MyResumeContent.jobs.map((job) => (
              <JobCard job={job} key={`${job.CompanyName}-${job.Dates}`} />
            ))}
          </div>
        </section>

        <aside className="experience-aside">
          <section className="skills-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div className="skill-row" key={group.title}>
                  <strong>{group.title}</strong>
                  <span>{group.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="education-section">
            <h2>Education</h2>
            <p>
              {MyResumeContent.education.Degree}, {MyResumeContent.education.UniversityName} ({MyResumeContent.education.GradDate})
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
