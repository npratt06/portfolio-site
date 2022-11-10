import React, { Component } from 'react';
import { outerWrapper, rowElement } from '../Navigation.interface';
import {
    screenStyle,
    dotStyle,
    highlightedDotStyle,
    MyPages,
    navDisplayStringStyle,
} from './NavDisplay.const';
import {
    PageInfo,
    NavDisplayProps,
    NavDisplayState,
} from './NavDisplay.interface';
import { getCurrentPageInfo } from '../../../utils/NavUtils';

export default class NavDisplay extends Component<
    NavDisplayProps,
    NavDisplayState
> {

    numDisplayStrings = 0;
    dots: JSX.Element[] = [];

    constructor(props: NavDisplayProps) {
        super(props);
        const displayString = getCurrentPageInfo(
            MyPages.pages,
            props.navIndex
        ).displayString;
        this.state = {
            navDisplayString: displayString
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

    componentDidUpdate(prevProps: Readonly<NavDisplayProps>): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState(() => {
                const navDisplayString = getCurrentPageInfo(
                    MyPages.pages,
                    this.props.navIndex
                ).displayString;
                return { navDisplayString };
            });
            this.dots = this.getDots();
        }
    }

    render() {
        return (
            <div>
                <div style={screenStyle}>
                    <div style={outerWrapper}>
                        <div style={rowElement}>
                            <div style={navDisplayStringStyle}>
                                {this.state.navDisplayString}
                            </div>
                        </div>
                        <div style={rowElement}>
                            {this.dots}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
