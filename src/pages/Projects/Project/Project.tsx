import React, { Component } from 'react'
import { ProjectsProps } from './../Projects.interface';

export default class Project extends Component {
    constructor(props: ProjectsProps) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        return (
            <div style={{ width: '40vw', height: '35vh', textAlign: 'center', backgroundColor: '#000000' }}>
                Project 1
            </div>
        );
    }
}
