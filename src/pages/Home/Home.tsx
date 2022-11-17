import React, { Component } from 'react';
import JukeBox from '../../components/JukeBox/JukeBox';
import { homeStyle } from './Home.const';

export default class Home extends Component {
    render() {
        return (
            <div style={homeStyle}>
                <JukeBox />
            </div>
        );
    }
}
