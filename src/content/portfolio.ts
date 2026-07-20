export interface ExternalLink {
  label: string;
  href: string;
  pending?: boolean;
}

export interface ProjectFeature {
  name: string;
  status: string;
  summary: string;
  details: string[];
  links: ExternalLink[];
}

export interface LabItem {
  title: string;
  category: 'Dev Environment' | 'Arcade' | 'Archive';
  summary: string;
  linkLabel: string;
  href: string;
  pending?: boolean;
}

export interface HomeStat {
  icon: 'briefcase' | 'calendar' | 'target';
  label: string;
  value: string;
  detail: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const externalLinks: Record<string, ExternalLink> = {
  github: {
    label: 'GitHub',
    href: 'https://github.com/npratt06'
  },
  linkedIn: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nate-pratt'
  }
};

export const heroStatement = {
  name: 'Nate Pratt',
  title: 'Senior full-stack engineer',
  summary: 'I build web products across the frontend and backend.'
};

export const homeStats: HomeStat[] = [
  {
    icon: 'briefcase',
    label: 'Current role',
    value: 'Imagine Pediatrics',
    detail: 'Senior Full-Stack Engineer'
  },
  {
    icon: 'calendar',
    label: 'Experience',
    value: '8+ years',
    detail: 'Product engineering'
  },
  {
    icon: 'target',
    label: 'Focus',
    value: 'Full-stack systems',
    detail: 'TypeScript, React, and Node.js'
  }
];

export const projects: ProjectFeature[] = [
  {
    name: 'Wiffle App',
    status: 'Live',
    summary: 'A web app for organizing wiffle ball leagues, teams, and games.',
    details: [
      'Covers league setup, schedules, teams, players, and game coordination.',
      'The live app is public; the source remains private while I finish cleanup.'
    ],
    links: [
      {
        label: 'Open live app',
        href: 'https://main.da0rwksdtzo0.amplifyapp.com/'
      }
    ]
  },
  {
    name: 'Fantasy Football Recap Generator',
    status: 'In development',
    summary: 'A new tool for turning weekly fantasy football results into a shareable league recap.',
    details: [],
    links: []
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['TypeScript', 'React', 'Angular', 'Vue.js', 'HTML', 'CSS', 'Playwright', 'Jest']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'REST APIs', 'Redis', 'BullMQ', 'C#', '.NET']
  },
  {
    title: 'Data',
    skills: ['PostgreSQL', 'TimescaleDB', 'MongoDB', 'SQL', 'Data modeling', 'ORMs']
  },
  {
    title: 'Delivery',
    skills: ['Git', 'GitHub', 'Docker', 'AWS', 'CI/CD', 'Observability', 'Code review']
  }
];

export const labItems: LabItem[] = [
  {
    title: 'Dotfiles',
    category: 'Dev Environment',
    summary: 'The configuration and setup notes I use to keep a repeatable development environment.',
    linkLabel: 'View dotfiles',
    href: 'https://github.com/npratt06/dotfiles'
  },
  {
    title: 'Zomboozled',
    category: 'Arcade',
    summary: 'A preserved browser game from 2017. High scores remain offline.',
    linkLabel: 'Play Zomboozled',
    href: '#/zomboozled'
  },
  {
    title: 'Pong',
    category: 'Arcade',
    summary: 'A two-player canvas game preserved as a desktop-only experiment.',
    linkLabel: 'Play Pong',
    href: '#/pong'
  },
  {
    title: 'Original portfolio interface',
    category: 'Archive',
    summary: 'The 2017 jukebox interface, preserved as a snapshot of earlier work.',
    linkLabel: 'View archive',
    href: '#/lab/archive'
  }
];
