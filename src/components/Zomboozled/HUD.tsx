/* eslint-disable @typescript-eslint/no-this-alias */
import Player from './Player';
import { GAME_STATES } from './Zomboozled.const';

export default class HUD {
  signWidth = 400;
  signHeight = 200;
  displayControls = true;
  upgrade = false;
  signCounter = -this.signHeight;
  upgradeSignY = -this.signHeight;
  ammoString: string;
  ammoCount: number;

  upgradeSignImg: HTMLImageElement;

  constructor(player: Player, upgradeSignImg: HTMLImageElement) {
    console.log(`HUD created`);
    this.ammoString = player.weapon.ammoString;
    this.ammoCount = player.weapon.ammoCount;

    this.upgradeSignImg = upgradeSignImg;
  }

  update(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, player: Player, gameState: number) {
    context.fillStyle = 'white';
    context.font = '40px Impact';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    if (gameState === GAME_STATES.START) {
      context.fillText('HIT SPACE TO DIE', canvas.width / 2, canvas.height / 2);
      context.fillText('Zomboozled (c) Nate Pratt 2017', canvas.width / 2, canvas.height - 100);
    } else if (gameState === GAME_STATES.IN_GAME) {
      if (this.displayControls) {
        context.fillText('-USE WASD                  TO MOVE', canvas.width / 2 - 20, canvas.height / 2);
        context.fillText('-USE THE MOUSE TO AIM', canvas.width / 2, canvas.height / 2 + 55);
        context.fillText('-CLICK ON ZOMBIE TO ATTACK', canvas.width / 2, canvas.height / 2 + 110);
        context.fillText('-SURVIVE', canvas.width / 2, canvas.height / 2 + 165);
      }
      if (this.upgrade) {
        this.signCounter += 10;
        context.drawImage(this.upgradeSignImg, canvas.width / 2 - this.signHeight, this.upgradeSignY, this.signWidth, this.signHeight);
        if (this.signCounter <= 0) {
          this.upgradeSignY = this.signCounter;
        } else if (this.signCounter > 1000) {
          this.upgradeSignY -= 10;
        }
        if (this.upgradeSignY == -this.signHeight) {
          this.signCounter = -this.signHeight;
          this.upgrade = false;
        }
      }

      context.textBaseline = 'top';
      const paddingY = this.upgradeSignY + this.signHeight;
      context.fillText(this.ammoString, canvas.width / 2, 5 + paddingY);
      context.fillText('Kills: ' + player.killCount, canvas.width / 2, 50 + paddingY);
    } else if (gameState === GAME_STATES.GAME_OVER) {
      context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
      context.fillText('KILLS: ' + player.killCount, canvas.width / 2, canvas.height / 2 + 50);
      context.fillText('HIT SPACE TO DIE AGAIN', canvas.width / 2, canvas.height / 2 + 150);
    }
  }
}
