import Game from "./Game";
import Player from "./Player";
import { GAME_STATES } from "./Zomboozled.const";

export default class HUD {

    upgrade = false;
    signCounter = -200;
    upgradeSign = -200;
    ammoString = '';
    ammoCount = 0;
    game: Game;
    player: Player;
    context: any;

    constructor(game: any, player: Player) {
        console.log(`HUD created`);
        this.ammoString = player.weapon.ammoString;
        this.ammoCount = player.weapon.ammoCount;
        this.game = game;
        this.player = player;
        this.context = this.game.context;
    }

    update(){
		this.context = this.game.context;
		this.context.fillStyle = "white";
		this.context.font = "40px Impact";
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
        if(this.game.state==GAME_STATES.START){
            this.context.fillText('HIT SPACE TO DIE',this.game.canvas.width / 2,(this.game.canvas.height/2));
            this.context.fillText('Zomboozled (c) Nate Pratt 2017',this.game.canvas.width / 2,(this.game.canvas.height - 100));
        }
        else if(this.game.state==GAME_STATES.IN_GAME){
			this.context.textBaseline = "top";
            this.context.fillText(this.ammoString,this.game.canvas.width / 2, 5);
            this.context.fillText('Kills: ' + player1.killCount,this.game.canvas.width / 2, 50);
            if(displayControls){
                this.context.fillText('-USE WASD                  TO MOVE',this.game.canvas.width / 2 - 20, (this.game.canvas.height/2));
                this.context.fillText('-USE THE MOUSE TO AIM',this.game.canvas.width / 2, (this.game.canvas.height/2)+55);
                this.context.fillText('-CLICK TO ATTACK', this.game.canvas.width / 2, (this.game.canvas.height/2)+110);
                this.context.fillText('-SURVIVE', this.game.canvas.width / 2, (this.game.canvas.height/2)+165);
            }            
        }
        else if(this.game.state==GAME_STATES.GAME_OVER){
            this.context.fillText("GAME OVER",this.game.canvas.width / 2,(this.game.canvas.height/2));
            this.context.fillText('KILLS: ' + player1.killCount,this.game.canvas.width / 2,(this.game.canvas.height/2)+50);
            this.context.fillText('HIT SPACE TO DIE AGAIN',this.game.canvas.width / 2,(this.game.canvas.height/2)+150);
        }
        if(this.upgrade){
            this.signCounter += 10;
            this.context.drawImage(document.getElementById('upgradeSign'), (this.game.canvas.width / 2)-200, this.upgradeSignY, 400, 200);
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