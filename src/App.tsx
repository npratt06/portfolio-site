import React, { Component } from 'react'
import PageLayout from './pages/PageLayout';
import 'animate.css/animate.compat.css'

export default class App extends Component {

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