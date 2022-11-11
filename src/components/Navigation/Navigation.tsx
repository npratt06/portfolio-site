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
import Draggable from 'react-draggable';
import coin from '../../img/coin.png';

export default class Navigation extends Component<
    NavigationProps,
    NavigationState
> {

    constructor(props: NavigationProps) {
        super(props);
        const state = this.getStoredState();
        this.setStoredState(state);
        this.state = state;
    }

    getStoredState() {
        const rawStoredState = window.localStorage.getItem('state');
        let state;
        if (rawStoredState) {
            state = JSON.parse(rawStoredState);
        }
        if (!state) {
            state = {
                navIndex: 0,
            };
        }
        return state;
    }

    setStoredState(state: NavigationState) {
        window.localStorage.setItem('state', JSON.stringify(state));
    }

    componentDidUpdate(prevState: NavigationState): void {
        // if state.navIndex has changed, update stored state
        if (prevState.navIndex !== this.state.navIndex) {
            this.setStoredState(this.state);
        }
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
                    <div style={{position: 'absolute', zIndex: '99', top: 0, left: 0}}>
                        <Draggable>
                            <div style={{width: '200px', height: '200px'}}><img style={{width: 'auto', height: 'inherit', pointerEvents: 'none'}} src={coin} /></div>
                        </Draggable>
                    </div>
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
