import Canvas from "./Canvas";
import Player from "./Player";
import { boundaries } from "../map";

export default class TopDown {
  element = document.getElementById("topDown");
  canvas = new Canvas(this.element, 400, 400);
  player: Player;

  constructor(player: Player) {
    this.player = player;

    this.canvas.color = "white";
    this.canvas.background = "black";
  }

  draw() {
    this.canvas.clear();

    for (const boundary of boundaries) {
      this.canvas.line(boundary.x1, boundary.y1, boundary.x2, boundary.y2);
    }

    this.canvas.color = "rgba(255, 255, 255, 0.3)";
    for (const ray of this.player.rays) {
      if (ray.point) {
        this.canvas.line(
          this.player.pos.x,
          this.player.pos.y,
          ray.point.x,
          ray.point.y
        );
        this.canvas.fillCircle(ray.point.x, ray.point.y, 5);
      }
    }
    this.canvas.color = "white";
  }
}
