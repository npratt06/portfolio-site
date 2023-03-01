import { PageInfo, Pages } from './NavDisplay.interface';
import Resume from '../../../pages/Resume/Resume';
import Projects from '../../../pages/Projects/Projects';
import About from '../../../pages/About/About';
import Home from '../../../pages/Home/Home';
import { textFontStyle } from '../../../globalCSS';
import { DEVICE_TYPES } from '../../../global.const';
import { StyleSets } from '../../componentHelpers';
import Zomboozled from '../../Zomboozled/Zomboozled';

// Pages --- start
const OtherPages: PageInfo[] = [
    {
        key: 0,
        linkPath: '/resume',
        displayString: 'Resume',
        component: <Resume deviceType={DEVICE_TYPES.DESKTOP}/>,
    },
    {
        key: 1,
        linkPath: '/projects',
        displayString: 'Projects',
        component: <Projects deviceType={DEVICE_TYPES.DESKTOP}/>,
    },
    {
        key: 2,
        linkPath: '/about me',
        displayString: 'About Me',
        component: <About deviceType={DEVICE_TYPES.DESKTOP}/>,
    },
];

export const ZomboozledPage: PageInfo = {
    key: 3,
    linkPath: '/zomboozled',
    displayString: 'Zomboozled',
    component: <Zomboozled deviceType={DEVICE_TYPES.DESKTOP}/>,
};

export const MyPages: Pages = {
    home: {
        key: -1,
        linkPath: '/',
        displayString: 'Home',
        component: <Home deviceType={DEVICE_TYPES.DESKTOP}/>,
    },
    pages: OtherPages,
};
// Pages --- end

// css styles --- start

const dotBase: React.CSSProperties = {
    height: '1.25vw',
    width: '1.25vw',
    borderRadius: '50%',
    display: 'inlineBlock',
    margin: '1vw',
};

export const NAV_DISPLAY_STYLE_SETS: StyleSets = {
    [DEVICE_TYPES.DESKTOP]: {
        screenStyle: {
            width: '85vw',
            height: '30vw',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5vh',
            overflow: 'hidden'
        },
        screenImgStyle: {
            width: 'inherit',
            height: 'inherit',
            position: 'absolute'
        },
        recordImgWrapperStyle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
        recordImgStyle: {
            width: 'auto',
            height: 'inherit',
            position: 'absolute',
            bottom: '-50%',
            transform: 'scale(1.3)',
            transition: 'rotate 0.6s ease-in-out'
        },
        dotBase: dotBase,
        dotStyle: {
            backgroundColor: '#dcf2f0',
            ...dotBase,
            filter: 'drop-shadow(0px 0px 5px #000000)',
        },
        highlightedDotStyle: {
            backgroundColor: '#000000',
            ...dotBase,
        },
        navDisplayStringStyle: {
            ...textFontStyle,
            fontSize: '5vw',
            color: 'black',
            opacity: 0,
            marginTop: '1vw'
        }
    },
    [DEVICE_TYPES.MOBILE]: {
        screenStyle: {
            width: '80vw',
            height: '55vw',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5vh',
            overflow: 'hidden'
        },
        screenImgStyle: {
            width: 'inherit',
            height: 'inherit',
            position: 'absolute'
        },
        recordImgWrapperStyle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
        recordImgStyle: {
            width: 'auto',
            height: 'inherit',
            position: 'absolute',
            bottom: '-50%',
            transform: 'scale(1.1)',
            transition: 'rotate 0.6s ease-in-out'
        },
        dotBase: dotBase,
        dotStyle: {
            backgroundColor: '#dcf2f0',
            ...dotBase,
            filter: 'drop-shadow(0px 0px 5px #000000)',
        },
        highlightedDotStyle: {
            backgroundColor: '#000000',
            ...dotBase,
        },
        navDisplayStringStyle: {
            ...textFontStyle,
            fontSize: '9vw',
            color: 'black',
            opacity: 0,
            marginTop: '5vw'
        }
    }
}
// css styles --- end
