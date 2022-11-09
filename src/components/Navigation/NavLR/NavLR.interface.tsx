const triWidth = '40px';
const triHeight = '80px';
const triMargin = '40px';

export interface NavigateLRProps {
    navIndex: number,
    handleClickLeft: any,
    handleClickRight: any
};

export interface NavigateLRState {
    linkPath: string
};

export const triangleLeftStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    borderTop: `${triWidth} solid transparent`,
    borderRight: `${triHeight} solid #555`,
    borderBottom: `${triWidth} solid transparent`,
    marginRight: `${triMargin}`
};

export const triangleRightStyle: React.CSSProperties = {
    width: 0,
    height: 0,
    borderTop: `${triWidth} solid transparent`,
    borderLeft: `${triHeight} solid #555`,
    borderBottom: `${triWidth} solid transparent`,
    marginLeft: `${triMargin}`,
};

export const selectBtnStyle: React.CSSProperties = {
    backgroundColor: '#afaa98',
    width: '75vw',
    height: '25vw',
    margin: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};