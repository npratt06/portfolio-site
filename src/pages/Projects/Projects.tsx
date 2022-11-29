import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { outerWrapper } from '../../components/JukeBox/JukeBox.interface';
import Project from './Project/Project';
import { hrStyle, projectsRowStyle, projectsStyle } from './Projects.const';
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
                    <div style={{...projectsRowStyle, marginBottom: '1vw' }}>
                        <Project></Project>
                    </div>
                    <div style={{...projectsRowStyle, marginBottom: '1vw' }}>
                        <Project></Project>
                    </div>
                </div>
            </div>
        );
    }
}
