import { Box } from '@mui/material'
import React, { Component } from 'react'
import { triangleLeftStyle, triangleRightStyle, NavigateLRProps } from './NavLR.interface';
import { NavigationProps } from './../Navigation.interface';

export default class NavigateLR extends Component<NavigateLRProps, NavigateLRProps> {
    handleClickLeft: any;
    handleClickRight: any;

    constructor(props: NavigateLRProps) {
        super(props);
        
        this.handleClickLeft = props.handleClickLeft;
        this.handleClickRight =props.handleClickRight;
    }
    
    render() {
        return (
            <div>
                <Box sx={{display: 'flex'}}>
                    <div style={triangleLeftStyle} onClick={this.handleClickLeft}></div>
                    <div style={triangleRightStyle} onClick={this.handleClickRight}></div>
                </Box>
            </div>
        )
    }
}
