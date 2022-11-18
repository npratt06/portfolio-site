import React, { Component } from 'react';
import { outerWrapper, rowElement } from '../JukeBox.interface';
import { NAV_DISPLAY_STYLE_SETS, MyPages } from './NavDisplay.const';
import {
    PageInfo,
    NavDisplayProps,
    NavDisplayState,
    RecordRotationInputs,
    NavDisplayStringStyleDynamic,
    StyleSet,
} from './NavDisplay.interface';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
import screenImg from '../../../img/screen.png';
import recordImg from '../../../img/record_real.png';
import { DEVICE_TYPES } from '../../../global.const';

export default class NavDisplay extends Component<
    NavDisplayProps,
    NavDisplayState
> {

    numDisplayStrings = 0;
    dots: JSX.Element[] = [];
    navDisplayStringStyleDynamic: NavDisplayStringStyleDynamic = { opacity: 100, transition: '' };
    styleSet: StyleSet;

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
            isMouseDownOnNavBtn: props.isMouseDownOnNavBtn,
            deviceType: props.deviceType
        };
        this.setNavDisplayStringStyleDynamicValues(props.isMouseDownOnNavBtn);
        this.styleSet = this.getStyleSet(props.deviceType);
        this.dots = this.getDots();
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
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { navDisplayString: this.state.navDisplayString, recordRotation: this.state.recordRotation, isMouseDownOnNavBtn: this.state.isMouseDownOnNavBtn, deviceType: this.props.deviceType };
            });
            this.styleSet = this.getStyleSet(this.props.deviceType);
        }
    }

    getDots(): JSX.Element[] {
        const dots: JSX.Element[] = [];
        MyPages.pages.forEach((pageInfo: PageInfo) => {
            const pageKey = pageInfo.key;
            let currentDotStyle = this.styleSet.dotStyle;
            if (pageKey === this.props.navIndex) {
                currentDotStyle = this.styleSet.highlightedDotStyle;
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

    getStyleSet(deviceType: string) {
        let currentStyleSet = NAV_DISPLAY_STYLE_SETS.Desktop;
        if (deviceType !== DEVICE_TYPES.DESKTOP) {
            currentStyleSet = NAV_DISPLAY_STYLE_SETS.Mobile;
        }
        switch (deviceType) {
            case DEVICE_TYPES.DESKTOP:
                currentStyleSet = NAV_DISPLAY_STYLE_SETS[DEVICE_TYPES.DESKTOP];
                break;
            case DEVICE_TYPES.MOBILE:
                currentStyleSet = NAV_DISPLAY_STYLE_SETS[DEVICE_TYPES.MOBILE];
                break;
            default:
                currentStyleSet = NAV_DISPLAY_STYLE_SETS[DEVICE_TYPES.DESKTOP];
                break;
        }
        return currentStyleSet;
    }
    
    render() {
        this.setNavDisplayStringStyleDynamicValues(this.state.isMouseDownOnNavBtn);
        const navDisplayStringStyleRendered = {...this.styleSet.navDisplayStringStyle, transition: `${this.navDisplayStringStyleDynamic.transition}`, opacity: `${this.navDisplayStringStyleDynamic.opacity}`} as React.CSSProperties;
        return (
            <div style={this.styleSet.screenStyle}>
                <img src={screenImg} alt='screenImg' style={this.styleSet.screenImgStyle} />
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
                        <div style={this.styleSet.recordImgWrapperStyle}>
                            <img src={recordImg} alt='recordImg' style={{...this.styleSet.recordImgStyle, rotate: `${this.state.recordRotation}deg`}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

