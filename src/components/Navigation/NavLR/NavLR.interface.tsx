const triWidth = '40px';
const triHeight = '80px';
const triMargin = '40px';

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

export interface NavigateLRProps {
    handleClickLeft: any,
    handleClickRight: any  
};