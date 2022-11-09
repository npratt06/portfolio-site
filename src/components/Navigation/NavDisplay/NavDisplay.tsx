import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import React, { Component } from 'react'
import { NavigationProps, outerWrapper, rowElement } from '../Navigation.interface';
import { NavDisplayProps, screenStyle, dotStyle, highlightedDotStyle, PageInfo, MyPages } from './NavDisplay.interface';
import { getCurrentPageInfo } from '../../../utils/DisplayUtils';

export default class NavDisplay extends Component<NavigationProps, NavDisplayProps> {

    numDisplayStrings: number = 0;
    dots: any;
    
    constructor(props: NavigationProps) {
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
                <Box>
                    <div style={dotStyle}></div>
                </Box>
            );
        }
        return dots;
    }

    componentDidUpdate(prevProps: Readonly<NavigationProps>): void {
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
                <Card sx={screenStyle}>
                <Box sx={outerWrapper}>
                    <Box sx={rowElement}>
                        <Box sx={{ fontFamily: 'Marker Felt, fantasy', fontSize: '5vw'} }>
                            {this.state.navDisplayString}
                        </Box>
                    </Box>
                    <Box sx={rowElement}>
                        {MyPages.pages.map((pageInfo: PageInfo) => {
                            const pageKey = pageInfo.key;
                            let currentDotStyle = dotStyle;
                            if (pageKey === this.props.navIndex) {
                                currentDotStyle = highlightedDotStyle;
                            }
                            return <Box key={pageKey}><div style={currentDotStyle}></div></Box>;
                        })}
                    </Box>
                </Box>
                </Card>
            </div>
        )
    }
}
