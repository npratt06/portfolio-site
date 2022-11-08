import { Box, Card } from '@mui/material';
import React, { Component } from 'react'
import { NavigationProps } from '../Navigation.interface';
import { NavDisplayStrings, NavDisplayProps, screenStyle } from './NavDisplay.interface';

export default class NavDisplay extends Component<NavigationProps, NavDisplayProps> {

    constructor(props: NavigationProps) {
        super(props);
        const displayString = NavDisplayStrings[props.navIndex];
        this.state = {
            navDisplayString: displayString
        };
    }

    componentDidUpdate(prevProps: Readonly<NavigationProps>): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState((() => {
                const navDisplayString = NavDisplayStrings[this.props.navIndex];
                return { navDisplayString };
            }));
        }
    }

    render() {
        return (
            <div>
                <Card sx={screenStyle}>
                    <Box sx={{ fontFamily: 'Marker Felt, fantasy', fontSize: '5vw'} }>
                        {this.state.navDisplayString}
                    </Box>
                </Card>
            </div>
        )
    }
}
