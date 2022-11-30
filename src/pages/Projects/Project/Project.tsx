import React, { Component } from 'react'
import { ProjectProps, ProjectState } from './Project.interface';
import { PROJECT_STYLE_SETS } from './Project.const';
import { getStyleSet, StyleSet } from '../../../components/componentHelpers';
import { DEVICE_TYPES } from '../../../global.const';

export default class Project extends Component<ProjectProps, ProjectState> {

    styleSet: StyleSet;
    name: string;
    link: string;
    description: string;
    imgSrc: string;

    constructor(props: ProjectProps) {
        super(props);
        this.name = props.name;
        this.description = props.description;
        this.imgSrc = props.imgSrc;
        this.link = props.link;
        this.state = {
            deviceType: props.deviceType
        }
        this.styleSet = getStyleSet(props.deviceType, PROJECT_STYLE_SETS);
    }

    componentDidUpdate(prevProps: Readonly<ProjectProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
            this.styleSet = getStyleSet(this.props.deviceType, PROJECT_STYLE_SETS);
        }
    }
    
    getComponents(): JSX.Element {
        let components: JSX.Element = (
            <div style={this.styleSet.ProjectStyle}>
                <a href={this.link} style={this.styleSet.ProjectColumnStyle}>
                    <img style={{ width: 'inherit', height: 'auto', border: '5px solid #ffffff'}} src={this.imgSrc}/>
                </a>
                <div style={this.styleSet.ProjectColumnStyle}>
                    <div style={{paddingLeft: '4vw', paddingRight: '4vw'}}>
                        <div style={this.styleSet.ProjectNameStyle}>
                            <a href={this.link}>{this.name}</a>
                        </div>
                        <div style={this.styleSet.ProjectDescriptionStyle}>
                            {this.description} 
                        </div>
                    </div>
                </div>
            </div>
        );
        if (this.state.deviceType === DEVICE_TYPES.MOBILE) {
            components = (
                <div style={this.styleSet.ProjectStyle}>
                    <div style={this.styleSet.ProjectColumnStyle}>
                        <div style={this.styleSet.ProjectNameStyle}>
                            <a href={this.link}>{this.name}</a>
                        </div>
                        <a href={this.link} style={{ width: 'inherit', height: 'auto' }}>
                            <img style={{ width: 'inherit', height: 'auto', border: '5px solid #ffffff'}} src={this.imgSrc}/>
                        </a>
                        <div style={{paddingLeft: '1vw', paddingRight: '1vw'}}>
                            <div style={this.styleSet.ProjectDescriptionStyle}>
                                {this.description} 
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return components;
    }

    render() {
        const ProjectComponents = this.getComponents();
        return ProjectComponents;
    }
}
