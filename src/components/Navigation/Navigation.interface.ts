export const outerWrapper: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#gggggg'
};

export const rowElement: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
};

export interface NavigationProps {
    // add as needed
}

export interface NavigationState {
    navIndex: number;
}