import { StyleSets } from '../../components/componentHelpers';
import { DEVICE_TYPES } from '../../global.const';
import { backgroundColorStyle, textFontStyle } from '../../globalCSS';

export const aboutStyle: React.CSSProperties = {
  ...backgroundColorStyle,
  overflow: 'auto',
  ...textFontStyle,
  minHeight: '100vh'
};

export const aboutRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  alignItems: 'center'
};

export const aboutImgStyle: React.CSSProperties = {
  width: 'inherit',
  height: 'auto'
};

export const ABOUT_STYLE_SETS: StyleSets = {
  [DEVICE_TYPES.DESKTOP]: {
    aboutTitleStyle: {
      display: 'flex',
      justifyContent: 'center',
      width: '30vw',
      textAlign: 'center'
    },
    aboutRowContentStyle: {
      display: 'flex',
      justifyContent: 'center',
      width: '25vw',
      textAlign: 'center'
    },
    hrStyle: {
      width: '55vw',
      margin: '3vh'
    },
    aboutImgWrapperStyle: {
      width: '20vw'
    },
    aboutTxtWrapperStyle: {
      fontSize: '1.5vw',
      padding: '1vw'
    }
  },
  [DEVICE_TYPES.MOBILE]: {
    aboutTitleStyle: {
      display: 'flex',
      justifyContent: 'center',
      width: '60vw',
      textAlign: 'center'
    },
    aboutRowContentStyle: {
      display: 'flex',
      justifyContent: 'center',
      width: '40vw',
      textAlign: 'center'
    },
    hrStyle: {
      width: '95vw',
      margin: '3vh'
    },
    aboutImgWrapperStyle: {
      width: '40vw'
    },
    aboutTxtWrapperStyle: {
      fontSize: '2.75vw',
      padding: '1vw'
    }
  }
};

export const aboutContentOne = `
My name is Nate Pratt and I am a software engineer based in Columbus, Ohio.
Some of my interests include music, sports and tech. You can find me playing
volleyball, video games, instruments and/or spending time with the people I love.
I am always trying to learn new things, and I enjoy solving problems along the way.
Please enjoy the following glimpse into my life 👇
`;

export const aboutContentTwo = `
Lily and our pup Scoob enjoying a view in the Blue Ridge Mountains of North Carolina 🌄
`;

export const aboutContentThree = `
The fur children - Toast, Toulouse and Scoob 🐕🐈
`;

export const aboutContentFour = `
Out on a walk with my squad 😁
`;
