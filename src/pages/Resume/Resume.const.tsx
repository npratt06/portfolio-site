import { ResumeContent } from "./Resume.interface";

export const resumeStyle: React.CSSProperties = {
    backgroundColor: '#523814',
    position: 'relative',
    WebkitOverflowScrolling: 'touch',
};

export const MyResumeContent: ResumeContent = {
    professionalSummary: 'Software engineer with leadership experience who excels in collaborative problem solving. Enjoys brainstorming with other talented engineers to produce high quality, creative solutions',
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
                        'Led a team of Software Engineers that developed and maintained the claim status automation product',
                        'Learned people management and Agile skills',
                        'Guided team to improve code quality and testing processes',
                        'Successfully managed high priority inter-team product integration initiative'
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
                    subBullets: [
                        'Improved user experience by developing automated monitoring feature'
                    ]
                },
                {
                    title: 'Designed and implemented Vue.js/Electron front-end for Steel Scanner software',
                    subBullets: [
                        'Led development on the project',
                        'Iterated on project through mock-ups and demos presented to the team'
                    ]
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
                    subBullets: [
                        'Fielded syntax and logic questions in Java/C++',
                        'Assisted students enrolled in various software development courses'
                    ]
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
        'Languages': 'JavaScript, TypeScript, Python, C#, C++, Java, SQL, HTML/CSS',
        'Technologies': 'MongoDB, VS Code, AWS, Jenkins, Git, GitHub, GitLab, Bitbucket, JIRA, Confluence, Rundeck, Nexus'
    }
}