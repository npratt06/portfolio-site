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
        component: <Resume />
    },
    {
        key: 1,
        linkPath: '/projects',
        displayString: 'Projects',
        component: <Projects />
    },
    {
        key: 2,
        linkPath: '/about me',
        displayString: 'About Me',
        component: <About />
    }
];

export const MyPages: Pages = {
    home: {
        key: -1,
        linkPath: '/',
        displayString: 'Home',
        component: <Home />
    },
    pages: OtherPages
};
// Pages --- end

// css styles --- start
export const screenStyle: React.CSSProperties = {
    backgroundColor: '#afaa98',
    width: '75vw',
    height: '25vw',
    margin: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const dotBase: React.CSSProperties = {
    height: '2vw',
    width: '2vw',
    borderRadius: '50%',
    display: 'inlineBlock',
    margin: '1vw'
};

export const dotStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    ...dotBase
};

export const highlightedDotStyle: React.CSSProperties = {
    backgroundColor: '#777777',
    ...dotBase
};

export const navDisplayStringStyle = {
    ...textFontStyle,
    fontSize: '5vw'
};
// css styles --- end