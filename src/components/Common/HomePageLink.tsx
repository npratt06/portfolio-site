import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePageLink extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                <Link to="/" style={{ fontSize: '25px' }}>
                    Home Page
                </Link>
            </div>
        )
    }
}
