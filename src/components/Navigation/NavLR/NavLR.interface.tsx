import { MouseEventHandler } from 'react';

export interface NavigateLRProps {
    navIndex: number;
    handleClickLeft: MouseEventHandler<HTMLDivElement>;
    handleClickRight: MouseEventHandler<HTMLDivElement>;
    handleMouseDown: ()=> void;
    handleMouseUp: ()=> void;
    handleMouseLeave: ()=> void;
}

export interface NavigateLRState {
    linkPath: string;
}

export interface NavBtnProps {
    imgSrc: string;
    btnText?: string;
    handleClick?: MouseEventHandler<HTMLDivElement>;
    handleMouseDown?: ()=> void;
    handleMouseUp?: ()=> void;
    handleMouseLeave?: ()=> void;
}

export interface NavBtnState {
    btnImgStyle: React.CSSProperties;
    btnTextTransformStyle: React.CSSProperties;
}
