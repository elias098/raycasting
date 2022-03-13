import Canvas from "./Canvas";
import Player from "./Player";

export default class FirstPerson {
  wallH: number = 50;

  element = document.getElementById("firstPerson");
  canvas = new Canvas(this.element, 400, 400);
  player: Player;
  projectionPlane: number;
  wallW: number;

  constructor(player: Player) {
    this.player = player;
    this.projectionPlane =
      player.rayCount / 2 / Math.tan(((player.fov / 2) * Math.PI) / 180);
    this.wallW = this.canvas.width / player.rayCount;

    this.canvas.background = "black";
  }

  draw() {
    this.canvas.clear();

    this.player.rays.forEach((ray, i) => {
      if (ray.point) {
        const a =
          ray.angle * (Math.PI / 180) - this.player.angle * (Math.PI / 180);
        const d = ray.distance! * Math.cos(a);

        const h = (this.wallH / d) * this.projectionPlane;

        this.canvas.color = `rgb(${255 - d}, ${255 - d}, ${255 - d})`;
        this.canvas.fillRect(
          i * this.wallW,
          this.canvas.height / 2 - h / 2,
          this.wallW,
          h
        );
        /*this.canvas.fillRect(
          i * this.wallW,
          d / 2,
          this.wallW,
          this.canvas.height - d
        );*/
      }
    });
  }
}
