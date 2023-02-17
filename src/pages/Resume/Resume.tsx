import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Job, ResumeProps, ResumeState } from './Resume.interface';
import { MyResumeContent, resumeRowStyle, resumeStyle, resumeSectionHeaderStyle, RESUME_STYLE_SETS, resumeTitleStyle } from './Resume.const';
import { outerWrapper } from '../../components/JukeBox/JukeBox.interface';
import { getStyleSet, StyleSet } from '../../components/componentHelpers';

export default class Resume extends Component<ResumeProps, ResumeState> {

    styleSet: StyleSet;
    
    constructor(props: ResumeProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        };

        this.styleSet = getStyleSet(props.deviceType, RESUME_STYLE_SETS);
    }

    componentDidUpdate(prevProps: Readonly<ResumeProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
            this.styleSet = getStyleSet(this.props.deviceType, RESUME_STYLE_SETS);
        }
    }
    
    getComponents(): JSX.Element {
        let bulletContent: JSX.Element[] = [];
        let subBulletContent: JSX.Element[] = [];
        const jobs: JSX.Element[] = MyResumeContent.jobs.map((job: Job, index) => {
            bulletContent = job.Bullets.map((jobBullet, index) => {
                subBulletContent = jobBullet.subBullets.map((subBullet, index) => {
                    return (
                        <li key={`subBullet${index}`}>
                            <div>{subBullet}</div>
                        </li>
                    );
                })
                return (
                    <li key={`bullet${index}`}>
                        <div>{jobBullet.title}</div>
                        <ul>{subBulletContent}</ul>
                    </li>
                );
            });
            return (
                <div key={`job${index}`}>
                    <div style={{ fontSize: '150%'}}>{job.CompanyName}</div>
                    <div>{job.Position}</div>
                    <div>{job.Location}</div>
                    <ul style={{textAlign: 'left'}}>{bulletContent}</ul>
                </div>
            );
        });

        const techKnowledge: JSX.Element[] = Object.keys(MyResumeContent.techKnowledge).map(category => {
            return (
                <div style={resumeRowStyle} key={`techKnowledge${category}`}>
                    <div style={this.styleSet.resumeRowContentStyle}>
                        <div>{category}: {MyResumeContent.techKnowledge[category]}</div>
                    </div>
                </div>
            );
        });

        return (
            <div style={resumeStyle}>
                <div style={outerWrapper}>
                    <div style={resumeRowStyle}>
                        <div style={{ display: 'flex', justifyContent: 'left', width: '100vw'}}>
                            <Link to="/" style={{ fontSize: '25px' }}>Home Page</Link>
                        </div>
                    </div>
                    <div style={{ marginTop: '50px' }} />
                    <div style={resumeRowStyle}>
                        <div style={resumeTitleStyle}>
                            <div style={{ fontSize: '225%' }}>Resume</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div style={resumeSectionHeaderStyle}>Professional Summary</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            {MyResumeContent.professionalSummary}
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div style={resumeSectionHeaderStyle}>Experience</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div>
                                {jobs}
                            </div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div style={resumeSectionHeaderStyle}>Education</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div>{MyResumeContent.education.UniversityName}</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div>{MyResumeContent.education.Location}</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div>{MyResumeContent.education.Degree}</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div>{MyResumeContent.education.GradDate}</div>
                        </div>
                    </div>
                    <div style={resumeRowStyle}>
                        <hr style={this.styleSet.hrStyle}></hr>
                    </div>
                    <div style={resumeRowStyle}>
                        <div style={this.styleSet.resumeRowContentStyle}>
                            <div style={resumeSectionHeaderStyle}>Tech Knowledge</div>
                        </div>
                    </div>
                    {techKnowledge}
                    <div style={{ marginBottom: '3vw' }} />
                </div>
            </div>
        );
    }

    render() {
        const components: JSX.Element = this.getComponents();
        return (<div>{components}</div>);
    }
}
