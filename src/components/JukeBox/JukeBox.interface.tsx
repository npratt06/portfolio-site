export const outerWrapper: React.CSSProperties = {
    position: 'relative'
};

export const rowElement: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JukeBoxProps {
    // add as needed
}

export interface JukeBoxState {
    navIndex: number;
    isMouseDownOnNavBtn: boolean;
}
