import Player from "./Player";

export default class Zombie {
    degrees = 0;
	width = 0;
	height = 0;
	x = 0;
	y = 0;
    health = 3;
    shot = false;
    cX = 0;
    cY = 0;
    dead = false;
    type;

    slowDown = 0;
    frameCountUp = true;
    frameNum = 0;

    killedPlayer = false;

	image: HTMLImageElement;
    
    constructor(width: number, height: number, x: number, y: number, type: string) {
        console.log(`Zombie created`);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = document.getElementById("crawlZomb0") as HTMLImageElement;
        this.type = type || 'ns';
    }

    update(context: CanvasRenderingContext2D, player: Player) {
        this.slowDown++;
        if(this.type=='crawl' && this.slowDown % 15 == 0 ){
            const imgStr = 'crawlZomb' + this.frameNum;
            this.image = document.getElementById(imgStr) as HTMLImageElement;
            if(this.frameCountUp) this.frameNum++;
            else this.frameNum--;
            if(this.frameNum==3 || this.frameNum==0){
                this.frameCountUp = !this.frameCountUp;
            }
        }
        if(this.slowDown==16) this.slowDown = 0;
        if(!this.dead) this.findPlayer(player);

        context.save();

        context.translate(this.x, this.y); 
        
        context.translate(this.width/2, this.height/2); 
        
        context.rotate(this.degrees*Math.PI/180); 
        
        context.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height); 
        
        context.restore();

        // if(this.shot) {
        //     displayControls = false;
        //     if(this.dead) context.drawImage(document.getElementById('splat'), this.cX-75, this.cY-75, 150, 150);
        //     else context.drawImage(document.getElementById('splat'), this.cX-20, this.cY-20, 40, 40);            
        // }
    }

    findPlayer(player: Player) {
        if(player.x < this.x) this.x-=0.5;
        else if(player.x > this.x) this.x+=0.5;
        if(player.y < this.y) this.y-=0.5;
        else if(player.y > this.y) this.y+=0.5;
        const zx = this.x+(this.width/2);
        const zy =  this.y+(this.height/2);
        const pw = player.width;
        const ph = player.height;
        const px = player.x+(player.width/2);
        const py = player.y+(player.height/2);
        this.degrees = Math.atan2(px - zx,-(py - zy) )*(180/Math.PI);
        let collision;
        if (player.weapon.id=='bat') collision = Math.abs(zx-px) < pw/2 && Math.abs(zy-py) < (ph/2) ;
        else collision = Math.abs(zx-px) < pw/2 && Math.abs(zy-py) < ph/2;
        if(collision){
            this.killedPlayer = true;
        }
    }
}