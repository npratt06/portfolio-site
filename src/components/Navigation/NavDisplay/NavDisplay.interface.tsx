export interface PageInfo {
    key: number,
    linkPath: string,
    displayString: string,
    component: JSX.Element
};

export interface Pages {
    home: PageInfo,
    pages: PageInfo[]
};

export interface NavDisplayProps {
    navIndex: number
};

export interface NavDisplayState {
    navDisplayString: string
}