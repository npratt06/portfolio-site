import Matter, { Mouse } from 'matter-js';
import React, { Component } from 'react'
import { CoinProps } from './Coin.interface';

export default class Coin extends Component {

    boxRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: CoinProps) {
        super(props);
        this.boxRef = React.createRef();
        this.canvasRef = React.createRef();
    }

    componentDidMount(): void {
        this.matterjsRender();
    }

    componentDidUpdate(): void {
        this.matterjsRender();
    }

    matterjsRender() {
        const screenSize = { width: window.innerWidth, height: window.innerHeight };
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;

        const engine = Engine.create({});
        engine.gravity = { x: 0, y: 1, scale: 0.003 };

        const render = Render.create({
            element: this.boxRef.current || undefined,
            engine: engine,
            canvas: this.canvasRef.current || undefined,
            options: {
                width: screenSize.width,
                height: screenSize.height,
                background: 'rgba(0, 0, 0, 0)',
                wireframes: false
            }
        });

        // create and add ball
        const ball = Bodies.circle(200, 200, 100, {
            restitution: 0.3,
            render: {
                fillStyle: 'gold'
            }
        });
        World.add(engine.world, [ball]);

        // create and add walls
        const horizontalBoundWidth = screenSize.width;
        const horizontalBoundHeight = 1;
        const verticalBoundWidth = 1;
        const verticalBoundHeight = screenSize.height;
        World.add(engine.world, [
            Bodies.rectangle(horizontalBoundWidth / 2, horizontalBoundHeight / 2, horizontalBoundWidth, horizontalBoundHeight, { isStatic: true, render: { opacity: 0 } }),
            Bodies.rectangle(horizontalBoundWidth / 2, screenSize.height - (horizontalBoundHeight / 2), horizontalBoundWidth, horizontalBoundHeight, { isStatic: true, render: { opacity: 0 } }),
            Bodies.rectangle(verticalBoundWidth / 2, verticalBoundHeight / 2, verticalBoundWidth, verticalBoundHeight, { isStatic: true, render: { opacity: 0 } }),
            Bodies.rectangle(screenSize.width - (verticalBoundWidth / 2), verticalBoundHeight / 2, verticalBoundWidth, verticalBoundHeight, { isStatic: true, render: { opacity: 0 } })
        ]);


        // create and add mouse constraint for interactivity
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
            mouse: mouse,
            constraint: {
                render: {
                    visible: false
                },
                stiffness: 1
            }
        });
        World.add(engine.world, mouseConstraint);

        // Matter.Events.on(mouseConstraint, 'mousemove', (event: Matter.IMouseEvent<Matter.MouseConstraint>) => {
        //     const tmpResult = Matter.Query.point([ball], event.source.mouse.position);
        //     const mouseOverBall = tmpResult.length > 0;
        //     if (mouseOverBall) {
        //         console.log(`mouse is over the ball!`);
        //         setOuterStyle({
        //             position: 'absolute',
        //             zIndex: 99,
        //             pointerEvents: 'auto'
        //         });
        //     } else {
        //         setOuterStyle({
        //             position: 'absolute',
        //             zIndex: 99,
        //             pointerEvents: 'none'
        //         });
        //     }
        // });
        Matter.Runner.run(engine);
        Render.run(render);
    }

    render() {
        return (
            <div
                ref={this.boxRef}
                style={{
                    position: 'absolute',
                    zIndex: 99,
                    pointerEvents: 'none'
                }}
            >
                <canvas ref={this.canvasRef} />
            </div>
        )
    }
}
