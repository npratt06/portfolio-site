import React, { Component } from 'react';
import { outerWrapper, rowElement } from '../JukeBox.interface';
import {
    screenStyle,
    dotStyle,
    highlightedDotStyle,
    MyPages,
    navDisplayStringStyle,
    screenImgStyle,
    recordImgStyle,
    recordImgWrapperStyle,
} from './NavDisplay.const';
import {
    PageInfo,
    NavDisplayProps,
    NavDisplayState,
    RecordRotationInputs,
    NavDisplayStringStyleDynamic,
} from './NavDisplay.interface';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
import screenImg from '../../../img/screen.png';
import recordImg from '../../../img/record_real.png';

export default class NavDisplay extends Component<
    NavDisplayProps,
    NavDisplayState
> {

    numDisplayStrings = 0;
    dots: JSX.Element[] = [];
    currentRecordImgStyle: React.CSSProperties = recordImgStyle;
    navDisplayStringStyleDynamic: NavDisplayStringStyleDynamic = { opacity: 100, transition: '' };

    constructor(props: NavDisplayProps) {
        super(props);
        const displayString = getCurrentPageInfo(
            MyPages.pages,
            props.navIndex
        ).displayString;
        const degToRotate = 360 / MyPages.pages.length;
        const recordRotation = props.navIndex * degToRotate;
        this.state = {
            navDisplayString: displayString,
            recordRotation,
            isMouseDownOnNavBtn: props.isMouseDownOnNavBtn
        };
        this.dots = this.getDots();
        this.setNavDisplayStringStyleDynamicValues(props.isMouseDownOnNavBtn);
    }

    componentDidUpdate(prevProps: Readonly<NavDisplayProps>, prevState: NavDisplayState): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.isMouseDownOnNavBtn !== this.props.isMouseDownOnNavBtn) {
            this.setState(() => {
                return { navDisplayString: this.state.navDisplayString, recordRotation: this.state.recordRotation, isMouseDownOnNavBtn: this.props.isMouseDownOnNavBtn };
            });
        }
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState(() => {
                // nav display string
                const navDisplayString = getCurrentPageInfo(
                    MyPages.pages,
                    this.props.navIndex
                ).displayString;
                // record rotation
                const degToRotate = 360 / MyPages.pages.length;
                const recordRotationInputs: RecordRotationInputs = { degToRotate, prevProps, prevState, props: this.props }
                const recordRotation = this.determineRecordRotation(recordRotationInputs);
                return { navDisplayString, recordRotation, isMouseDownOnNavBtn: this.props.isMouseDownOnNavBtn };
            });
            this.dots = this.getDots();
        }
    }

    getDots(): JSX.Element[] {
        const dots: JSX.Element[] = [];
        MyPages.pages.forEach((pageInfo: PageInfo) => {
            const pageKey = pageInfo.key;
            let currentDotStyle = dotStyle;
            if (pageKey === this.props.navIndex) {
                currentDotStyle = highlightedDotStyle;
            }
            dots.push(
                <div key={pageKey}>
                    <div style={currentDotStyle}></div>
                </div>
            );
        });
        return dots;
    }

    determineRecordRotation(recordRotationInputs: RecordRotationInputs): number {
        let recordRotation = 0;
        const loopedToBeginning = (recordRotationInputs.props.navIndex === 0 && recordRotationInputs.prevProps.navIndex === MyPages.pages.length - 1);
        const loopedToEnd = ((recordRotationInputs.props.navIndex === MyPages.pages.length - 1 && recordRotationInputs.prevProps.navIndex === 0));
        if (loopedToBeginning) {
            recordRotation = recordRotationInputs.prevState.recordRotation + recordRotationInputs.degToRotate;
        } else if (loopedToEnd) {
            recordRotation = recordRotationInputs.prevState.recordRotation - recordRotationInputs.degToRotate;
        } else if (recordRotationInputs.prevProps.navIndex < recordRotationInputs.props.navIndex) {
            recordRotation = recordRotationInputs.prevState.recordRotation + recordRotationInputs.degToRotate;

        } else {
            recordRotation = recordRotationInputs.prevState.recordRotation - recordRotationInputs.degToRotate;
        }
        return recordRotation;
    }

    setNavDisplayStringStyleDynamicValues(isMouseDownOnNavBtn: boolean) {
        this.navDisplayStringStyleDynamic = {
            opacity: isMouseDownOnNavBtn ? 0 :  100,
            transition: isMouseDownOnNavBtn ? '' : 'opacity 0.6s ease-in-out'
        }
    }

    render() {
        this.setNavDisplayStringStyleDynamicValues(this.state.isMouseDownOnNavBtn);
        const navDisplayStringStyleRendered = {...navDisplayStringStyle, transition: `${this.navDisplayStringStyleDynamic.transition}`, opacity: `${this.navDisplayStringStyleDynamic.opacity}`} as React.CSSProperties;
        return (
            <div style={screenStyle}>
                <img src={screenImg} alt='screenImg' style={screenImgStyle} />
                <div style={outerWrapper}>
                    <div style={rowElement}>
                        <div style={navDisplayStringStyleRendered}>
                            {this.state.navDisplayString}
                        </div>
                    </div>
                    <div style={rowElement}>
                        {this.dots}
                    </div>
                    <div style={rowElement}>
                        <div style={recordImgWrapperStyle}>
                            <img src={recordImg} alt='recordImg' style={{...this.currentRecordImgStyle, rotate: `${this.state.recordRotation}deg`}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

