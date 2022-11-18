import { MouseEventHandler } from 'react';

export interface NavigateLRProps {
    navIndex: number;
    handleClickLeft: MouseEventHandler<HTMLDivElement>;
    handleClickRight: MouseEventHandler<HTMLDivElement>;
    handleMouseDown: ()=> void;
    handleMouseUp: ()=> void;
    handleMouseLeave: ()=> void;
    deviceType: string;
}

export interface NavigateLRState {
    linkPath: string;
    deviceType: string;
}

export interface NavBtnProps {
    imgSrc: string;
    btnText?: string;
    handleClick?: MouseEventHandler<HTMLDivElement>;
    handleMouseDown?: ()=> void;
    handleMouseUp?: ()=> void;
    handleMouseLeave?: ()=> void;
    deviceType: string;
}

export interface NavBtnState {
    btnImgStyle: React.CSSProperties;
    btnTextTransformStyle: React.CSSProperties;
    deviceType: string;
}
