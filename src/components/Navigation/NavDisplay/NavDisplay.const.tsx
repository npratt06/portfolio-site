import { PageInfo, Pages } from './NavDisplay.interface';
import Resume from '../../../pages/Resume/Resume';
import Projects from '../../../pages/Projects/Projects';
import About from '../../../pages/About/About';
import Home from '../../../pages/Home/Home';
import { textFontStyle } from '../../../globalCSS';

// Pages --- start
const OtherPages: PageInfo[] = [
    {
        key: 0,
        linkPath: '/resume',
        displayString: 'Resume',
        component: <Resume />,
    },
    {
        key: 1,
        linkPath: '/projects',
        displayString: 'Projects',
        component: <Projects />,
    },
    {
        key: 2,
        linkPath: '/about me',
        displayString: 'About Me',
        component: <About />,
    },
];

export const MyPages: Pages = {
    home: {
        key: -1,
        linkPath: '/',
        displayString: 'Home',
        component: <Home />,
    },
    pages: OtherPages,
};
// Pages --- end

// css styles --- start
export const screenStyle: React.CSSProperties = {
    width: '70vw',
    height: '30vw',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5vh',
    overflow: 'hidden'
};

export const screenImgStyle: React.CSSProperties = {
    width: 'auto',
    height: 'inherit',
    position: 'absolute'
};

export const recordImgWrapperStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
}

export const recordImgStyle: React.CSSProperties = {
    width: 'auto',
    height: 'inherit',
    position: 'absolute',
    bottom: '-50%',
    transform: 'scale(1.3)',
    transition: 'all 0.6s ease-in-out'
}

const dotBase: React.CSSProperties = {
    height: '2vw',
    width: '2vw',
    borderRadius: '50%',
    display: 'inlineBlock',
    margin: '1vw',
};

export const dotStyle: React.CSSProperties = {
    backgroundColor: '#dcf2f0',
    ...dotBase,
    filter: 'drop-shadow(0px 0px 5px #000000)',
};

export const highlightedDotStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    ...dotBase,
};

export const navDisplayStringStyle: React.CSSProperties = {
    ...textFontStyle,
    fontSize: '5vw',
    color: 'black'
    
};
// css styles --- end
