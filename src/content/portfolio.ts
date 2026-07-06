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

export interface SelectedWorkItem {
  icon: 'wiffle' | 'github' | 'flask';
  title: string;
  summary: string;
  linkLabel: string;
  href: string;
  pending?: boolean;
}

export interface WorkPrinciple {
  icon: 'search' | 'archive' | 'code' | 'users' | 'target';
  title: string;
  summary: string;
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
  summary:
    'I build product systems that are practical, resilient, and easy to evolve.',
  detail:
    'I work across frontend, backend, delivery planning, code review, and operational readiness with a bias toward clear systems that teams can maintain.'
};

export const humanNote =
  'Outside the professional spine, I still like making small playable things, tuning my dev environment, and keeping a little handmade character in the work.';

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
    detail: 'Product systems and platforms'
  },
  {
    icon: 'target',
    label: 'Focus',
    value: 'Pragmatic architecture',
    detail: 'Testable code. Clear communication.'
  }
];

export const featuredProject: ProjectFeature = {
  name: 'Wiffle App',
  status: 'Featured project',
  summary:
    'A product-style web app for organizing wiffle ball leagues and games. The live app is available now, with the repository planned to become public soon.',
  details: [
    'Built around the practical coordination needs of players, teams, games, and league activity.',
    'Designed as the featured public project because it is closer to real product work than a portfolio demo.',
    'Repository is currently private while final public-facing cleanup is finished.'
  ],
  links: [
    {
      label: 'Live app',
      href: 'https://main.da0rwksdtzo0.amplifyapp.com/'
    }
  ]
};

export const selectedWorkItems: SelectedWorkItem[] = [
  {
    icon: 'wiffle',
    title: 'Wiffle App',
    summary: 'A web app for organizing wiffle ball leagues and games.',
    linkLabel: 'View project',
    href: '#/projects'
  },
  {
    icon: 'github',
    title: 'GitHub',
    summary: 'Explore repositories, code, and additional public projects.',
    linkLabel: 'Visit GitHub',
    href: externalLinks.github.href,
    pending: externalLinks.github.pending
  },
  {
    icon: 'flask',
    title: 'Lab',
    summary: 'Tools, experiments, games, and archive work.',
    linkLabel: 'Explore Lab',
    href: '#/lab'
  }
];

export const workPrinciples: WorkPrinciple[] = [
  {
    icon: 'search',
    title: 'Understand the problem',
    summary: 'Ask good questions and get to the real need.'
  },
  {
    icon: 'archive',
    title: 'Design for change',
    summary: 'Build systems that can evolve without pain.'
  },
  {
    icon: 'code',
    title: 'Build with care',
    summary: 'Write readable code and verify the important things.'
  },
  {
    icon: 'users',
    title: 'Collaborate clearly',
    summary: 'Communicate early and support the team.'
  },
  {
    icon: 'target',
    title: 'Ship and learn',
    summary: 'Deliver value and iterate with feedback.'
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
    summary:
      'Configuration and setup notes for keeping my development environment repeatable and comfortable.',
    linkLabel: 'View dotfiles',
    href: 'https://github.com/npratt06/dotfiles'
  },
  {
    title: 'Zomboozled',
    category: 'Arcade',
    summary:
      'A preserved browser game experiment from 2017. It stays playable as Lab material, with offline high scores only.',
    linkLabel: 'Play Zomboozled',
    href: '#/zomboozled'
  },
  {
    title: 'Pong',
    category: 'Arcade',
    summary:
      'A preserved two-player canvas game experiment, wired into the Lab as a desktop-only arcade artifact.',
    linkLabel: 'Play Pong',
    href: '#/pong'
  },
  {
    title: 'Original portfolio interface',
    category: 'Archive',
    summary:
      '"I built this in a cave with a box of scraps." This 2017 jukebox shell is preserved for nostalgia, not as a second portfolio.',
    linkLabel: 'View archive',
    href: '#/lab/archive'
  }
];
