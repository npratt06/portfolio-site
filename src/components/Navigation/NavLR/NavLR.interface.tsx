import { MouseEventHandler } from "react";

export interface NavigateLRProps {
    navIndex: number,
    handleClickLeft: MouseEventHandler<HTMLDivElement>,
    handleClickRight: MouseEventHandler<HTMLDivElement>
};

export interface NavigateLRState {
    linkPath: string
};

export interface NavBtnProps {
    imgSrc: string,
    btnText?: string,
    handleClick?: MouseEventHandler<HTMLDivElement>
};

export interface NavBtnState {
    btnImgStyle: React.CSSProperties,
    btnTextTransformStyle: React.CSSProperties
};