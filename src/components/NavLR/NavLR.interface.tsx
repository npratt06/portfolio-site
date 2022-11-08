const triWidth = '40px';
const triHeight = '80px';
const triMargin = '40px';

export const triangleLeft = {
    'width': 0,
    'height': 0,
    'borderTop': `${triWidth} solid transparent`,
    'borderRight': `${triHeight} solid #555`,
    'borderBottom': `${triWidth} solid transparent`,
    'marginRight': `${triMargin}`
};

export const triangleRight = {
    'width': 0,
    'height': 0,
    'borderTop': `${triWidth} solid transparent`,
    'borderLeft': `${triHeight} solid #555`,
    'borderBottom': `${triWidth} solid transparent`,
    'marginLeft': `${triMargin}`,
    '&:hover': {
        'backgroundColor': 'white'
    }
};