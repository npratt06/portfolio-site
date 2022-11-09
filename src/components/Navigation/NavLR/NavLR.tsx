import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import React, { Component, MouseEventHandler } from 'react'
import { Link }from 'react-router-dom';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
import { selectBtnStyle, selectBtnTextStyle, lrStyle } from './NavLR.const';
import { NavigateLRProps, NavigateLRState } from './NavLR.interface';
import { MyPages } from '../NavDisplay/NavDisplay.const';

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
                return { linkPath };
            }));
            this.linkPath = getCurrentPageInfo(MyPages.pages, this.props.navIndex).linkPath;
        }
    }

    render() {
        return (
            <div>
                <Box sx={{display: 'flex'}}>
                    <Box sx={lrStyle} onClick={this.handleClickLeft}></Box>
                    <Link to={this.state.linkPath}>
                        <Card sx={selectBtnStyle}>
                            <Box sx={selectBtnTextStyle}>
                                SELECT
                            </Box>
                        </Card>
                    </Link>
                    <Box sx={lrStyle} onClick={this.handleClickRight}></Box>
                </Box>
            </div>
        )
    }
}
