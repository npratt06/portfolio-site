import { StyleSets } from '../../components/componentHelpers';
import { DEVICE_TYPES } from '../../global.const';
import { backgroundColorStyle, textFontStyle } from '../../globalCSS';
import { ResumeContent } from './Resume.interface';

export const resumeStyle: React.CSSProperties = {
  ...backgroundColorStyle,
  overflow: 'auto',
  ...textFontStyle,
  minHeight: '100vh'
};

export const resumeRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
};

export const resumeRowContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'left',
  width: '50vw'
};

export const resumeTitleStyle: React.CSSProperties = {
  textAlign: 'center'
};

export const resumeSectionHeaderStyle: React.CSSProperties = {
  fontSize: '175%',
  textDecoration: 'underline',
  marginBottom: '30px'
};

export const RESUME_STYLE_SETS: StyleSets = {
  [DEVICE_TYPES.DESKTOP]: {
    resumeRowContentStyle: {
      display: 'flex',
      justifyContent: 'left',
      width: '50vw'
    },
    hrStyle: {
      width: '52vw',
      margin: '3vh'
    }
  },
  [DEVICE_TYPES.MOBILE]: {
    resumeRowContentStyle: {
      display: 'flex',
      justifyContent: 'left',
      width: '85vw'
    },
    hrStyle: {
      width: '87vw',
      margin: '3vh'
    }
  }
};

export const MyResumeContent: ResumeContent = {
  professionalSummary:
    'Software engineer with 8+ years of experience, including full stack product engineering, technical leadership and people management. Enjoys collaborating with others to produce high quality, testable code while improving existing systems and processes. Strives to design pragmatic solutions for complex challenges, balancing immediate product needs with long-term system considerations.',
  jobs: [
    {
      CompanyName: 'Imagine Pediatrics',
      Position: 'Senior Full Stack Software Engineer',
      Dates: '2026 - Present',
      Bullets: [
        {
          title: 'Builds and maintains full stack healthcare software with a focus on reliability, maintainability and thoughtful user experience',
          subBullets: []
        },
        {
          title: 'Collaborates across engineering, product and design to deliver features that support complex care workflows',
          subBullets: []
        },
        {
          title: 'Contributes senior engineering judgment through architecture discussions, code review and implementation planning',
          subBullets: []
        }
      ]
    },
    {
      CompanyName: 'PlexTrac',
      Position: 'Senior Software Engineer',
      Dates: '2024 - 2026',
      Bullets: [
        {
          title: 'Contributed to a security data management platform using React, TypeScript, PostgreSQL and Redis',
          subBullets: []
        },
        {
          title: 'Served as a technical lead for event-driven risk scoring capabilities',
          subBullets: []
        },
        {
          title: 'Designed and reviewed scalable system architectures in close collaboration with engineering, product and design partners',
          subBullets: []
        },
        {
          title: 'Mentored teammates on code quality, review practices, operational readiness and observability',
          subBullets: []
        }
      ]
    },
    {
      CompanyName: 'Janus',
      Position: 'Full Stack Software Engineer',
      Dates: '2023 - 2024',
      Bullets: [
        {
          title: 'Contributed to automation platform software across frontend, backend and browser-based tooling',
          subBullets: []
        },
        {
          title: 'Helped design and rebuild systems for data exploration, automation orchestration and concurrent web automation workflows',
          subBullets: [
            'TypeScript, Angular/RxJS, React, Express, Sequelize and WebSocket-based services'
          ]
        },
        {
          title: 'Led refactoring, documentation and testing improvements across multiple applications',
          subBullets: []
        },
        {
          title: 'Partnered with teammates and stakeholders to improve delivery clarity and technical maintainability',
          subBullets: []
        }
      ]
    },
    {
      CompanyName: 'Olive AI',
      Position: 'Software Engineer / Tech Lead / Software Engineering Manager',
      Dates: '2020 - 2023',
      Bullets: [
        {
          title: 'Software Engineer / Technical Lead',
          subBullets: [
            'Built healthcare automation software in collaboration with internal and external teams',
            'Led engineers through reusable automation product development using TypeScript, Node.js, MongoDB and AWS'
          ]
        },
        {
          title: 'Software Engineering Manager',
          subBullets: [
            'Led a product engineering team while supporting delivery, quality and team health',
            'Drove code quality and testing improvements across a fast-moving product area',
            'Managed high-priority cross-team integrations and operational improvement work'
          ]
        }
      ]
    },
    {
      CompanyName: 'NetJets',
      Position: 'Software Engineer',
      Dates: '2019',
      Bullets: [
        {
          title: 'Contributed to an application support and maintenance team responsible for a large enterprise portfolio',
          subBullets: []
        },
        {
          title: 'Gained familiarity with enterprise SDLC, Agile practices and varied tech stacks',
          subBullets: []
        }
      ]
    },
    {
      CompanyName: 'Tech4Imaging',
      Position: 'Software Engineer Intern',
      Dates: '2017 - 2018',
      Bullets: [
        {
          title: 'Collaborated with a small team on data imaging/visualization UI software written in AngularJS',
          subBullets: []
        },
        {
          title: 'Led development for Steel Scanner software UI (Vue.js/Electron)',
          subBullets: []
        }
      ]
    },
    {
      CompanyName: 'Ohio State University',
      Position: 'Software Consultant',
      Dates: '2016 - 2017',
      Bullets: [
        {
          title: 'Fielded Java/C++ questions and assisted students enrolled in various software development courses',
          subBullets: []
        }
      ]
    }
  ],
  education: {
    UniversityName: 'Ohio State University',
    Degree: 'B.S. Computer Science & Engineering',
    GradDate: '2018'
  },
  techKnowledge: {
    Languages: 'TypeScript, JavaScript, Python, Ruby, C#, C++, Java',
    Frontend: 'React, Angular, Vue.js, HTML, CSS, Playwright, Jest, Mocha, Chai',
    Backend: 'Node.js, Express, REST APIs, Redis, BullMQ',
    Databases: 'PostgreSQL, TimescaleDB, MongoDB, SQL, ORMs',
    Tools: 'AWS, Docker, GitHub, GitLab, Bitbucket, Jenkins, JIRA'
  }
};
