import { textFontStyle } from '../../../../globalCSS';

const btnHeight = '10vw';

export const btnStyle: React.CSSProperties = {
    height: btnHeight,
    marginLeft: '20px',
    marginRight: '20px',
    position: 'relative',
};

// button image styles for dynamic transforms --- start
export const btnImgBaseStyle: React.CSSProperties = {
    width: 'auto',
    height: 'inherit',
    cursor: 'auto',
    filter: 'drop-shadow(5px 5px 5px #000000)',
};

export const btnImgStyleHover: React.CSSProperties = {
    ...btnImgBaseStyle,
    filter: 'brightness(250%) drop-shadow(5px 5px 5px #000000',
    cursor: 'pointer',
};

export const btnImgStyleClicked: React.CSSProperties = {
    ...btnImgBaseStyle,
    filter: 'brightness(250%)',
    cursor: 'pointer',
    scale: '0.98',
    transform: 'translate(5px, 5px)',
};
// button image styles for dynamic transforms --- end

// select button styles --- start
export const selectBtnTextStyle: React.CSSProperties = {
    ...textFontStyle,
    color: '#000000',
    fontSize: '3vw',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
// select button styles --- end

// button text styles for dynamic transforms --- start
export const btnTextTransformBaseStyle: React.CSSProperties = {};

export const btnTextTransformClickedStyle: React.CSSProperties = {
    transform: 'translate(5px, 5px)',
};
// button text styles for dynamic transforms --- end
