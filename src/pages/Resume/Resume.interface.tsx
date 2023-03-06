export interface ResumeProps {
  deviceType: string;
}

export interface ResumeState {
  deviceType: string;
}

export interface JobBullet {
  title: string;
  subBullets: string[];
}

export interface Job {
  CompanyName: string;
  Position: string;
  Dates: string;
  Location: string;
  Bullets: JobBullet[];
}

export interface ResumeContent {
  jobs: Job[];
  professionalSummary: string;
  education: {
    UniversityName: string;
    Location: string;
    GradDate: string;
    Degree: string;
  };
  techKnowledge: {
    [techGroup: string]: string;
  };
}
