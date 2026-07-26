export interface Job {
  CompanyName: string;
  Position: string;
  Dates: string;
}

export interface ResumeContent {
  jobs: Job[];
  education: {
    UniversityName: string;
    GradDate: string;
    Degree: string;
  };
}
