import Game from "./Game";
import Player from "./Player";
import { GAME_STATES, getRandomSpawnXY } from "./Zomboozled.const";

export default class Zombie {
    degrees = 0;
	width = 0;
	height = 0;
	image = null;
	x = 0;
	y = 0;
    health = 3;
    shot = false;
    cX = 0;
    cY = 0;
    dead = false;
    type = null;

    slowDown = 0;
    frameCountUp = true;
    frameNum = 0;

    game: Game;
    player: Player;
    
    constructor(game: Game, player: Player, width: any, height: any, x: any, y: any, image: any, type: any) {
        console.log(`Zombie created`);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = image;
        this.type = type || 'ns';
        this.game = game;
        this.player = player;
    }

    update() {
        this.slowDown++;
        if(this.type=='crawl' && this.slowDown % 15 == 0 ){
            const imgStr = 'crawlZomb' + this.frameNum;
            this.image = document.getElementById(imgStr);
            if(this.frameCountUp) this.frameNum++;
            else this.frameNum--;
            if(this.frameNum==3 || this.frameNum==0){
                this.frameCountUp = !this.frameCountUp;
            }
            //this.findPlayer();
        }
        if(this.slowDown==16) this.slowDown = 0;
        if(!this.dead) this.findPlayer();

        this.game.context.save();

        this.game.context.translate(this.x, this.y); 
        
        this.game.context.translate(this.width/2, this.height/2); 
        
        this.game.context.rotate(this.degrees*Math.PI/180); 
        
        this.game.context.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height); 
        
        this.game.context.restore();

        if(this.shot) {
            displayControls = false;
            if(this.dead) this.game.context.drawImage(document.getElementById('splat'), this.cX-75, this.cY-75, 150, 150);
            else this.game.context.drawImage(document.getElementById('splat'), this.cX-20, this.cY-20, 40, 40);            
        }
    }

    findPlayer() {
        if(this.player.x < this.x) this.x-=0.5;
        else if(this.player.x > this.x) this.x+=0.5;
        if(this.player.y < this.y) this.y-=0.5;
        else if(this.player.y > this.y) this.y+=0.5;
        const zx = this.x+(this.width/2);
        const zy =  this.y+(this.height/2);
        const pw = this.player.width!;
        const ph = this.player.height!;
        const px = this.player.x+(this.player.width!/2);
        const py = this.player.y+(this.player.height!/2);
        this.degrees = Math.atan2(px - zx,-(py - zy) )*(180/Math.PI);
        let collision;
        if (this.player.weapon.id=='bat') collision = Math.abs(zx-px) < pw/2 && Math.abs(zy-py) < (ph/2) ;
        else collision = Math.abs(zx-px) < pw/2 && Math.abs(zy-py) < ph/2;
        if(collision){
            this.player.dead = true;
            this.game.state = GAME_STATES.GAME_OVER;
        }
    }


    checkShot(clickX: any, clickY: any) {
        const midX = this.x+(this.width/2);
        const midY = this.y+(this.height/2);
        let shot = Math.abs(clickX-midX) < this.width/2 && Math.abs(clickY-midY) < this.height/2;
        const tmp = Math.abs((this.player.x+(this.player.width!/2)) - midX);
        if(this.player.weapon.id=='bat') shot = shot && tmp < 180;
        if(shot){
            this.player.batSwingHitSound.play();
            this.health--;
            this.cX = clickX;
            this.cY = clickY;
            this.shot = true;
            if(this.health==0){
                this.player.killCount++;
                this.player.checkForGunUpgrade();
                this.dead = true;
                let pair = getRandomSpawnXY(this.player.width, this.player.height, this.game.canvas.width, this.game.canvas.height);
                this.x = pair.x;
                this.y = pair.y;
                pair = getRandomSpawnXY(this.player.width, this.player.height, this.game.canvas.width, this.game.canvas.height);
                // FIX ME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // const thisOrThat = Math.floor((Math.random()*6) + 1);
                // if(zombies.length < 1000 && thisOrThat==1) zombies.push(new zombie(playerWidth, playerHeight, pair.x, pair.y, document.getElementById('roughZomb')));
                // else if(zombies.length < 1000 && thisOrThat==2) zombies.push(new zombie(playerWidth, playerHeight, pair.x, pair.y, document.getElementById('zomb')));
                // else if(zombies.length < 1000 && thisOrThat==3) zombies.push(new zombie(playerWidth, playerHeight, pair.x, pair.y, document.getElementById('roughZomb')));
            }
        }
    }
}