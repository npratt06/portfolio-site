import React, { Component, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentPageInfo } from '../../../utils/NavUtils';
import { NavigateLRProps, NavigateLRState } from './NavLR.interface';
import { MyPages } from '../NavDisplay/NavDisplay.const';
import leftBtn from '../../../img/navLeftBtn_grey.png';
import rightBtn from '../../../img/navRightBtn_grey.png';
import selectBtn from '../../../img/selectBtn_grey.png';
import NavBtn from './NavBtn/NavBtn';

export default class NavigateLR extends Component<
    NavigateLRProps,
    NavigateLRState
> {
    handleClickLeft: MouseEventHandler<HTMLDivElement>;
    handleClickRight: MouseEventHandler<HTMLDivElement>;
    handleMouseDown: (()=> void) | undefined;
    handleMouseUp: (()=> void) | undefined;
    handleMouseLeave: (()=> void) | undefined;
    navIndex: number;

    constructor(props: NavigateLRProps) {
        super(props);
        this.navIndex = props.navIndex;
        this.handleClickLeft = props.handleClickLeft;
        this.handleClickRight = props.handleClickRight;
        this.handleMouseDown = props.handleMouseDown;
        this.handleMouseUp = props.handleMouseUp;
        this.handleMouseLeave = props.handleMouseLeave;
        const page = getCurrentPageInfo(MyPages.pages, this.navIndex);
        this.state = {
            linkPath: page.linkPath,
            deviceType: props.deviceType
        };
    }

    componentDidUpdate(prevProps: Readonly<NavigateLRProps>): void {
        if (prevProps.navIndex !== this.props.navIndex) {
            this.setState(() => {
                const linkPath = getCurrentPageInfo(
                    MyPages.pages,
                    this.props.navIndex
                ).linkPath;
                return { linkPath };
            });
        }
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
        }
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <NavBtn
                    imgSrc={leftBtn}
                    btnText={''}
                    handleClick={this.handleClickLeft}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseUp={this.handleMouseUp}
                    handleMouseLeave={this.handleMouseLeave}
                    deviceType={this.state.deviceType}
                />
                <Link to={this.state.linkPath}>
                    <NavBtn imgSrc={selectBtn} btnText={'SELECT'} deviceType={this.state.deviceType} />
                </Link>
                <NavBtn
                    imgSrc={rightBtn}
                    btnText={''}
                    handleClick={this.handleClickRight}
                    handleMouseDown={this.handleMouseDown}
                    handleMouseUp={this.handleMouseUp}
                    handleMouseLeave={this.handleMouseLeave}
                    deviceType={this.state.deviceType}
                />
            </div>
        );
    }
}
