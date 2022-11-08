import React, { Component } from 'react'
import { NavDisplayStrings, NavDisplayState } from './NavDisplay.interface';

export default class NavDisplay extends Component<any, NavDisplayState> {

    constructor(props: any) {
        super(props);
        const defaultStr = NavDisplayStrings[0];
        this.state = {
            navDisplayString: defaultStr
        };
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.navDisplayString}
                </div>
            </div>
        )
    }
}
