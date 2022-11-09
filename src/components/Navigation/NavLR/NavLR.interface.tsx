import { MouseEventHandler } from "react"

export interface NavigateLRProps {
    navIndex: number,
    handleClickLeft: MouseEventHandler<HTMLDivElement>,
    handleClickRight: MouseEventHandler<HTMLDivElement>
};

export interface NavigateLRState {
    linkPath: string
};