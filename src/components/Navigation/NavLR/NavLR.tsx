import Box from '@mui/material/Box';
import React, { Component, MouseEventHandler } from 'react'
import { Link }from 'react-router-dom';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
import { NavigateLRProps, NavigateLRState } from './NavLR.interface';
import { MyPages } from '../NavDisplay/NavDisplay.const';
import { unformatLink } from '../../../globalCSS';
import leftBtn from '../../../img/navLeftBtn.png';
import rightBtn from '../../../img/navRightBtn.png';
import selectBtn from '../../../img/selectBtn.png';
import NavBtn from './NavBtn/NavBtn';

export default class NavigateLR extends Component<NavigateLRProps, NavigateLRState> {
    handleClickLeft: MouseEventHandler<HTMLDivElement>;
    handleClickRight: MouseEventHandler<HTMLDivElement>;
    navIndex: number;

    constructor(props: NavigateLRProps) {
        super(props);
        this.navIndex = props.navIndex;
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
        }
    }

    render() {
        return (
            <div>
                <Box sx={{display: 'flex'}}>
                    <NavBtn imgSrc={leftBtn} btnText={''} handleClick={this.handleClickLeft}/>
                    <Link to={this.state.linkPath}>
                        <NavBtn imgSrc={selectBtn} btnText={'SELECT'}/>
                    </Link>
                    <NavBtn imgSrc={rightBtn} btnText={''} handleClick={this.handleClickRight}/>
                </Box>
            </div>
        )
    }
}
