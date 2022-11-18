import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Project from './Project/Project';
import { projectsStyle } from './Projects.const';
import { ProjectsProps, ProjectsState } from './Projects.interface';

export default class Projects extends Component<ProjectsProps, ProjectsState> {

    constructor(props: ProjectsProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        };
    }

    componentDidUpdate(prevProps: Readonly<ProjectsProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
        }
    }

    render() {
        return (
            <div style={projectsStyle}>
                <Link to="/">Home Page</Link>
                <h1>Projects</h1>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Project></Project>
                    <Project></Project>
                    <Project></Project>
                </div>
            </div>
        );
    }
}
