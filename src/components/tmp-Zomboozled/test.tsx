import React, { Component } from 'react'

export default class test extends Component {

    canvas = document.getElementById('game-canvas');


    startGame() {
        const self = this;
        this.myGame.canvas.width = this.canvasWidth;
        this.myGame.canvas.height = this.canvasHeight;
        this.myGame.context = this.myGame.canvas.getContext("2d");
        document.body.insertBefore(this.myGame.canvas, document.body.childNodes[0]);
        this.myGame.frameNo = 0;
        this.myGame.interval = setInterval(this.updateGame, 10);
        this.myGame.canvas.addEventListener('mousemove', function (ev: any) { self.determinePlayerRotation(ev); });
        this.myGame.canvas.addEventListener('mousedown', function (ev: any) { self.shoot(ev, { down: true }); });
        this.myGame.canvas.addEventListener('contextmenu', function (ev: any) { ev.preventDefault(); return false; });
        this.myGame.canvas.addEventListener('onDrag', function (ev: any) { ev.preventDefault(); });
    }
    
    updateGame() {
        this.myGame.clear();
    
        this.HUD.update();
    
        if (this.myGame.state == GAME_STATES.IN_GAME) {
            this.determinePlayerMovement();
            this.player.update();
            for (let i = 0; i < this.zombies.length; i++) {
                this.zombies[i].update()
                if (this.zombies[i].dead) {
                    const zx = this.zombies[i].x;
                    const zy = this.zombies[i].y;
                    const self = this;
                    setTimeout(function () { self.resetZombie(zx, zy) }, 2000);
                }
            }
        }
    }

    render() {
        return (
            <div>
                <canvas id='game-canvas'>

                </canvas>
            </div>
        )
    }
}
