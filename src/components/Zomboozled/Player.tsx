import { WEAPONS } from "./Zomboozled.const";
import { Weapon } from "./Zomboozled.interface";

export default class Player {

    // batSwingSound = new Audio('./sounds/swing.mp3');
    // batSwingHitSound = new Audio('./sounds/swingHit.mp3');
    weapon: Weapon = WEAPONS.BAT;
    swinging = false;
    degrees = 0;
	width = 0;
	height = 0;
	image = document.getElementById('bat');
	x: number;
	y: number;
    killCount = 0;
    dead = false;
	input = { up: false, down: false, left: false, right: false, space: false }
    
    constructor(width: number, height: number, x: number, y: number) {
        console.log('Player created');
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
    
    update(context: CanvasRenderingContext2D) {
        const img = this.image as HTMLCanvasElement;
        if (!img) throw 'Error updating player, image was null';
        context.save(); 
        if(this.weapon.id=='bat') context.translate(this.x, this.y);
        else context.translate(this.x, this.y); 
        
        context.translate(this.width/2, this.height/2); 
        
        context.rotate(this.degrees*Math.PI/180); 
        if(this.weapon.id=='bat') context.drawImage(img, -this.width/2, (-this.height/2)-100, this.width, this.height);
        else context.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
        // context.strokeStyle = '#ff0000';
        // context.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
        // context.strokeStyle = '#ff0000';
        // context.strokeRect(-this.width/2, -this.height/2, 4, 4);

        context.restore();
    }
}