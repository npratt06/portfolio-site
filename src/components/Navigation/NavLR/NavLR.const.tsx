import { textFontStyle } from "../../../globalCSS";

// csss styles --- start
export const selectBtnStyle: React.CSSProperties = {
    backgroundColor: '#ff0000',
    width: '10vw',
    height: '7vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};


export const selectBtnTextStyle: React.CSSProperties = {
    ...textFontStyle,
    fontSize: '3vw'
};


export const lrStyle: React.CSSProperties = {
    width: '10vw',
    height: '7vw',
    backgroundColor: '#000000',
    marginLeft: '20px',
    marginRight: '20px'
};
// csss styles --- end