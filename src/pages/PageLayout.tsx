import { MyPages } from '../components/Navigation/NavDisplay/NavDisplay.const';
import Home from '../pages/Home';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageLayoutProps, PageLayoutState } from './PageLayout.interface';

export default class PageLayout extends Component<PageLayoutProps, PageLayoutState> {
    constructor(props: PageLayoutProps) {
        super(props);
        const pages: JSX.Element[] = [];
        MyPages.pages.forEach(page => {
            pages.push(<Route key={page.key} path={page.linkPath} element={page.component} />);
        });
        this.state = {
            pages
        };
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {this.state.pages}
                </Routes>
            </BrowserRouter>
        )
    }
}
