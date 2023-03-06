import { playerHeight, playerWidth, PLAYER_SPEED, WEAPONS } from './Zomboozled.const';
import { Weapon } from './Zomboozled.interface';
import HUD from './HUD';

export default class Player {
  // batSwingSound = new Audio('./sounds/swing.mp3');
  // batSwingHitSound = new Audio('./sounds/swingHit.mp3');
  weapon: Weapon = WEAPONS.BAT;
  swinging = false;
  degrees = 0;
  width;
  height;
  image: HTMLImageElement;
  x: number;
  y: number;
  killCount = 0;
  dead = false;
  input = { up: false, down: false, left: false, right: false, space: false };

  constructor(width: number, height: number, x: number, y: number) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = document.getElementById('bat') as HTMLImageElement;
    console.log('Player created');
  }

  determineMovement(canvas: HTMLCanvasElement) {
    if (this.input.up && this.y > 0) {
      this.y -= PLAYER_SPEED;
    }
    if (this.input.down && this.y < canvas.height - this.height) {
      this.y += PLAYER_SPEED;
    }
    if (this.input.left && this.x > 0) {
      this.x -= PLAYER_SPEED;
    }
    if (this.input.right && this.x < canvas.width - this.width) {
      this.x += PLAYER_SPEED;
    }
  }

  checkForGunUpgrade(HUD: HUD) {
    switch (this.killCount) {
      case 1:
        this.width = playerWidth;
        this.height = playerHeight;
        this.weapon = WEAPONS.PISTOL;
        HUD.ammoCount = this.weapon.ammoCount;
        HUD.ammoString = this.weapon.ammoString;
        HUD.upgrade = true;
        break;
      case 3:
        this.weapon = WEAPONS.TWOPISTOLS;
        HUD.ammoCount = this.weapon.ammoCount;
        HUD.ammoString = this.weapon.ammoString;
        HUD.upgrade = true;
        break;
    }
    return HUD;
  }

  update(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.determineMovement(canvas);
    const img = this.image as HTMLImageElement;
    if (!img) throw 'Error updating player, image was null';
    context.save();
    if (this.weapon.id == 'bat') context.translate(this.x, this.y);
    else context.translate(this.x, this.y);

    context.translate(this.width / 2, this.height / 2);

    context.rotate((this.degrees * Math.PI) / 180);

    let w = this.width;
    let h = this.height;
    let x = -this.width / 2;
    let y = -this.height / 2;
    if (this.weapon.id == 'bat') {
      if (this.swinging) {
        w *= 0.48;
        h -= 0;
        x += Math.abs(x) * 0.53;
      }
      y -= 100;
      context.drawImage(img, x, y, w, h);
    } else {
      context.drawImage(img, x, y, w, h);
    }
    // context.strokeStyle = '#ff0000';
    // context.strokeRect(x, y, w, h);
    // context.strokeStyle = '#ff0000';
    // context.strokeRect(x + (w / 2) - 10, y + (h / 2) - 10, 20, 20);

    context.restore();
  }
}
