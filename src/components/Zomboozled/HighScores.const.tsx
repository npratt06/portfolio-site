import { backgroundColorStyle, textFontStyle } from "../../globalCSS";

export const highScoresStyle: React.CSSProperties = {
    ...backgroundColorStyle,
    overflow: 'auto',
    ...textFontStyle,
    minHeight: '100vh'
};