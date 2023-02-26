import { Weapons } from "./Zomboozled.interface";

export const GAME_WRAPPER_ID = 'game-wrapper';

export const PLAYER_SPEED = 5;

//input keycodes
export const KEY = {
    BACKSPACE: 8,
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    SPACE: 32,
    PAGEUP: 33,
    PAGEDOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    TILDA: 192
};

export const GAME_STATES = {
    START: 1,
    IN_GAME: 2,
    GAME_OVER: 3
};

export const WEAPONS: Weapons = {
    BAT : {
        id: 'bat',
        ammoString: 'AMMO: N/A',
        ammoCount: 999999,
        standingSprite: document.getElementById('bat'),
        swingingSprite: document.getElementById('batSwing'),
    },
    PISTOL : {
        id: 'pistol',
        ammoString: 'AMMO: | | | | | | ',
        ammoCount: 6,
        standingSprite: document.getElementById('onePistol'),
        shootingSprite: document.getElementById('onePistolFire'),
    },
    TWOPISTOLS : {
        id: 'twoPistols',
        ammoString: 'AMMO: | | | | | | | | | | | | ',
        ammoCount: 12,
        standingSprite: document.getElementById('twoPistols'),
        shootingSpriteL: document.getElementById('twoPistolsFireL'),
        shootingSpriteR: document.getElementById('twoPistolsFireR'),
    }
};

export const getRandomSpawnXY = (width: number, height: number, canvasWidth: number, canvasHeight: number) => {
    const pair = { x: 0, y: 0 }
    switch(Math.floor((Math.random() * 4) + 1)){
        case 1: //left
            pair.x = (-width)-10;
            pair.y = Math.floor((Math.random() * canvasHeight) + 1);
        break;
        case 2: //top
            pair.x = Math.floor((Math.random() * canvasWidth) + 1);
            pair.y = (-height)-10;
        break;
        case 3: //right
            pair.x = canvasWidth+10;
            pair.y = Math.floor((Math.random() * canvasHeight) + 1);
        break;
        case 4: //bottom
            pair.x = Math.floor((Math.random() * canvasWidth) + 1);
            pair.y = canvasHeight+10;
        break;
    }
    return pair;
}