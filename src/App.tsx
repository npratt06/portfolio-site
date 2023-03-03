import React, { Component } from 'react'
import PageLayout from './pages/PageLayout';

export default class App extends Component {

    // tmp
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <PageLayout />
        )
    }
}