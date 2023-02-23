export default class Game {

    canvas: HTMLCanvasElement;
    context: any;
    start: any;
    clear: any;
    state: any;
    frameNo: any;
    interval: any;

    constructor(canvas: HTMLCanvasElement, start: any, clear: any, state: any) {
        console.log(`Game created`);
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.start = start;
        this.clear = clear;
        this.state = state;
    }
}