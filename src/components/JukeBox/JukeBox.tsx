import React, { Component } from 'react';
import NavDisplay from './NavDisplay/NavDisplay';
import {
    outerWrapper,
    rowElement,
    JukeBoxProps,
    JukeBoxState,
} from './JukeBox.interface';
import NavigateLR from './NavLR/NavLR';
import { MyPages } from './NavDisplay/NavDisplay.const';
// import Draggable from 'react-draggable';
// import coin from '../../img/coin.png';
import { DEVICE_TYPES } from '../../global.const';
import plaque from '../../img/plaqueLong.png';

export default class JukeBox extends Component<
    JukeBoxProps,
    JukeBoxState
> {
    // nodeRef is used for a workaround to avoid findDOMNode warning when using react-draggable
    nodeRef;

    constructor(props: JukeBoxProps) {
        super(props);
        const state = this.getStoredState() as JukeBoxState;
        state.deviceType = props.deviceType;
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

    setStoredState(state: JukeBoxState) {
        window.localStorage.setItem('state', JSON.stringify(state));
    }

    componentDidUpdate(prevProps: JukeBoxProps, prevState: JukeBoxState): void {
        // if state.navIndex has changed, update stored state
        if (prevState.navIndex !== this.state.navIndex || prevState.deviceType !== this.state.deviceType) {
            this.setStoredState(this.state);
        }
        if (this.props.deviceType !== prevProps.deviceType) {
            this.setState({ navIndex: this.state.navIndex, isMouseDownOnNavBtn: this.state.isMouseDownOnNavBtn, deviceType: this.props.deviceType });
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
        this.setState(() => {
            return { navIndex: this.state.navIndex, isMouseDownOnNavBtn: true };
        });
    }

    handleMouseUp() {
        this.setState(() => {
            return { navIndex: this.state.navIndex, isMouseDownOnNavBtn: false };
        });
    }

    handleMouseLeave() {
        this.setState(() => {
            return { navIndex: this.state.navIndex, isMouseDownOnNavBtn: false };
        });
    }

    getComponents(): JSX.Element {
        const navDisplayComponent: JSX.Element = (
            <NavDisplay navIndex={this.state.navIndex} isMouseDownOnNavBtn={this.state.isMouseDownOnNavBtn} deviceType={this.state.deviceType}></NavDisplay>
        );
        const navLRComponent: JSX.Element = (
            <NavigateLR
                navIndex={this.state.navIndex}
                handleClickLeft={this.handleClickLeft.bind(this)}
                handleClickRight={this.handleClickRight.bind(this)}
                handleMouseDown={this.handleMouseDown.bind(this)}
                handleMouseUp={this.handleMouseUp.bind(this)}
                handleMouseLeave={this.handleMouseLeave.bind(this)}
                deviceType={this.state.deviceType}
            ></NavigateLR>
        );
        let components: JSX.Element = (
            <div>
                <div style={rowElement}>
                    {navDisplayComponent}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginLeft: '7.5vw', marginRight: '7.5vw', marginTop: '3vw' }}>
                    {navLRComponent}
                    <div style={{ height: '10vw' }}>
                        <img style={{ width: 'auto', height: 'inherit' }} src={plaque}/>
                    </div>
                    {/* commenting out for now until I have time to implement coin functionality */}
                    {/* <Draggable nodeRef={this.nodeRef}>
                        <div ref={this.nodeRef} style={{ width: '10vw', height: '10vw', position: 'absolute', right: '7.5vw', marginTop: '1vh' }}><img style={{ width: 'inherit', height: 'auto', pointerEvents: 'none' }} src={coin} /></div>
                    </Draggable> */}
                </div>
            </div>
        );
        if (this.state.deviceType === DEVICE_TYPES.MOBILE) {
            components = (
                <div style={{height: '100%'}}>
                    <div style={rowElement}>
                        {navDisplayComponent}
                    </div>
                    <div style={rowElement}>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3vw' }}>
                            <div style={{ width: '80vw'}}>
                                <img style={{ width: 'inherit', height: 'auto' }} src={plaque}/>
                            </div>
                        </div>
                    </div>
                    <div style={rowElement}>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3vw', position: 'absolute', bottom: '25vw' }}>
                            {navLRComponent}
                        </div>
                    </div>
                </div>
            );
        }
        return components;
    }

    render() {
        const JukeBoxComponents: JSX.Element = this.getComponents();
        return (
            <div style={{...outerWrapper, overflow: 'hidden'}}>
                {JukeBoxComponents}
            </div>
        );
    }
}
