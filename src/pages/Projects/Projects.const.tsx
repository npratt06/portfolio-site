import { backgroundColorStyle, textFontStyle } from "../../globalCSS";

export const projectsStyle: React.CSSProperties = {
    ...backgroundColorStyle,
    ...textFontStyle,
    height: '100vh'
};

export const projectsRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
};

export const hrStyle: React.CSSProperties = {
    width: '55vw',
    margin: '3vh'
};