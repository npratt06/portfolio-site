/* eslint-disable @typescript-eslint/no-this-alias */
import React, { Component } from 'react'
import Player from './Player';
import { batHeight, batWidth, GAME_STATES, GAME_WRAPPER_ID, getRandomSpawnXY, KEY, playerHeight, playerWidth, PLAYER_SPEED } from './Zomboozled.const';
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

  componentMounted = false;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | null;
  gameState: number;
  frame = 0;
  interval: NodeJS.Timer | null;

  player: Player;
  zombies: Zombie[];
  HUD: HUD;

  fireDelay = false;
  L = true;

  constructor(props: ZomboozledProps) {
    super(props);
     console.log(`constructor called!`)
    this.canvasRef = React.createRef();
    this.canvas = null;
    this.gameState = GAME_STATES.START;
    this.interval = null;
    this.player = new Player(0, 0, 0, 0);
    this.zombies = [];
    this.HUD = new HUD(this.player, document.getElementById('') as HTMLImageElement);

    const self = this;
    document.addEventListener('keydown', function (ev) { return self.onkey(self, ev, ev.keyCode, true); }, false);
    document.addEventListener('keyup', function (ev) { return self.onkey(self, ev, ev.keyCode, false); }, false);
  }

  componentDidMount() {
    console.log(`component mounted!`);
    if (!this.componentMounted) {
      this.componentMounted = true;
      this.initializeCanvas(this.canvasRef);
      this.initializeGame();
      this.startGame();
    }
  }

  onkey(self: Zomboozled, ev: KeyboardEvent, key: number, pressed: boolean) {
    switch (key) {
      case KEY.W: {
        self.player.input.up = pressed;
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
        self.player.input.space = pressed;
        ev.preventDefault();
        if (!pressed && self.gameState === GAME_STATES.START) {
          self.gameState = GAME_STATES.IN_GAME;
        } else if (!pressed && self.gameState === GAME_STATES.GAME_OVER) {
          self.resetGame();
        }
        break;
      }
    }
  }

  determinePlayerRotation(ev: MouseEvent) {
    const p1x = this.player.x + (this.player.width / 2);
    const p1y = this.player.y + (this.player.height / 2);
    this.player.degrees = Math.atan2(ev.pageX - p1x, - (ev.pageY - p1y)) * (180 / Math.PI);
  }

  determinePlayerMovement() {
    const canvas = this.getCanvas();
    if (this.player.input.up && this.player.y > 0) {
      this.player.y -= PLAYER_SPEED;
    }
    if (this.player.input.down && this.player.y < canvas.height - this.player.height) {
      this.player.y += PLAYER_SPEED;
    }
    if (this.player.input.left && this.player.x > 0) {
      this.player.x -= PLAYER_SPEED;
    }
    if (this.player.input.right && this.player.x < canvas.width - this.player.width) {
      this.player.x += PLAYER_SPEED;
    }
  }

  determineSprite(spriteType: string, self: Zomboozled) {
    if (self.player.weapon.id == 'bat') {
      if (spriteType == 'standing') {
        self.player.image = document.getElementById(self.player.weapon.standingSpriteImgID) as HTMLImageElement;
        self.player.swinging = false;
      } else if (spriteType == 'shooting') {
        self.player.image = document.getElementById(self.player.weapon.swingingSpriteImgID) as HTMLImageElement;
        self.player.swinging = true;
      }
    } else if (self.player.weapon.id == 'pistol') {
      if (spriteType == 'standing') self.player.image = document.getElementById(self.player.weapon.standingSpriteImgID) as HTMLImageElement;
      else if (spriteType == 'shooting') self.player.image = document.getElementById(self.player.weapon.shootingSpriteImgID) as HTMLImageElement;
    } else if (self.player.weapon.id == 'twoPistols') {
      if (spriteType == 'standing') {
        self.player.image = document.getElementById(self.player.weapon.standingSpriteImgID) as HTMLImageElement;
      } else if (spriteType == 'shooting') {
        if (self.L) self.player.image = document.getElementById(self.player.weapon.shootingSpriteLImgID) as HTMLImageElement;
        else self.player.image = document.getElementById(self.player.weapon.shootingSpriteRImgID) as HTMLImageElement;
        self.L = !self.L;
      }
    }
  }

  shoot(ev: MouseEvent) {
     const self = this;

    ev.preventDefault();
    if (ev.button == 0 && this.gameState == GAME_STATES.IN_GAME) {
      if (!this.fireDelay) {
        this.fireDelay = true;

        // this.player.batSwingSound.play();
        this.shotsFired();
        let timeout = 100;
        if (this.player.weapon.id == 'bat') timeout = 250;
        setTimeout(() => {
          self.determineSprite('standing', self);
          if ((!self.HUD.upgrade || self.HUD.ammoString!='AMMO: N/A') && self.HUD.ammoCount != 0) self.fireDelay = false;
          for (let i = 0; i < self.zombies.length; i++) {
            self.zombies[i].shot = false;
          }
        }, timeout);
        for (let i = 0; i < this.zombies.length; i++) {
          this.checkShot(ev.clientX, ev.clientY, this.zombies[i], this.player);
        }
        self.determineSprite('shooting', self);
      }
    }
  }

  shotsFired() {
    const self = this;
    if(this.HUD.ammoString!='AMMO: N/A'){
        this.HUD.ammoString = this.HUD.ammoString.slice(0,this.HUD.ammoString.length-2);
        this.HUD.ammoCount--;
        if(this.HUD.ammoCount==0){
          this.HUD.ammoString = 'AMMO: RELOADING';
            this.fireDelay = true;
            setTimeout(() => { 
                self.HUD.ammoString = self.player.weapon.ammoString;
                self.fireDelay = false;
                self.HUD.ammoCount = self.player.weapon.ammoCount;
            }, 1000);
        }
    }
  }

  checkShot(clickX: number, clickY: number, zombie: Zombie, player: Player) {
    const canvas = this.getCanvas();
    const midX = zombie.x + (zombie.width / 2);
    const midY = zombie.y + (zombie.height / 2);
    let shot = Math.abs(clickX - midX) < zombie.width / 2 && Math.abs(clickY - midY) < zombie.height / 2;
    const tmp = Math.abs((player.x + (player.width / 2)) - midX);
    if (player.weapon.id == 'bat') shot = shot && tmp < player.height * 1.3;
    if (shot) {
      // player.batSwingHitSound.play();
      zombie.health--;
      zombie.cX = clickX;
      zombie.cY = clickY;
      zombie.shot = true;
      if (zombie.health == 0) {
        this.HUD.displayControls = false;
        player.killCount++;
        this.HUD = player.checkForGunUpgrade(this.HUD);
        this.fireDelay = true;
        zombie.dead = true;
        let pair = getRandomSpawnXY(player.width, player.height, canvas.width, canvas.height);
        zombie.x = pair.x;
        zombie.y = pair.y;
        pair = getRandomSpawnXY(player.width, player.height, canvas.width, canvas.height);
        const thisOrThat = Math.floor((Math.random() * 6) + 1);
        if (this.zombies.length < 1000 && thisOrThat == 1) this.zombies.push(new Zombie(player.width, player.height, pair.x, pair.y, 'roughZomb', ''));
        else if (this.zombies.length < 1000 && thisOrThat == 2) this.zombies.push(new Zombie(player.width, player.height, pair.x, pair.y, 'zomb', ''));
        else if (this.zombies.length < 1000 && thisOrThat == 3) this.zombies.push(new Zombie(player.width, player.height, pair.x, pair.y, 'roughZomb', ''));
      }
    }
  }

  initializeCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const self = this;
    this.canvas = canvasRef.current;
    if (!this.canvas) throw 'Error initializing canvas';
    this.canvas.width = window.innerWidth - 4;
    this.canvas.height = window.innerHeight - 4;
    this.canvas.addEventListener('mousemove', function (ev) { self.determinePlayerRotation(ev); });
    this.canvas.addEventListener('mousedown', function (ev) {
      self.shoot(ev);
    });
    this.canvas.addEventListener('contextmenu', function (ev) { ev.preventDefault(); return false; });
    this.canvas.addEventListener('onDrag', function (ev) { ev.preventDefault(); });
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

  initializeGame() {
    console.log(`Initializing game...`);
    const self = this;

    this.canvas = this.getCanvas();

    window.addEventListener('resize', function () {
      self.canvas = self.getCanvas();
      self.canvas.width = window.innerWidth - 4;
      self.canvas.height = window.innerHeight - 4;
    });

    const playerX = (this.canvas.width / 2) - playerWidth / 2 - 35;
    const playerY = (this.canvas.height / 2) - (playerHeight / 2) + 20;
    this.player = new Player(batWidth, batHeight, playerX, playerY);

    this.zombies = [];
    this.zombies.push(new Zombie(playerWidth - 13, playerHeight + 55, 300, 300, 'crawlZomb0', 'crawl'));

    const upgradeSignImg = document.getElementById('upgradeSign') as HTMLImageElement;
    this.HUD = new HUD(this.player, upgradeSignImg);

    this.frame = 0;

    this.gameState = GAME_STATES.START;
  }

  resetZombie(zx: number, zy: number) {
    for (let i = 0; i < this.zombies.length; i++) {
      if (this.zombies[i].x == zx && this.zombies[i].y == zy) {
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
    const self = this;
    this.clearContext();

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
        if (zombie.dead) {
          const zx = zombie.x;
          const zy = zombie.y;
          setTimeout(function () { self.resetZombie(zx, zy) }, 2000);
        }
      });
    }
  }

  resetGame() {
    this.canvas = this.getCanvas();

    const playerX = (this.canvas.width / 2) - playerWidth / 2 - 35;
    const playerY = (this.canvas.height / 2) - (playerHeight / 2) + 20;
    this.player = new Player(batWidth, batHeight, playerX, playerY);

    this.zombies = [];
    this.zombies.push(new Zombie(playerWidth - 13, playerHeight + 55, 300, 300, 'crawlZomb0', 'crawl'));

    const upgradeSignImg = document.getElementById('upgradeSign') as HTMLImageElement;
    this.HUD = new HUD(this.player, upgradeSignImg);
    
    this.HUD.displayControls = false;
    this.gameState = GAME_STATES.IN_GAME;
  }

  clearContext() {
    const canvas = this.getCanvas();
    const context = this.getContext();
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <div id={GAME_WRAPPER_ID}>
        <div>
          <img id="onePistol" src={onePistol} style={{ display: 'none' }} />
          <img id="onePistolFire" src={onePistolFire} style={{ display: 'none' }} />
          <img id="twoPistols" src={twoPistols} style={{ display: 'none' }} />
          <img id="twoPistolsFireL" src={twoPistolsFireL} style={{ display: 'none' }} />
          <img id="twoPistolsFireR" src={twoPistolsFireR} style={{ display: 'none' }} />
          <img id="bat" src={bat} style={{ display: 'none' }} />
          <img id="batSwing" src={batSwing} style={{ display: 'none' }} />
          <img id="crawlZomb0" src={crawlZomb0} style={{ display: 'none' }} />
          <img id="crawlZomb1" src={crawlZomb1} style={{ display: 'none' }} />
          <img id="crawlZomb2" src={crawlZomb2} style={{ display: 'none' }} />
          <img id="crawlZomb3" src={crawlZomb3} style={{ display: 'none' }} />
          <img id="zomb" src={zomb} style={{ display: 'none' }} />
          <img id="roughZomb" src={roughZomb} style={{ display: 'none' }} />
          <img id="splat" src={splat} style={{ display: 'none' }} />
          <img id="upgradeSign" src={upgradeSign} style={{ display: 'none' }} />
        </div>
        <canvas ref={this.canvasRef} style={{ backgroundColor: '#333333', cursor: 'crosshair' }}></canvas>
      </div>
    )
  }
}
