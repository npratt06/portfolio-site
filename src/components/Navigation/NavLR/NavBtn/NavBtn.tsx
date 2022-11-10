import React, { Component } from 'react';
import {
    btnImgBaseStyle,
    btnImgStyleClicked,
    btnImgStyleHover,
    btnStyle,
    btnTextTransformBaseStyle,
    btnTextTransformClickedStyle,
} from './NavBtn.const';
import { NavBtnProps, NavBtnState } from '../NavLR.interface';
import { MouseEventHandler } from 'react';
import { selectBtnTextStyle } from '../NavBtn/NavBtn.const';

export default class NavBtn extends Component<NavBtnProps, NavBtnState> {
    imgSrc: string;
    btnText: string;
    handleClick: MouseEventHandler<HTMLDivElement> | undefined;

    constructor(props: NavBtnProps) {
        super(props);
        this.imgSrc = props.imgSrc;
        this.btnText = props.btnText || '';
        this.handleClick = props.handleClick;
        this.state = {
            btnImgStyle: btnImgBaseStyle,
            btnTextTransformStyle: btnTextTransformBaseStyle,
        };
    }

    handleMouseEnter() {
        this.setState(() => {
            const btnImgStyle = btnImgStyleHover;
            const btnTextTransformStyle = btnTextTransformBaseStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    handleMouseLeave() {
        this.setState(() => {
            const btnImgStyle = btnImgBaseStyle;
            const btnTextTransformStyle = btnTextTransformBaseStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    handleMouseDown() {
        this.setState(() => {
            const btnImgStyle = btnImgStyleClicked;
            const btnTextTransformStyle = btnTextTransformClickedStyle;
            return { btnImgStyle, btnTextTransformStyle };
        });
    }

    handleMouseUp() {
        this.setState(() => {
            const btnImgStyle = btnImgStyleHover;
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
            >
                <div style={btnStyle} onClick={this.handleClick}>
                    <img
                        src={this.imgSrc}
                        alt={'NavBtn'}
                        style={this.state.btnImgStyle}
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
