import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import React, { Component, MouseEventHandler } from 'react'
import { NavigateLRProps, NavigateLRState } from './NavLR.interface';
import { triangleLeftStyle, triangleRightStyle } from './NavLR.const';
import { Link }from 'react-router-dom';
import { MyPages } from '../NavDisplay/NavDisplay.const';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
export default class NavigateLR extends Component<NavigateLRProps, NavigateLRState> {
    handleClickLeft: MouseEventHandler<HTMLDivElement>;
    handleClickRight: MouseEventHandler<HTMLDivElement>;
    navIndex: number;
    linkPath: string;

    constructor(props: NavigateLRProps) {
        super(props);
        this.navIndex = props.navIndex;
        this.linkPath = '/';
        this.handleClickLeft = props.handleClickLeft;
        this.handleClickRight =props.handleClickRight;
        const page = getCurrentPageInfo(MyPages.pages, this.navIndex);
        this.state = {
            linkPath: page.linkPath
        };
    }

    componentDidUpdate(prevProps: Readonly<NavigateLRProps>): void {
        // if navIndex has changed, update navDisplayString
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState((() => {
                const linkPath = getCurrentPageInfo(MyPages.pages, this.props.navIndex).linkPath;
                console.log(linkPath);
                return { linkPath };
            }));
            this.linkPath = getCurrentPageInfo(MyPages.pages, this.props.navIndex).linkPath;
            console.log(this.linkPath);
        }
    }

    render() {
        return (
            <div>
                <Box sx={{display: 'flex'}}>
                    <div style={triangleLeftStyle} onClick={this.handleClickLeft}></div>
                    <Link to={this.state.linkPath}><Card>SELECT</Card></Link>
                    <div style={triangleRightStyle} onClick={this.handleClickRight}></div>
                </Box>
            </div>
        )
    }
}
