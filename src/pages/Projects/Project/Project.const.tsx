import { StyleSets } from "../../../components/componentHelpers";
import { DEVICE_TYPES } from "../../../global.const";
import { backgroundColorStyle, textFontStyle } from "../../../globalCSS";

export const ProjectColumnStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
}

export const PROJECT_STYLE_SETS: StyleSets = {
    [DEVICE_TYPES.DESKTOP]: {
        ProjectStyle: {
            ...backgroundColorStyle,
            ...textFontStyle,
            display: 'flex',
            justifyContent: 'space-between',
            width: '60vw',
            textAlign: 'center'
        },
        ProjectColumnStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        },
        ProjectNameStyle: {
            fontSize: '1.75vw',
            marginBottom: '1vw'
        },
        ProjectDescriptionStyle: {
            fontSize: '1.1vw'
        }
    },
    [DEVICE_TYPES.MOBILE]: {
        ProjectStyle: {
            ...backgroundColorStyle,
            ...textFontStyle,
            display: 'flex',
            justifyContent: 'center',
            width: '87vw',
            textAlign: 'center'
        },
        ProjectColumnStyle: {
            width: '100%',
            height: '100%'
        },
        ProjectNameStyle: {
            fontSize: '6vw',
            marginBottom: '3vw'
        },
        ProjectDescriptionStyle: {
            fontSize: '3.75vw',
            marginTop: '3vw'
        }
    }
}