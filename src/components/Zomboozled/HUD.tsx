import Player from "./Player";
import { GAME_STATES } from "./Zomboozled.const";

export default class HUD {

    displayControls = true;
    upgrade = false;
    signCounter = -200;
    upgradeSignY = -200;
    ammoString = '';
    ammoCount = 0;

    upgradeSignImg: HTMLImageElement;

    constructor() {
        console.log(`HUD created`);
        this.upgradeSignImg = document.getElementById('upgradeSign') as HTMLImageElement;
    }

    update(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, player: Player, gameState: number){
		context.fillStyle = "white";
		context.font = "40px Impact";
		context.textAlign = "center";
		context.textBaseline = "middle";
        if(gameState === GAME_STATES.START){
            context.fillText('HIT SPACE TO DIE',canvas.width / 2,(canvas.height/2));
            context.fillText('Zomboozled (c) Nate Pratt 2017',canvas.width / 2,(canvas.height - 100));
        }
        else if(gameState === GAME_STATES.IN_GAME){
			context.textBaseline = "top";
            context.fillText(this.ammoString,canvas.width / 2, 5);
            context.fillText('Kills: ' + player.killCount,canvas.width / 2, 50);
            if(this.displayControls){
                context.fillText('-USE WASD                  TO MOVE',canvas.width / 2 - 20, (canvas.height/2));
                context.fillText('-USE THE MOUSE TO AIM',canvas.width / 2, (canvas.height/2)+55);
                context.fillText('-CLICK TO ATTACK', canvas.width / 2, (canvas.height/2)+110);
                context.fillText('-SURVIVE', canvas.width / 2, (canvas.height/2)+165);
            }            
        }
        else if(gameState === GAME_STATES.GAME_OVER){
            context.fillText("GAME OVER",canvas.width / 2,(canvas.height/2));
            context.fillText('KILLS: ' + player.killCount,canvas.width / 2,(canvas.height/2)+50);
            context.fillText('HIT SPACE TO DIE AGAIN',canvas.width / 2,(canvas.height/2)+150);
        }
        if(this.upgrade){
            this.signCounter += 10;
            context.drawImage(this.upgradeSignImg, (canvas.width / 2)-200, this.upgradeSignY, 400, 200);
            if(this.signCounter <= 0){
                this.upgradeSignY = this.signCounter;
            } else if(this.signCounter > 1000){
                this.upgradeSignY -= 10;
            }
            if(this.upgradeSignY == -200){
                this.signCounter = -200;
                this.upgrade = false;
            }
        }
	}
}