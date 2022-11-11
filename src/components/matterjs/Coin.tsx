import Matter, { Mouse } from 'matter-js';
import React, { Component } from 'react'
import { CoinProps, CoinState, ScreenSize } from './Coin.interface';

export default class Coin extends Component<CoinProps, CoinState> {

    boxRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    screenSize: ScreenSize;

    constructor(props: CoinProps) {
        super(props);
        this.boxRef = React.createRef();
        this.canvasRef = React.createRef();
        this.screenSize = this.getScreenSize();
        this.state = {
            outerStyle: {
                position: 'absolute',
                zIndex: 99,
                pointerEvents: 'none'
            }
        }
    }

    componentDidMount(): void {
        this.matterjsRender();
    }

    componentDidUpdate(): void {
        console.log('coin updated')
        this.screenSize = this.getScreenSize();
    }

    getScreenSize(): ScreenSize {
        const screenSize = { width: window.innerWidth, height: window.innerHeight };
        return screenSize;
    }

    matterjsRender() {
        this.screenSize = this.getScreenSize();
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
                width: this.screenSize.width,
                height: this.screenSize.height,
                background: 'rgba(0, 0, 0, 0)',
                wireframes: false
            }
        });

        // create and add coin
        const coin = Bodies.circle(200, 200, 100, {
            restitution: 0.3,
            render: {
                fillStyle: 'gold'
            }
        });
        World.add(engine.world, [coin]);

        // create and add walls
        const horizontalBoundWidth = this.screenSize.width;
        const horizontalBoundHeight = 1;
        const verticalBoundWidth = 1;
        const verticalBoundHeight = this.screenSize.height;
        World.add(engine.world, [
            Bodies.rectangle(horizontalBoundWidth / 2, horizontalBoundHeight / 2, horizontalBoundWidth, horizontalBoundHeight, { isStatic: true, render: { opacity: 0 } }),
            Bodies.rectangle(horizontalBoundWidth / 2, this.screenSize.height - (horizontalBoundHeight / 2), horizontalBoundWidth, horizontalBoundHeight, { isStatic: true, render: { opacity: 0 } }),
            Bodies.rectangle(verticalBoundWidth / 2, verticalBoundHeight / 2, verticalBoundWidth, verticalBoundHeight, { isStatic: true, render: { opacity: 0 } }),
            Bodies.rectangle(this.screenSize.width - (verticalBoundWidth / 2), verticalBoundHeight / 2, verticalBoundWidth, verticalBoundHeight, { isStatic: true, render: { opacity: 0 } })
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

        Matter.Events.on(mouseConstraint, 'mousemove', (event: Matter.IMouseEvent<Matter.MouseConstraint>) => {
            const tmpResult = Matter.Query.point([coin], event.source.mouse.position);
            const mouseOverCoin = tmpResult.length > 0;
            if (mouseOverCoin) {
                console.log(`mouse is over the coin!`);
                
                // this.setState(() => {
                //     return {
                //         outerStyle: {
                //             position: 'absolute',
                //             zIndex: 99,
                //             pointerEvents: 'auto'
                //         }
                //     };
                // });
            } else {
                // this.setState(() => {
                //     return {
                //         outerStyle: {
                //             position: 'absolute',
                //             zIndex: 99,
                //             pointerEvents: 'none'
                //         }
                //     };
                // });
            }
        });
        Matter.Runner.run(engine);
        Render.run(render);
    }

    render() {
        return (
            <div
                ref={this.boxRef}
                style={this.state.outerStyle}
            >
                <canvas ref={this.canvasRef} />
            </div>
        )
    }
}
