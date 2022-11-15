export const outerWrapper: React.CSSProperties = {
    position: 'relative'
};

export const rowElement: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NavigationProps {
    // add as needed
}

export interface NavigationState {
    navIndex: number;
    isMouseDownOnNavBtn: boolean;
}
