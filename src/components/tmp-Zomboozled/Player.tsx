import { WEAPONS } from "./Zomboozled.const";

export default class Player {

    batSwingSound = new Audio('./sounds/swing.mp3');
    batSwingHitSound = new Audio('./sounds/swingHit.mp3');
    weapon: any = WEAPONS.BAT;
    swinging = false;
    degrees = 0;
	width = 0;
	height = 0;
	image = document.getElementById('bat');
	x: any = null;
	y: any = null;
    killCount = 0;
    dead = false;
	input = { up: false, down: false, left: false, right: false, space: false }
    
    constructor(width: any, height: any, x: any, y: any) {
        console.log('Player created');
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    checkForGunUpgrade() {
        switch(this.killCount){
            case 3:
                this.width = 100;
                this.height = 125;
                this.weapon = WEAPONS.PISTOL;
                HUD.ammoCount = this.weapon.ammoCount;
                HUD.ammoString = this.weapon.ammoString;
                HUD.upgrade = true;
                break;                
            case 10:
                this.weapon = WEAPONS.TWOPISTOLS;
                HUD.ammoCount = this.weapon.ammoCount;
                HUD.ammoString = this.weapon.ammoString;
                HUD.upgrade = true;
                break;
        }
    }
}