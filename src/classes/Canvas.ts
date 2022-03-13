export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  #color: string | CanvasGradient | CanvasPattern = "black";
  background: string | CanvasGradient | CanvasPattern = "white";

  constructor(
    canvasElement: HTMLElement | null,
    width?: number,
    height?: number
  ) {
    if (canvasElement instanceof HTMLCanvasElement) {
      this.canvas = canvasElement;
    } else {
      throw new Error("Failed to get canvas element");
    }

    this.ctx = this.canvas.getContext("2d")!;
    if (!(this.ctx instanceof CanvasRenderingContext2D)) {
      throw new Error("Failed to get 2D context");
    }

    if (width) {
      this.canvas.width = width;
    }
    if (height) {
      this.canvas.height = height;
    }

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  get color() {
    return this.#color;
  }
  set color(color: string | CanvasGradient | CanvasPattern) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.#color = color;
  }

  clear() {
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.#color;
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  fillCircle(x: number, y: number, r: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  fillRect(x: number, y: number, w: number, h: number) {
    this.ctx.fillRect(x, y, w, h);
  }
}
