/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
import Player from './Player';
import { GAME_STATES, GAME_WRAPPER_ID, KEY, PLAYER_SPEED } from './Zomboozled.const';
import bat from './images/bat2.png';
import { ZomboozledProps } from './Zomboozled.interface';
export default class Zomboozled extends Component {

  first = true;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | null;
  gameState: number;
  frame = 0;
  interval: NodeJS.Timer | null;

  player: Player;

  constructor(props: ZomboozledProps) {
    super(props);

    this.canvasRef = React.createRef();
    this.canvas = null;
    this.gameState = GAME_STATES.START;
    this.interval = null;
    this.player = new Player(0, 0, 0, 0);

    const self = this;
    document.addEventListener('keydown', function (ev) { return self.onkey(ev, ev.keyCode, true); }, false);
    document.addEventListener('keyup', function (ev) { return self.onkey(ev, ev.keyCode, false); }, false);
  }

  componentDidMount() {
    if (this.first) {
      this.setupAndStartGame();
    }
  }

  onkey(ev: KeyboardEvent, key: number, pressed: boolean) {
    switch(key) {
      case KEY.W: {
        this.player.input.up  = pressed; ev.preventDefault(); break;
      }
      case KEY.S: {
        this.player.input.down = pressed; ev.preventDefault(); break;
      }
      case KEY.A: {
        this.player.input.left  = pressed; ev.preventDefault(); break;
      }
      case KEY.D: {
        this.player.input.right = pressed; ev.preventDefault(); break;
      }
      case KEY.SPACE: {
        this.player.input.space = pressed; ev.preventDefault(); break;
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

    this.initializeCanvas(this.canvasRef);
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

    this.gameState = GAME_STATES.IN_GAME;
    if (this.first) this.startGame();
    this.first = false;

  }

  startGame() {
    console.log(`Starting game...`);
    this.frame = 0;
    this.interval = setInterval(() => { this.updateGame() }, 10);
  }

  updateGame() {
    this.clearGame();

    // this.HUD.update();

    if (this.gameState == GAME_STATES.IN_GAME) {
      this.determinePlayerMovement();
      this.player.update(this.getContext());
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
          <img id="bat" src={bat} style={{display: 'none'}} />
        </div>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    )
  }
}
