import { Box } from '@mui/material'
import React, { Component } from 'react'
import { triangleLeft, triangleRight } from './NavLR.interface';

export default class NavigateLR extends Component {
    
    clickLeft() {
        console.log(`left clicked!`)
    }

    clickRight() {
        console.log(`right clicked!`)
    }
    
    render() {
        return (
            <div>
                <Box sx={{display: 'flex'}}>
                    <div style={triangleLeft} onClick={this.clickLeft}></div>
                    <div style={triangleRight} onClick={this.clickRight}></div>
                </Box>
            </div>
        )
    }
}
