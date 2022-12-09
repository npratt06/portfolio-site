import React, { Component } from 'react';
import {
    btnImgBaseStyle,
    btnImgStyleClicked,
    btnTextTransformBaseStyle,
    btnTextTransformClickedStyle,
    NAV_BTN_STYLE_SETS,
} from './NavBtn.const';
import { NavBtnProps, NavBtnState } from '../NavLR.interface';
import { MouseEventHandler } from 'react';
import { getStyleSet, StyleSet } from '../../../componentHelpers';

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
        
        this.styleSet = getStyleSet(props.deviceType, NAV_BTN_STYLE_SETS);
    }

    componentDidUpdate(prevProps: Readonly<NavBtnProps>): void {
        if (prevProps.deviceType !== this.props.deviceType) {
            this.setState(() => {
                return { deviceType: this.props.deviceType };
            });
            this.styleSet = getStyleSet(this.props.deviceType, NAV_BTN_STYLE_SETS);
        }
    }

    handleMouseEnter() {
        this.setState(() => {
            const btnImgStyle = btnImgBaseStyle;
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
            const btnImgStyle = btnImgBaseStyle;
            const btnTextTransformStyle = btnTextTransformBaseStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    render() {
        return (
            <div
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onTouchStart={this.handleMouseDown.bind(this)}
                onTouchEnd={this.handleMouseUp.bind(this)}
            >
                <div style={this.styleSet.btnStyle} onClick={this.handleClick}>
                    <img
                        src={this.imgSrc}
                        alt={'NavBtn'}
                        style={this.state.btnImgStyle}
                        draggable={'false'}
                    ></img>
                    <div style={this.styleSet.selectBtnTextStyle}>
                        <div style={this.state.btnTextTransformStyle}>
                            {this.btnText}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
