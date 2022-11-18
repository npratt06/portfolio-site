import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { aboutStyle } from './About.const';
import { AboutProps, AboutState } from './About.interface';

export default class About extends Component<AboutProps, AboutState> {

    constructor(props: AboutProps) {
        super(props);
        this.state = {
            deviceType: props.deviceType
        };
    }

    componentDidUpdate(prevProps: Readonly<AboutProps>): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
        }
    }

    render() {
        return (
            <div style={aboutStyle}>
                <Link to="/">Home Page</Link>
                <h1>About</h1>
                <div>Blah blah blah, blah blah. Blah! Blah blah blah blah blah blah blah. Blah, blah blah blah blah blah. Blah?</div>
                <div>Blah blah blah, blah blah. Blah! Blah blah blah blah blah blah blah. Blah, blah blah blah blah blah. Blah?</div>
                <div>Blah blah blah, blah blah. Blah! Blah blah blah blah blah blah blah. Blah, blah blah blah blah blah. Blah?</div>
                <div>Blah blah blah, blah blah. Blah! Blah blah blah blah blah blah blah. Blah, blah blah blah blah blah. Blah?</div>
            </div>
        );
    }
}
