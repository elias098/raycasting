import { boundaries } from "../map";
import Boundary from "./Boundary";
import Vector from "./Vector";

export default class Ray {
  point: Vector | undefined;
  distance: number | undefined;
  pos: Vector;
  dir: Vector;
  #angle: number;

  constructor(pos: Vector, angle: number) {
    this.pos = pos;
    this.#angle = angle;

    this.dir = Vector.fromAngle(angle);

    this.update();
  }

  get angle() {
    return this.#angle;
  }

  set angle(angle: number) {
    this.#angle = angle;
    this.dir = Vector.fromAngle(angle);
    //angle = (angle * Math.PI) / 180;
    //this.dir.x = Math.sin(angle) + this.pos.x;
    //this.dir.y = Math.cos(angle) + this.pos.y;
  }

  update() {
    let distance = Infinity;
    let point = undefined;
    for (const boundary of boundaries) {
      const pt = this.cast(boundary);

      if (pt) {
        //const d = Math.hypot(this.pos.x - pt.x, this.pos.y - pt.y);
        const d = Math.hypot(pt.x - this.pos.x, pt.y - this.pos.y);
        if (d < distance) {
          distance = d;
          point = pt;
        }
      }
    }
    this.point = point;
    this.distance = point ? Vector.dist(point, this.pos) : undefined;
  }

  cast(boundary: Boundary): Vector | undefined {
    const x1 = boundary.x1;
    const y1 = boundary.y1;
    const x2 = boundary.x2;
    const y2 = boundary.y2;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t >= 0 && t <= 1 && u >= 0) {
      //return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
      return new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    } else {
      return;
    }
  }
}
