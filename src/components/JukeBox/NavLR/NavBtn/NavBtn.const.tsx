import { DEVICE_TYPES } from '../../../../global.const';
import { textFontStyle } from '../../../../globalCSS';
import { StyleSets } from '../../../componentHelpers';

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
    fontSize: '3vw',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
// select button styles --- end

// button text styles for dynamic transforms --- start
export const btnTextTransformBaseStyle: React.CSSProperties = {
    color: 'black'
};

export const btnTextTransformClickedStyle: React.CSSProperties = {
    transform: 'translate(5px, 5px)',
};
// button text styles for dynamic transforms --- end

export const NAV_BTN_STYLE_SETS: StyleSets = {
    [DEVICE_TYPES.DESKTOP]: {
        btnStyle: {
            height: '10vw',
            marginLeft: '20px',
            marginRight: '20px',
            position: 'relative',
        }
    },
    [DEVICE_TYPES.MOBILE]: {
        btnStyle: {
            height: '20vw',
            marginLeft: '20px',
            marginRight: '20px',
            position: 'relative',
        }
    }
}