import React, { Component } from 'react'
import PageLayout from './pages/PageLayout';

export default class App extends Component {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);
        this.state = {
            windowWidth: 0,
            windowHeight: 0
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

        this.setState({ windowWidth, windowHeight });
    }

    render() {
        return (
            <PageLayout />
        )
    }
}