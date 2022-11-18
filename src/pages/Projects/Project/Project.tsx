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
            <div style={{ margin: '2vw', width: '35vw', height: '25vh', textAlign: 'center', backgroundColor: '#402c10' }}>Project 1</div>
        );
    }
}
