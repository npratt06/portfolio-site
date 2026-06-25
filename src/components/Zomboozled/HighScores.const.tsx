import { backgroundColorStyle, textFontStyle } from '../../globalCSS';

export const highScoresStyle: React.CSSProperties = {
  display: 'flex',
  ...backgroundColorStyle,
  overflow: 'hidden',
  ...textFontStyle,
  height: '100vh'
};

export const tableStyle: React.CSSProperties = { border: 'none', tableLayout: 'fixed', width: '25vw', fontSize: '1vw'};
export const headerAndRowStyle: React.CSSProperties = { border: '1px solid white', width: '12.5vw', overflow: 'hidden', padding: '0.25vw'};
export const rowStyle: React.CSSProperties = { textAlign: 'center' };
