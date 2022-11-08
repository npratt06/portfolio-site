import _ from 'lodash';
import Home from '../../../pages/Home';
import Resume from './../../../pages/Resume';
import Projects from './../../../pages/Projects';
import About from './../../../pages/About';

export interface PageInfo {
    key: number,
    linkPath: string,
    displayString: string,
    component: JSX.Element
};

export interface Pages {
    home: PageInfo,
    pages: PageInfo[]
};

const Pages: PageInfo[] = [
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
    pages: Pages
};

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
}

export const dotStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    ...dotBase
};

export const highlightedDotStyle: React.CSSProperties = {
    backgroundColor: '#777777',
    ...dotBase
};

export interface NavDisplayProps {
    navDisplayString: string
};