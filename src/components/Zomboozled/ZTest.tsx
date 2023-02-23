/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
import Game from './Game';
import { CANVAS_ID, GAME_STATES, GAME_WRAPPER_ID } from './Zomboozled.const';

export default class ZTest extends Component {

  first = true;

  myGame: Game;

  constructor(props: any) {
    super(props);

    const gameCanvas: HTMLCanvasElement = document.createElement("canvas");
    gameCanvas.setAttribute("id", CANVAS_ID);

    // const gameCanvas: JSX.Element = (
    //   <canvas id={CANVAS_ID}>

    //   </canvas>
    // );

    this.myGame = new Game(gameCanvas, this.startGame, this.clearGame, GAME_STATES.START);

    const self = this;
    window.addEventListener('resize', function () {
      self.myGame.canvas.width = window.innerWidth - 4;
      self.myGame.canvas.height = window.innerHeight - 4;
    });
    // document.addEventListener('keydown', function (ev) { return self.onkey(ev, ev.keyCode, true); }, false);
    // document.addEventListener('keyup', function (ev) { return self.onkey(ev, ev.keyCode, false); }, false);
    this.setupAndStartGame();
  }

  setupAndStartGame() {
    console.log(`Setting up and starting game...`);
    // this.zombies = [];
    // this.zombies.push(new Zombie(this.myGame, this.player, this.playerWidth - 13, this.playerHeight + 55, 300, 300, document.getElementById('crawlZomb0'), 'crawl'));

    if (this.first) {
      this.startGame();
      this.first = false;
    }
  }

  startGame() {
    console.log(`Starting game...`);

    const self = this;
    this.myGame.context = this.myGame.canvas.getContext("2d");
    // document.body.insertBefore(this.myGame.canvas, document.body.childNodes[0]);
    this.myGame.frameNo = 0;
    this.myGame.interval = setInterval(this.updateGame, 10);
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
    this.myGame.context.clearRect(0, 0, this.myGame.canvas.width, this.myGame.canvas.height);
  }

  render() {
    return (
      <div id={GAME_WRAPPER_ID} style={{ backgroundColor: '#000000' }}>
      </div>
    )
  }
}
