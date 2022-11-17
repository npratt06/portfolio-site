import React, { Component } from 'react'
import PageLayout from './pages/PageLayout';

interface AppState {
    windowWidth: number,
    windowHeight: number,
    deviceType: string
}

export default class App extends Component<any, AppState> {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0,
            deviceType: 'Desktop'
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

        console.log(`width: ${windowWidth}`);
        console.log(`height: ${windowHeight}`);

        let deviceType = '';
        if (windowWidth > 1200) {
            deviceType = 'Desktop';
        } else if (windowWidth > 1024 && windowWidth <= 1200) {
            deviceType = 'Laptop';
        } else if (windowWidth > 768 && windowWidth <= 1024) {
            deviceType = 'Tablet';
        } else if (windowWidth > 480 && windowWidth <= 768) {
            deviceType = 'Mobile';
        } else {
            deviceType = 'Desktop';
        }

        this.setState({ windowWidth, windowHeight, deviceType });
    }

    render() {
        return (
            <PageLayout />
        )
    }
}