import React, { Component } from 'react';
import { outerWrapper, rowElement } from '../Navigation.interface';
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
} from './NavDisplay.interface';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
import screenImg from '../../../img/screen.png';
import recordImg from '../../../img/record_test.png';

export default class NavDisplay extends Component<
    NavDisplayProps,
    NavDisplayState
> {

    numDisplayStrings = 0;
    dots: JSX.Element[] = [];
    currentRecordImgStyle: React.CSSProperties = recordImgStyle;

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
            recordRotation
        };
        this.dots = this.getDots();
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

    componentDidUpdate(prevProps: Readonly<NavDisplayProps>, prevState: NavDisplayState): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState(() => {
                // nav display string
                const navDisplayString = getCurrentPageInfo(
                    MyPages.pages,
                    this.props.navIndex
                ).displayString;
                // record rotation
                const degToRotate = 360 / MyPages.pages.length;
                let recordRotation = 0;
                const loopedToBeginning = (this.props.navIndex === 0 && prevProps.navIndex === MyPages.pages.length - 1);
                const loopedToEnd = ((this.props.navIndex === MyPages.pages.length - 1 && prevProps.navIndex === 0));
                if (loopedToBeginning) {
                    recordRotation = prevState.recordRotation + degToRotate;
                } else if (loopedToEnd) {
                    recordRotation = prevState.recordRotation - degToRotate;
                } else if (prevProps.navIndex < this.props.navIndex) {
                    recordRotation = prevState.recordRotation + degToRotate;

                } else {
                    recordRotation = prevState.recordRotation - degToRotate;
                }
                return { navDisplayString, recordRotation };
            });
            this.dots = this.getDots();
        }
    }

    determineRecordRotation() {
        return 0;
    }

    render() {
        return (
            <div style={screenStyle}>
                <img src={screenImg} alt='screenImg' style={screenImgStyle} />
                <div style={outerWrapper}>
                    <div style={rowElement}>
                        <div style={navDisplayStringStyle}>
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
