export interface PageInfo {
    key: number;
    linkPath: string;
    displayString: string;
    component: JSX.Element;
}

export interface Pages {
    home: PageInfo;
    pages: PageInfo[];
}

export interface NavDisplayProps {
    navIndex: number;
    isMouseDownOnNavBtn: boolean;
}

export interface NavDisplayState {
    navDisplayString: string;
    recordRotation: number;
    isMouseDownOnNavBtn: boolean;
}

export interface RecordRotationInputs {
    degToRotate: number;
    prevProps: NavDisplayProps;
    prevState: NavDisplayState;
    props: NavDisplayProps;
}