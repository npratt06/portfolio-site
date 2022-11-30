export interface ProjectProps {
    deviceType: string,
    name: string,
    link: string,
    description: string,
    imgSrc: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProjectState {
    deviceType: string;
}

export interface ProjectInfo {
    name: string,
    link: string,
    description: string,
    imgSrc: string
}