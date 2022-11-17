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
        };
    }

    render() {
        return (
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {this.state.pages}
                </Routes>
            </HashRouter>
        );
    }
}
