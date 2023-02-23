/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
import { CANVAS_ID, GAME_STATES, KEY } from './Zomboozled.const';

export default class Zomboozled extends Component {

    //tons of vars for game specs
    keyStrokes = [];
    canvasWidth = window.innerWidth - 4;
    canvasHeight = window.innerHeight - 4;
    playerColor = "#ffffff";
    playerOutlineColor = "#0000ff";
    playerWidth = 100;
    playerHeight = 125;
    freeze = false;
    displayControls = true;
    batWidth = 212;
    batHeight = 198;
    fireDelay = false;
    L = true;

    myGame: Game = new Game(document.getElementById(CANVAS_ID) as HTMLCanvasElement, this.startGame, this.clearGame, GAME_STATES.START);
    player: Player = new Player(this.batWidth, this.batHeight, (this.canvasWidth / 2) - this.playerWidth / 2 - 35, (this.canvasHeight / 2) - (this.playerHeight / 2) + 20);
    zombies: Zombie[] = [];
    HUD: HUD = new HUD(this.myGame, this.player);
    first = true;


    constructor(props: any) {
        super(props);

        const self = this;
        window.addEventListener('resize', function () {
            self.myGame.canvas.width = window.innerWidth - 4;
            self.myGame.canvas.height = window.innerHeight - 4;
            self.canvasWidth = self.myGame.canvas.width;
            self.canvasHeight = self.myGame.canvas.height;
        });
        document.addEventListener('keydown', function (ev) { return self.onkey(ev, ev.keyCode, true); }, false);
        document.addEventListener('keyup', function (ev) { return self.onkey(ev, ev.keyCode, false); }, false);
        this.setupAndStartGame();
    }

onkey(ev: Event, key: number, pressed: boolean) {
    switch (key) {
        case KEY.W: this.player.input.up = pressed; ev.preventDefault(); break;
        case KEY.S: this.player.input.down = pressed; ev.preventDefault(); break;
        case KEY.A: this.player.input.left = pressed; ev.preventDefault(); break;
        case KEY.D: this.player.input.right = pressed; ev.preventDefault(); break;
        case KEY.SPACE: this.player.input.space = pressed; ev.preventDefault(); break;
    }
}

setupAndStartGame() {
    console.log(`Setting up and starting game...`);
    // this.zombies = [];
    // this.zombies.push(new Zombie(this.myGame, this.player, this.playerWidth - 13, this.playerHeight + 55, 300, 300, document.getElementById('crawlZomb0'), 'crawl'));

    if (this.first) {
        this.myGame.start();
        this.first = false;
    }
}

startGame() {
    console.log(`Starting game...`);
    const self = this;
    this.myGame.canvas.width = this.canvasWidth;
    this.myGame.canvas.height = this.canvasHeight;
    this.myGame.context = this.myGame.canvas.getContext("2d");
    // document.body.insertBefore(this.myGame.canvas, document.body.childNodes[0]);
    this.myGame.frameNo = 0;
    this.myGame.interval = setInterval(this.updateGame, 10);
    // this.myGame.canvas.addEventListener('mousemove', function (ev: any) { self.determinePlayerRotation(ev); });
    // this.myGame.canvas.addEventListener('mousedown', function (ev: any) { self.shoot(ev, { down: true }); });
    // this.myGame.canvas.addEventListener('contextmenu', function (ev: any) { ev.preventDefault(); return false; });
    // this.myGame.canvas.addEventListener('onDrag', function (ev: any) { ev.preventDefault(); });
}

clearGame() {
    this.myGame.context.clearRect(0, 0, this.myGame.canvas.width, this.myGame.canvas.height);
}

updateGame() {
    console.log(`game updated!`);
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



render() {
    return (
        <div>
            <canvas id={CANVAS_ID}>

            </canvas>
        </div>
    )
}
}
