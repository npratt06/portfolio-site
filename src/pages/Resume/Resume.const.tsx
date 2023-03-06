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
    'Software engineer with 5+ years experience, including 1 year of  management experience. Enjoys brainstorming with others to produce high quality, maintainable software. Strives to design optimal solutions for challenging software problems while following principles such as SOLID and DRY.',
  jobs: [
    {
      CompanyName: 'Olive AI',
      Position: 'Software Engineer / Software Engineering Manager',
      Dates: 'Janurary 2020 - Present',
      Location: 'Columbus, Ohio / Remote',
      Bullets: [
        {
          title: 'Software Engineer/Technical Lead Roles',
          subBullets: [
            'Collaborated with external and internal teams to create custom healthcare automations as a Robot Process Automation Engineer',
            'Acted as the Technical Lead for a group of software automation engineers',
            'Designed and developed a reusable, productized version of the claim status automation process as a software engineer'
          ]
        },
        {
          title: 'Software Engineering Manager Role',
          subBullets: [
            "Led a team of Software Engineers that developed and maintained Olive's claim status automation product",
            'Improved people management and Agile skills while facilitating feature development and maintenance of the product',
            'Drove code quality and testing improvement initiatives (test coverage increased by >50%)',
            'Successfully managed high priority, fast-paced, multi-team product integrations',
            "Reduced company's resource and vendor costs through various software enhancements (costs reduced by approximately $4,000,000 per year)"
          ]
        }
      ]
    },
    {
      CompanyName: 'NetJets',
      Position: 'Software Engineer',
      Dates: 'January 2019 - December 2019',
      Location: 'Columbus, Ohio',
      Bullets: [
        {
          title: 'Responsibilities',
          subBullets: [
            'Contributed to a team responsible for supporting over 200 applications',
            'Managed defects and enhancements for various software',
            'Experienced multiple different tech stacks while supporting these apps',
            'Familiarized with enterprise SDLC in an agile environment',
            'Coordinated releases between multiple teams'
          ]
        }
      ]
    },
    {
      CompanyName: 'Tech4Imaging',
      Position: 'Software Engineer Intern',
      Dates: 'May 2017 - October 2018',
      Location: 'Columbus, Ohio',
      Bullets: [
        {
          title: 'Collaborated with a team on data imaging/visualization UI software written in AngularJS',
          subBullets: ['Improved user experience by developing automated monitoring feature']
        },
        {
          title: 'Designed and implemented Vue.js/Electron front-end for Steel Scanner software',
          subBullets: ['Led development on the project', 'Iterated on project through mock-ups and demos presented to the team']
        }
      ]
    },
    {
      CompanyName: 'Ohio State University',
      Position: 'Java Consultant',
      Dates: 'August 2016 - January 2017',
      Location: 'Columbus, Ohio',
      Bullets: [
        {
          title: 'Responsibilities',
          subBullets: ['Fielded syntax and logic questions in Java/C++', 'Assisted students enrolled in various software development courses']
        }
      ]
    }
  ],
  education: {
    UniversityName: 'Ohio State University',
    Degree: 'B.S. Computer Science & Engineering',
    Location: 'Columbus, Ohio',
    GradDate: 'December 2018'
  },
  techKnowledge: {
    Languages: 'TypeScript, JavaScript, React, HTML/CSS, Python, C#, C++, Java, SQL',
    Technologies: 'AWS, MongoDB, VS Code, Git, GitHub, GitLab, Bitbucket, Jenkins, JIRA'
  }
};
