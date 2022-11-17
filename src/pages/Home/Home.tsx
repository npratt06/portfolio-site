import React, { Component } from 'react';
import JukeBox from '../../components/JukeBox/JukeBox';
import { homeStyle } from './Home.const';
import { HomeProps, HomeState } from './Home.interface';

export default class Home extends Component<HomeProps, HomeState> {

    constructor(props: HomeProps) {
        super(props);
    }

    render() {
        return (
            <div style={homeStyle}>
                <JukeBox />
            </div>
        );
    }
}
