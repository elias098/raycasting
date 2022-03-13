import Ray from "./Ray";
import Vector from "./Vector";

export default class Caster {
  rays: Ray[] = [];
  pos: Vector;
  fov: number;
  #angle: number;
  projectionPlane: number;

  rayCount: number;

  constructor(pos: Vector, fov: number, rayCount: number) {
    this.pos = pos;
    this.fov = fov;
    this.rayCount = rayCount;

    this.projectionPlane =
      this.rayCount / 2 / Math.tan(((this.fov / 2) * Math.PI) / 180);

    this.#angle = 0;
    for (let i = this.rayCount; i > 0; i--) {
      const a =
        this.angle +
        Math.atan((i - this.rayCount / 2) / this.projectionPlane) *
          (180 / Math.PI);
      this.rays.push(new Ray(this.pos, a));
    }
    /*for (
      let i = this.fov / 2;
      i > -this.fov / 2;
      i -= this.fov / this.rayCount
    ) {
      this.rays.push(new Ray(this.pos, i + this.angle));
    }*/
    /*for (
      let i = Math.floor(this.angle + this.fov / 2);
      i > Math.floor(this.angle - this.fov / 2);
      i -= this.fov / this.rayCount
    ) {
      this.rays.push(new Ray(this.pos, i));
    }*/
    /*for (
      let i = Math.floor(this.angle + this.fov / 2);
      i > Math.floor(this.angle - this.fov / 2);
      i--
    ) {
      this.rays.push(new Ray(this.pos, i));
    }*/
  }

  get angle() {
    return this.#angle;
  }

  set angle(angle) {
    for (const ray of this.rays) {
      ray.angle += angle - this.#angle;
    }
    this.#angle = angle;
  }

  update() {
    for (const ray of this.rays) {
      ray.update();
    }
  }
}
