import { MyPages } from '../components/JukeBox/NavDisplay/NavDisplay.const';
import Home from './Home/Home';
import React, { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { PageLayoutProps, PageLayoutState } from './PageLayout.interface';
import { DEVICE_TYPES } from '../global.const';
import About from './About/About';
import Projects from './Projects/Projects';
import Resume from './Resume/Resume';

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
            deviceType: DEVICE_TYPES.DESKTOP
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

    componentDidUpdate(prevProps: Readonly<PageLayoutProps>, prevState: Readonly<PageLayoutState>): void {
        // this isn't ideal to match on the displayString... TODO make this better
        if (prevState.deviceType !== this.state.deviceType) {
            const updatedPages: JSX.Element[] = [];
            MyPages.pages.forEach((page) => {
                let routeElement: JSX.Element = <Home deviceType={this.state.deviceType} />;
                if (page.displayString === 'About Me') {
                    routeElement = <About deviceType={this.state.deviceType} />;
                } else if (page.displayString === 'Projects') {
                    routeElement = <Projects deviceType={this.state.deviceType} />;                 
                } else if (page.displayString === 'Resume') {
                    routeElement = <Resume deviceType={this.state.deviceType} />;
                }
                updatedPages.push(
                    <Route
                        key={page.key}
                        path={page.linkPath}
                        element={routeElement}
                    />
                );
            });
            this.setState({ pages: updatedPages, windowWidth: this.state.windowWidth, windowHeight: this.state.windowHeight, deviceType: this.state.deviceType })
        }
    }

    updateDimensions() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        console.log(`width: ${windowWidth}`);
        console.log(`height: ${windowHeight}`);

        const deviceType = this.getDeviceType(windowWidth, windowHeight);

        console.log(`deviceType: ${deviceType}`);
        this.setState({ pages: this.state.pages, windowWidth, windowHeight, deviceType });
    }

    getDeviceType(windowWidth: number, windowHeight: number) {
        let deviceType = DEVICE_TYPES.DESKTOP;
        if (windowWidth < (windowHeight * 0.95)) {
            deviceType = DEVICE_TYPES.MOBILE;
        }
        return deviceType;
        // this didn't seem to be accurate for my iphone 8.. going to use width relative to height instead
        // if (windowWidth > 1024 && windowWidth <= 1200) {
        //     deviceType = DEVICE_TYPES.LAPTOP;
        // } else if (windowWidth > 768 && windowWidth <= 1024) {
        //     deviceType = DEVICE_TYPES.TABLET;
        // } else if (windowWidth > 480 && windowWidth <= 768) {
        //     deviceType = DEVICE_TYPES.MOBILE;
        // }
    }

    getComponents(): JSX.Element {
        return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home deviceType={this.state.deviceType}/>} />
                    {this.state.pages}
                </Routes>
            </HashRouter>
        );
    }

    render() {
        const components: JSX.Element = this.getComponents();
        return (<div>{components}</div>);
    }
}
