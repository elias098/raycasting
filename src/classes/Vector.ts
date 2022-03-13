export default class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromAngle(angle: number, length: number = 1): Vector {
    angle = (angle * Math.PI) / 180;
    return new this(length * Math.sin(angle), length * Math.cos(angle));
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  normalize() {
    const len = this.mag;

    if (len !== 0) this.mult(1 / len);
    return this;
  }

  add(x: Vector | number, y?: number) {
    if (x instanceof Vector) {
      this.x += x.x;
      this.y += x.y;
    } else if (typeof y === "number") {
      this.x += x;
      this.y += y;
    } else {
      throw new Error("Insufficient arguments");
    }
    return this;
  }

  static add(v: Vector, x: Vector | number, y?: number) {
    return v.copy().add(x, y);
  }

  sub(x: Vector | number, y?: number) {
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (typeof y === "number") {
      this.x -= x;
      this.y -= y;
    } else {
      throw new Error("Insufficient arguments");
    }
    return this;
  }

  static sub(v: Vector, x: Vector | number, y?: number) {
    return v.copy().sub(x, y);
  }

  mult(x: Vector | number, y?: number) {
    if (x instanceof Vector) {
      this.x *= x.x;
      this.y *= x.y;
    } else if (typeof y === "undefined") {
      this.x *= x;
      this.y *= x;
    } else {
      this.x *= x;
      this.y *= y;
    }
    return this;
  }

  static mult(v: Vector, x: number | Vector, y?: number) {
    return v.copy().mult(x, y);
  }

  get mag() {
    return Math.hypot(this.x, this.y);
    //return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setMag(mag: number) {
    return this.normalize().mult(mag);
  }

  dist(v: Vector) {
    return v.copy().sub(this).mag;
  }

  static dist(v1: Vector, v2: Vector) {
    return v1.dist(v2);
  }
}
