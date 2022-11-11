import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { homeStyle } from './Home.const';
import Coin from '../../components/matterjs/Coin';

export default class Home extends Component {
    render() {
        return (
            <div style={homeStyle}>
                {/* <Coin /> */}
                <Navigation />
            </div>
        );
    }
}
