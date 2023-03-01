import { backgroundColorStyle, textFontStyle } from "../../globalCSS";

export const highScoresStyle: React.CSSProperties = {
    display: 'flex',
    ...backgroundColorStyle,
    overflow: 'hidden',
    ...textFontStyle,
    height: '100vh'
};

export const DEFAULT_HIGH_SCORE_NAME = '?????';