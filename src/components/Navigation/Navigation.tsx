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
    // nodeRef is used for a workaround to avoid findDOMNode warning when using react-draggable
    nodeRef;

    constructor(props: NavigationProps) {
        super(props);
        const state = this.getStoredState() as NavigationState;
        this.setStoredState(state);
        state.isMouseDownOnNavBtn = false;
        this.state = state;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.nodeRef = React.createRef() as any;
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

    handleMouseDown() {
        console.log(`Navigation handleMouseDown called!`);
        this.setState(() => {
            return { navIndex: this.state.navIndex, isMouseDownOnNavBtn: true};
        });
    }

    handleMouseUp() {
        console.log(`Navigation handleMouseUp called!`);
        this.setState(() => {
            return { navIndex: this.state.navIndex, isMouseDownOnNavBtn: false};
        });
    }

    handleMouseLeave() {
        console.log(`Navigation handleMouseLeave called!`);
        this.setState(() => {
            return { navIndex: this.state.navIndex, isMouseDownOnNavBtn: false};
        });
    }

    render() {
        return (
            <div style={outerWrapper}>
                <div style={rowElement}>
                    <NavDisplay navIndex={this.state.navIndex} isMouseDownOnNavBtn={this.state.isMouseDownOnNavBtn}></NavDisplay>
                </div>
                <div style={rowElement}>
                    <NavigateLR
                        navIndex={this.state.navIndex}
                        handleClickLeft={this.handleClickLeft.bind(this)}
                        handleClickRight={this.handleClickRight.bind(this)}
                        handleMouseDown={this.handleMouseDown.bind(this)}
                        handleMouseUp={this.handleMouseUp.bind(this)}
                        handleMouseLeave={this.handleMouseLeave.bind(this)}
                    ></NavigateLR>
                    <Draggable nodeRef={this.nodeRef}>
                        <div ref={this.nodeRef} style={{width: '10vw', height: '10vw', position: 'absolute', right: '7.5vw', marginTop: '1vh'}}><img style={{width: 'inherit', height: 'auto', pointerEvents: 'none'}} src={coin} /></div>
                    </Draggable>
                </div>
            </div>
        );
    }
}
