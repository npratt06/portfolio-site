import React, { Component } from 'react';
import Coin from '../../components/matterjs/Coin';
import Navigation from '../../components/Navigation/Navigation';
import { homeStyle } from './Home.const';

export default class Home extends Component {
    render() {
        return (
            <div style={homeStyle}>
                <Coin />
                <Navigation />
            </div>
        );
    }
}
