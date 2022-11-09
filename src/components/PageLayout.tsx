import { MyPages } from './Navigation/NavDisplay/NavDisplay.const';
import Home from '../pages/Home';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default class PageLayout extends Component {
    pages: JSX.Element[] = [];

    constructor(props: any) {
        super(props);
        MyPages.pages.forEach(page => {
            this.pages.push(<Route key={page.key} path={page.linkPath} element={page.component} />);
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {this.pages}
                </Routes>
            </BrowserRouter>
        )
    }
}
