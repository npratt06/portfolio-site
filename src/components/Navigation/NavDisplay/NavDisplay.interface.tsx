export const NavDisplayStrings: string[] = [
    `Resume`,
    `About Me`,
    `Projects`
];

export const screenStyle: React.CSSProperties = {
    backgroundColor: '#afaa98',
    width: '75vw',
    height: '25vw',
    margin: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export interface NavDisplayProps {
    navDisplayString: string
};