import React, { Component } from 'react';
import {
    btnImgBaseStyle,
    btnImgStyleClicked,
    btnImgStyleHover,
    btnTextTransformBaseStyle,
    btnTextTransformClickedStyle,
    NAV_BTN_STYLE_SETS,
} from './NavBtn.const';
import { NavBtnProps, NavBtnState } from '../NavLR.interface';
import { MouseEventHandler } from 'react';
import { selectBtnTextStyle } from '../NavBtn/NavBtn.const';
import { DEVICE_TYPES } from '../../../../global.const';
import { StyleSet } from '../../NavDisplay/NavDisplay.interface';

export default class NavBtn extends Component<NavBtnProps, NavBtnState> {
    imgSrc: string;
    btnText: string;
    handleClick: MouseEventHandler<HTMLDivElement> | undefined;
    handleMouseDownProp: (()=> void) | undefined;
    handleMouseUpProp: (()=> void) | undefined;
    handleMouseLeaveProp: (()=> void) | undefined;
    styleSet: StyleSet;

    constructor(props: NavBtnProps) {
        super(props);
        this.imgSrc = props.imgSrc;
        this.btnText = props.btnText || '';
        this.handleClick = props.handleClick;
        this.handleMouseDownProp = props.handleMouseDown;
        this.handleMouseUpProp = props.handleMouseUp;
        this.handleMouseLeaveProp = props.handleMouseLeave;

        this.state = {
            btnImgStyle: btnImgBaseStyle,
            btnTextTransformStyle: btnTextTransformBaseStyle,
            deviceType: props.deviceType
        };
        
        this.styleSet = this.getStyleSet(props.deviceType);
    }

    componentDidUpdate(prevProps: Readonly<NavBtnProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
            this.styleSet = this.getStyleSet(this.props.deviceType);
        }
    }

    handleMouseEnter() {
        this.setState(() => {
            const btnImgStyle = btnImgStyleHover;
            const btnTextTransformStyle = btnTextTransformBaseStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    handleMouseLeave() {
        if (this.handleMouseLeaveProp) {
            this.handleMouseLeaveProp();
        }
        this.setState(() => {
            const btnImgStyle = btnImgBaseStyle;
            const btnTextTransformStyle = btnTextTransformBaseStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    handleMouseDown() {
        if (this.handleMouseDownProp) {
            this.handleMouseDownProp();
        }
        this.setState(() => {
            const btnImgStyle = btnImgStyleClicked;
            const btnTextTransformStyle = btnTextTransformClickedStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    handleMouseUp() {
        if (this.handleMouseUpProp) {
            this.handleMouseUpProp();
        }
        this.setState(() => {
            const btnImgStyle = btnImgStyleHover;
            const btnTextTransformStyle = btnTextTransformBaseStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    
    getStyleSet(deviceType: string) {
        let currentStyleSet = NAV_BTN_STYLE_SETS.Desktop;
        if (deviceType !== DEVICE_TYPES.DESKTOP) {
            currentStyleSet = NAV_BTN_STYLE_SETS.Mobile;
        }
        switch (deviceType) {
            case DEVICE_TYPES.DESKTOP:
                currentStyleSet = NAV_BTN_STYLE_SETS[DEVICE_TYPES.DESKTOP];
                break;
            case DEVICE_TYPES.MOBILE:
                currentStyleSet = NAV_BTN_STYLE_SETS[DEVICE_TYPES.MOBILE];
                break;
            default:
                currentStyleSet = NAV_BTN_STYLE_SETS[DEVICE_TYPES.DESKTOP];
                break;
        }
        return currentStyleSet;
    }

    render() {
        return (
            <div
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
            >
                <div style={this.styleSet.btnStyle} onClick={this.handleClick}>
                    <img
                        src={this.imgSrc}
                        alt={'NavBtn'}
                        style={this.state.btnImgStyle}
                        draggable={'false'}
                    ></img>
                    <div style={selectBtnTextStyle}>
                        <div style={this.state.btnTextTransformStyle}>
                            {this.btnText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
