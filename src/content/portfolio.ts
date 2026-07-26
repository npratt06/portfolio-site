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
  icon: 'briefcase' | 'calendar' | 'stack';
  label: string;
  value: string;
  detail?: string;
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
  title: 'Software engineer',
  summary: 'I love to solve problems across the stack & design elegant solutions.'
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
    detail: 'Software engineering & management'
  },
  {
    icon: 'stack',
    label: 'Focus',
    value: 'React, TypeScript, Node.js, PostgreSQL, AWS'
  }
];

export const projects: ProjectFeature[] = [
  {
    name: 'Wiffle App',
    status: 'Live',
    summary: 'A web app I built for a friend’s yearly backyard wiffle ball tournament',
    details: [
      'Built and launched the initial version in six days for the tournament',
      'Generates tournament brackets automatically',
      'Supports fully customizable brackets and teams, including flexible mid-tournament adjustments',
      'Tracks live game state, reducing admin work and giving spectators real-time visibility'
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
    summary: 'Admin tool that utilizes Sleeper API to generate weekly league-specific statistics. Stats are richer and more dynamic than what Sleeper automatically provides.',
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
    summary: 'Idempotent & repeatable local dev terminal setup for macOS',
    linkLabel: 'View dotfiles',
    href: 'https://github.com/npratt06/dotfiles'
  },
  {
    title: 'Zomboozled',
    category: 'Arcade',
    summary: 'Browser game I created in 2017, challenging myself to build a game from scratch in a single HTML file',
    linkLabel: 'Play Zomboozled',
    href: '#/zomboozled'
  },
  {
    title: 'Pong',
    category: 'Arcade',
    summary: '2-player browser Pong game I created for fun in preparation for Zomboozled',
    linkLabel: 'Play Pong',
    href: '#/pong'
  },
  {
    title: 'Original portfolio interface',
    category: 'Archive',
    summary: 'The OG jukebox interface for this portfolio site that I created in a cave with a box of scraps in 2022. Kept it around for nostalgia',
    linkLabel: 'View archive',
    href: '#/lab/archive'
  }
];
