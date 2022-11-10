import React, { Component } from 'react';
import NavDisplay from './NavDisplay/NavDisplay';
import {
    outerWrapper,
    rowElement,
    NavigationProps,
    NavigationState,
} from './Navigation.interface';
import NavigateLR from './NavLR/NavLR';
import { MyPages } from './NavDisplay/NavDisplay.const';

export default class Navigation extends Component<
    NavigationProps,
    NavigationState
> {
    constructor(props: NavigationProps) {
        super(props);

        this.state = {
            navIndex: 0,
        };
    }

    handleClickLeft() {
        this.setState((prevState) => {
            let cni = prevState.navIndex - 1;
            if (cni < 0) cni = MyPages.pages.length - 1;
            return { navIndex: cni };
        });
    }

    handleClickRight() {
        this.setState((prevState) => {
            let cni = prevState.navIndex + 1;
            if (cni > MyPages.pages.length - 1) cni = 0;
            return { navIndex: cni };
        });
    }

    render() {
        return (
            <div>
                <div style={outerWrapper}>
                    <div style={rowElement}>
                        <NavDisplay navIndex={this.state.navIndex}></NavDisplay>
                    </div>
                    <div style={rowElement}>
                        <NavigateLR
                            navIndex={this.state.navIndex}
                            handleClickLeft={this.handleClickLeft.bind(this)}
                            handleClickRight={this.handleClickRight.bind(this)}
                        ></NavigateLR>
                    </div>
                </div>
            </div>
        );
    }
}
