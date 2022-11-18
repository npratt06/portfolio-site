import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Job, ResumeProps, ResumeState } from './Resume.interface';
import { MyResumeContent, resumeStyle } from './Resume.const';

export default class Resume extends Component<ResumeProps, ResumeState> {

    constructor(props: ResumeProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        };
    }

    componentDidUpdate(prevProps: Readonly<ResumeProps>): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
        }
    }
    
    render() {
        return (
            <div style={resumeStyle}>
                <Link to="/">Home Page</Link>
                <h1>Resume</h1>
                <h2>Professional Summary</h2>
                <div>{MyResumeContent.professionalSummary}</div>
                <h2>Experience</h2>
                <div>
                    {MyResumeContent.jobs.map((job: Job, index) => {
                        const bulletContent = job.Bullets.map((jobBullet, index) => {
                            const subBulletContent = jobBullet.subBullets.map((subBullet, index) => {
                                return (
                                    <div key={`subBullet${index}`}>{subBullet}</div>
                                );
                            })
                            return (
                                <div key={`bullet${index}`}>
                                    <div>{jobBullet.title}</div>
                                    <div>{subBulletContent}</div>
                                </div>
                            );
                        });
                        return (
                            <div key={`job${index}`}>
                                <div>{job.CompanyName}</div>
                                <div>{job.Position}</div>
                                <div>{job.Location}</div>
                                <div>{bulletContent}</div>
                            </div>
                        );
                    })}
                </div>
                <h2>Education</h2>
                <div>{MyResumeContent.education.UniversityName}</div>
                <div>{MyResumeContent.education.Location}</div>
                <div>{MyResumeContent.education.Degree}</div>
                <div>{MyResumeContent.education.GradDate}</div>
                <h2>Tech Knowledge</h2>
                <div>{MyResumeContent.techKnowledge.Languages}</div>
                <div>{MyResumeContent.techKnowledge.Technologies}</div>
            </div>
        );
    }
}
