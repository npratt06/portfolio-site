/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
import Player from './Player';
import { GAME_STATES, GAME_WRAPPER_ID, KEY, PLAYER_SPEED } from './Zomboozled.const';
import { ZomboozledProps } from './Zomboozled.interface';
import Zombie from './Zombie';
import HUD from './HUD';

import onePistol from './images/onePistol.png';
import onePistolFire from './images/onePistolFire.png';
import twoPistols from './images/twoPistols.png';
import twoPistolsFireL from './images/twoPistolsFireL.png';
import twoPistolsFireR from './images/twoPistolsFireR.png';
import bat from './images/bat2.png';
import batSwing from './images/batSwing.png';
import crawlZomb0 from './images/crawlZomb0.png';
import crawlZomb1 from './images/crawlZomb1.png';
import crawlZomb2 from './images/crawlZomb2.png';
import crawlZomb3 from './images/crawlZomb3.png';
import zomb from './images/zomb.png';
import roughZomb from './images/roughZomb.png';
import splat from './images/splat.png';
import upgradeSign from './images/upgradeSign.png';

export default class Zomboozled extends Component {

  first: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | null;
  gameState: number;
  frame = 0;
  interval: NodeJS.Timer | null;

  player: Player;
  zombies: Zombie[];
  HUD: HUD;

  constructor(props: ZomboozledProps) {
    super(props);
    console.log(`constructor called!`)
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.gameState = GAME_STATES.START;
    this.interval = null;
    this.player = new Player(0, 0, 0, 0);
    this.zombies = [];
    this.HUD = new HUD();
    this.first = true;

    const self = this;
    document.addEventListener('keydown', function (ev) { return self.onkey(self, ev, ev.keyCode, true); }, false);
    document.addEventListener('keyup', function (ev) { return self.onkey(self, ev, ev.keyCode, false); }, false);
  }

  componentDidMount() {
    console.log(`component mounted!`);
    if (this.first) {
      this.initializeCanvas(this.canvasRef);
      this.setupAndStartGame();
    }
  }

  onkey(self: Zomboozled, ev: KeyboardEvent, key: number, pressed: boolean) {
    switch(key) {
      case KEY.W: {
        self.player.input.up  = pressed;
        ev.preventDefault();
        break;
      }
      case KEY.S: {
        self.player.input.down = pressed;
        ev.preventDefault();
        break;
      }
      case KEY.A: {
        self.player.input.left = pressed;
        ev.preventDefault();
        break;
      }
      case KEY.D: {
        self.player.input.right = pressed;
        ev.preventDefault();
        break;
      }
      case KEY.SPACE: {
        console.log(`onKey gamestate: ${self.gameState}`)
        console.log(`space event - pressed? ${pressed}`)
        self.player.input.space = pressed;
        ev.preventDefault();
        if(!pressed && self.gameState !== GAME_STATES.IN_GAME) {
          self.gameState = GAME_STATES.IN_GAME
          self.HUD.displayControls = false;
          console.log(`calling setupandstartgame from onkey space pressed`)
          self.setupAndStartGame();
        }
        break;
      }
    }
  }

  determinePlayerRotation(ev: MouseEvent){
    const p1x = this.player.x+(this.player.width/2);
    const p1y =  this.player.y+(this.player.height/2);
    this.player.degrees = Math.atan2(ev.pageX- p1x,- (ev.pageY- p1y) )*(180/Math.PI);
  }

  determinePlayerMovement(){
    const canvas = this.getCanvas();
    if(this.player.input.up&&this.player.y > 0){
        this.player.y-=PLAYER_SPEED;
    }
    if(this.player.input.down&&this.player.y < canvas.height-this.player.height){
        this.player.y+=PLAYER_SPEED;
    }
    if(this.player.input.left&&this.player.x > 0){
        this.player.x-=PLAYER_SPEED;
    }
    if(this.player.input.right&&this.player.x < canvas.width-this.player.width){
        this.player.x+=PLAYER_SPEED;
    }
  }

  initializeCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const self = this;
    this.canvas = canvasRef.current;
    if (!this.canvas) throw 'Error initializing canvas';
    this.canvas.width = window.innerWidth - 4;
    this.canvas.height = window.innerHeight - 4;
    this.canvas.addEventListener('mousemove', function(ev) { self.determinePlayerRotation(ev); });
    // this.canvas.addEventListener('mousedown', function(ev) { self.shoot(ev, { down: true }); });
    this.canvas.addEventListener('contextmenu', function(ev) { ev.preventDefault(); return false; });
    this.canvas.addEventListener('onDrag', function(ev) { ev.preventDefault(); });
  }

  getCanvas() {
    const canvas = this.canvas;
    if (!canvas) throw 'Error getting canvas';
    return canvas;
  }

  getContext() {
    const canvas = this.getCanvas();
    const context = canvas.getContext('2d');
    if (!context) throw 'Error getting context';
    return context;
  }

  setupAndStartGame() {
    console.log(`Setting up and starting game...`);
    const self = this;

    console.log(`first? ${this.first}`)
    this.canvas = this.getCanvas();

    window.addEventListener('resize', function () {
      self.canvas = self.getCanvas();
      self.canvas.width = window.innerWidth - 4;
      self.canvas.height = window.innerHeight - 4;
    });

    // refactor me pls
    const batWidth = 212;
    const batHeight = 198;
    const playerWidth = 100;
    const playerHeight = 125;
    const playerX = (this.canvas.width/2)-playerWidth/2 - 35;
    const playerY = (this.canvas.height/2)-(playerHeight/2)+20;
    this.player = new Player(batWidth, batHeight, playerX, playerY);

    this.zombies = [];
    this.zombies.push(new Zombie(playerWidth-13, playerHeight+55, 300, 300, 'crawl'));

    this.frame = 0;
    if (this.first) this.startGame();
    this.first = false;
    console.log(`first updated to ${this.first}`)

  }

  resetZombie(zx: number, zy: number){
    for(let i = 0; i < this.zombies.length; i++){
        if(this.zombies[i].x==zx&&this.zombies[i].y==zy){
          this.zombies[i].dead = false;
          this.zombies[i].health = 3;
        }
    }
  }

  startGame() {
    console.log(`Starting game...`);
    this.interval = setInterval(() => { this.updateGame() }, 10);
  }

  updateGame() {
    console.log(`updateGame() gameState: ${this.gameState}`)
    const self = this;
    this.clearGame();

    this.HUD.update(this.getContext(), this.getCanvas(), this.player, this.gameState);

    if (this.gameState === GAME_STATES.IN_GAME) {
      // update player
      this.player.update(this.getContext(), this.getCanvas());

      // update zombies
      this.zombies.forEach(zombie => {
        zombie.update(this.getContext(), this.player);
        // player died
        if (zombie.killedPlayer) {
          this.player.dead = true;
          this.gameState = GAME_STATES.GAME_OVER;
        }
        // zombie died
        if(zombie.dead){
            const zx = zombie.x;
            const zy = zombie.y;
            setTimeout(function(){self.resetZombie(zx,zy)}, 2000);
        }
      });
    }
  }

  clearGame() {
    const canvas = this.getCanvas();
    const context = this.getContext();
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <div id={GAME_WRAPPER_ID}>
        <div>
          <img id="onePistol" src={onePistol} style={{display: 'none'}} />
          <img id="onePistolFire" src={onePistolFire} style={{display: 'none'}} />
          <img id="twoPistols" src={twoPistols} style={{display: 'none'}} />
          <img id="twoPistolsFireL" src={twoPistolsFireL} style={{display: 'none'}} />
          <img id="twoPistolsFireR" src={twoPistolsFireR} style={{display: 'none'}} />
          <img id="bat" src={bat} style={{display: 'none'}} />
          <img id="batSwing" src={batSwing} style={{display: 'none'}} />
          <img id="crawlZomb0" src={crawlZomb0} style={{display: 'none'}} />
          <img id="crawlZomb1" src={crawlZomb1} style={{display: 'none'}} />
          <img id="crawlZomb2" src={crawlZomb2} style={{display: 'none'}} />
          <img id="crawlZomb3" src={crawlZomb3} style={{display: 'none'}} />
          <img id="zomb" src={zomb} style={{display: 'none'}} />
          <img id="roughZomb" src={roughZomb} style={{display: 'none'}} />
          <img id="splat" src={splat} style={{display: 'none'}} />
          <img id="upgradeSign" src={upgradeSign} style={{display: 'none'}} />
        </div>
        <canvas ref={this.canvasRef} style={{ backgroundColor: '#333333', cursor: 'crosshair' }}></canvas>
      </div>
    )
  }
}
