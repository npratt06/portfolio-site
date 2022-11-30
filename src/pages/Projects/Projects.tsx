import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { outerWrapper } from '../../components/JukeBox/JukeBox.interface';
import Project from './Project/Project';
import { hrStyle, MyProjects, projectsRowStyle, projectsStyle, projectStyle, PROJECTS_STYLE_SETS } from './Projects.const';
import { ProjectsProps, ProjectsState } from './Projects.interface';
import { getStyleSet, StyleSet } from '../../components/componentHelpers';
import { ProjectInfo } from './Project/Project.interface';

export default class Projects extends Component<ProjectsProps, ProjectsState> {

    styleSet: StyleSet;
    projects: JSX.Element[];
    
    constructor(props: ProjectsProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        };
        this.styleSet = getStyleSet(props.deviceType, PROJECTS_STYLE_SETS);
        this.projects = this.getProjects(MyProjects, props.deviceType);
    }

    componentDidUpdate(prevProps: Readonly<ProjectsProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
            this.styleSet = getStyleSet(this.props.deviceType, PROJECTS_STYLE_SETS);
            this.projects = this.getProjects(MyProjects, this.props.deviceType);
        }
    }

    getProjects(myProjects: ProjectInfo[], deviceType: string) {
        const projects = myProjects.map(currentProject => {
            return (
                <div key={currentProject.name} style={projectStyle}>
                    <Project deviceType={deviceType} imgSrc={currentProject.imgSrc} name={currentProject.name} link={currentProject.link} description={currentProject.description}></Project>
                </div>
            );
        });
        return projects;
    }

    render() {
        return (
            <div style={projectsStyle}>
                <div style={outerWrapper}>
                    <div style={{ display: 'flex', justifyContent: 'left', width: '100vw'}}>
                        <Link to="/" style={{ fontSize: '25px' }}>Home Page</Link>
                    </div>
                    <div style={{ marginTop: '50px' }} />
                    <div style={projectsRowStyle}>
                        <div style={{ fontSize: '225%' }}>Projects</div>
                    </div>
                    <div style={projectsRowStyle}>
                        <hr style={hrStyle}></hr>
                    </div>
                    {this.projects}
                </div>
            </div>
        );
    }
}
