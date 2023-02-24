/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
import { GAME_STATES, GAME_WRAPPER_ID } from './Zomboozled.const';

export default class ZTest extends Component {

  first = true;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | null;
  gameState: number;
  frame = 0;
  interval: NodeJS.Timer | null;

  constructor(props: any) {
    super(props);

    this.canvasRef = React.createRef();
    this.canvas = null;
    this.gameState = GAME_STATES.START;
    this.interval = null;

    // document.addEventListener('keydown', function (ev) { return self.onkey(ev, ev.keyCode, true); }, false);
    // document.addEventListener('keyup', function (ev) { return self.onkey(ev, ev.keyCode, false); }, false);
  }

  componentDidMount() {
    this.setupAndStartGame();
  }

  getCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) throw 'Error getting canvas';
    return canvas;
  }

  getContext(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) throw 'Error getting context';
    return context;
  }

  setupAndStartGame() {
    console.log(`Setting up and starting game...`);
    this.canvas = this.getCanvas(this.canvasRef);
    this.canvas.width = window.innerWidth - 4;
    this.canvas.height = window.innerHeight - 4;

    const self = this;
    window.addEventListener('resize', function () {
      self.canvas = self.getCanvas(self.canvasRef);
      self.canvas.width = window.innerWidth - 4;
      self.canvas.height = window.innerHeight - 4;
    });
    // this.zombies = [];
    // this.zombies.push(new Zombie(this.myGame, this.player, this.playerWidth - 13, this.playerHeight + 55, 300, 300, document.getElementById('crawlZomb0'), 'crawl'));

    if (this.first) {
      this.startGame();
      this.first = false;
    }
  }

  startGame() {
    console.log(`Starting game...`);

    // const self = this;
    this.frame = 0;
    this.interval = setInterval(this.updateGame, 10);
    // this.myGame.canvas.addEventListener('mousemove', function (ev: any) { self.determinePlayerRotation(ev); });
    // this.myGame.canvas.addEventListener('mousedown', function (ev: any) { self.shoot(ev, { down: true }); });
    // this.myGame.canvas.addEventListener('contextmenu', function (ev: any) { ev.preventDefault(); return false; });
    // this.myGame.canvas.addEventListener('onDrag', function (ev: any) { ev.preventDefault(); });
  }

  updateGame() {
    // console.log(`game updated!`);
    // this.myGame.clear();

    // this.HUD.update();

    // if (this.myGame.state == GAME_STATES.IN_GAME) {
    //     this.determinePlayerMovement();
    //     this.player.update();
    //     for (let i = 0; i < this.zombies.length; i++) {
    //         this.zombies[i].update()
    //         if (this.zombies[i].dead) {
    //             const zx = this.zombies[i].x;
    //             const zy = this.zombies[i].y;
    //             const self = this;
    //             setTimeout(function () { self.resetZombie(zx, zy) }, 2000);
    //         }
    //     }
    // }
  }

  clearGame() {
    this.canvas = this.getCanvas(this.canvasRef);
    const context = this.getContext(this.canvas);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return (
      <div id={GAME_WRAPPER_ID}>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    )
  }
}
