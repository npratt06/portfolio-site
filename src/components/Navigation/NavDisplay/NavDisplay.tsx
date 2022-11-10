import React, { Component } from 'react'
import { outerWrapper, rowElement } from '../Navigation.interface';
import { screenStyle, dotStyle, highlightedDotStyle, MyPages, navDisplayStringStyle } from './NavDisplay.const';
import { PageInfo, NavDisplayProps, NavDisplayState } from './NavDisplay.interface';
import { getCurrentPageInfo } from '../../../utils/NavUtils';

export default class NavDisplay extends Component<NavDisplayProps, NavDisplayState> {

    numDisplayStrings: number = 0;
    dots: JSX.Element[] = [];
    
    constructor(props: NavDisplayProps) {
        super(props);
        const displayString = getCurrentPageInfo(MyPages.pages, props.navIndex).displayString;
        this.state = {
            navDisplayString: displayString
        };
        this.dots = this.getDots();
    }

    getDots() {
        const dots = [];
        for (let i = 0; i < this.numDisplayStrings; i++) {
            dots.push(
                <div>
                    <div style={dotStyle}></div>
                </div>
            );
        }
        return dots;
    }

    componentDidUpdate(prevProps: Readonly<NavDisplayProps>): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState((() => {
                const navDisplayString = getCurrentPageInfo(MyPages.pages, this.props.navIndex).displayString;
                return { navDisplayString };
            }));
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
                        {MyPages.pages.map((pageInfo: PageInfo) => {
                            const pageKey = pageInfo.key;
                            let currentDotStyle = dotStyle;
                            if (pageKey === this.props.navIndex) {
                                currentDotStyle = highlightedDotStyle;
                            }
                            return <div key={pageKey}><div style={currentDotStyle}></div></div>;
                        })}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
