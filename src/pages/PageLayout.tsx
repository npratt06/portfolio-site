import { MyPages } from '../components/JukeBox/NavDisplay/NavDisplay.const';
import Home from './Home/Home';
import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PageLayoutProps, PageLayoutState } from './PageLayout.interface';

export default class PageLayout extends Component<
    PageLayoutProps,
    PageLayoutState
> {
    constructor(props: PageLayoutProps) {
        super(props);
        const pages: JSX.Element[] = [];
        MyPages.pages.forEach((page) => {
            pages.push(
                <Route
                    key={page.key}
                    path={page.linkPath}
                    element={page.component}
                />
            );
        });
        this.state = {
            pages,
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

        const deviceType = this.getDeviceType(windowWidth);

        console.log(`deviceType: ${deviceType}`);
        this.setState({ pages: this.state.pages, windowWidth, windowHeight, deviceType });
    }

    getDeviceType(windowWidth: number) {
        let deviceType = 'Desktop';
        if (windowWidth > 1024 && windowWidth <= 1200) {
            deviceType = 'Laptop';
        } else if (windowWidth > 768 && windowWidth <= 1024) {
            deviceType = 'Tablet';
        } else if (windowWidth > 480 && windowWidth <= 768) {
            deviceType = 'Mobile';
        }
        return deviceType;
    }

    render() {
        return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home deviceType={this.state.deviceType}/>} />
                    {this.state.pages}
                </Routes>
            </HashRouter>
        );
    }
}
