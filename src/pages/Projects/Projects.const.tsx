import { StyleSets } from "../../components/componentHelpers";
import { DEVICE_TYPES } from "../../global.const";
import { backgroundColorStyle, textFontStyle } from "../../globalCSS";
import { ProjectInfo } from "./Project/Project.interface";
import spinball from '../../img/spinball-screenshot.jpg';
import zomboozled from '../../img/zomboozled.png';

export const projectsStyle: React.CSSProperties = {
    ...backgroundColorStyle,
    ...textFontStyle,
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden'
};

export const projectsRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
};

export const projectStyle: React.CSSProperties = {
    ...projectsRowStyle,
    marginBottom: '4vw'
}

export const hrStyle: React.CSSProperties = {
    width: '65vw',
    margin: '3vh'
};

export const MyProjects: ProjectInfo[] = [
    {
        name: 'Spinball',
        link: 'https://store.steampowered.com/app/943920/Spinball/',
        description:
        `
            Spinball is a competitive couch multiplayer video game that some friends and I created.
            It was originally built with JavaScript and can be purchased on Steam. I contributed to
            the game design, completed programming tasks, and helped create some art assets. I also created
            the soundtrack 🎵!
        `,
        imgSrc: spinball
    },
    {
        name: 'Zomboozled',
        link: '',
        description: `
            Zomboozled is a small video game that I created by myself in college as a challenge to see what I could fit into
            a single HTML file. I created this game using pure HTML/JavaScript. It was a very fun project and I would love
            to go back and refactor/build upon it.
        `,
        imgSrc: zomboozled
    }
];

export const PROJECTS_STYLE_SETS: StyleSets = {
    [DEVICE_TYPES.DESKTOP]: {
    },
    [DEVICE_TYPES.MOBILE]: {
    }
}