/**
*
* Thanks to https://gist.github.com/edwerner/3446102 for the following
* I've converted it to ES6 class format to fit with this code base
*
*/ 

export default class Vector2 {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.DEGRAD = 0;
  }

  getX() {
    return this.x;
  };

  setX(x) {
    this.x = x;
  };

  getY() {
    return this.y;
  };

  setY(y) {
    this.y = y;
  };

  // ------------------- public methods ------------------- //

  add(vector) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  };

  subtract(vector) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  };

  multiply(vector) {
    return new Vector2(this.x * vector.x, this.y * vector.y);
  };

  divide(vector) {
    return new Vector2(this.x / vector.x, this.y / vector.y);
  };

  distance(vector) {
    var deltaX = this.x - vector.x;
    var deltaY = this.y - vector.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  distanceSqr(vector) {
    var deltaX = this.x - vector.x;
    var deltaY = this.y - vector.y;
    return (deltaX * deltaX + deltaY * deltaY);
  };

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  normalize() {
    var mag = Math.sqrt(this.x * this.x + this.y * this.y);

    if (mag === 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x = this.x / mag;
      this.y = this.y / mag;
    }
  };

  getNormalized() {
    var mag = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Vector2(this.x / mag, this.y / mag);
  };

  getAngle() {
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  };

  degToVec(deg) {
    var rad = deg * DEGRAD;
    return new Vector2(Math.cos(rad), Math.sin(rad));
  };

  radToVec() {
    return new Vector2(Math.sin(rad), Math.cos(rad));
  };

  // ---------------- additional vector methods ---------------- //

  dot(vector) {
    return (this.x * vector.x + this.y * vector.y);
  };

  rotate(deg) {
    var rad = deg * DEGRAD;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    this.x = this.x * cos - this.y * sin;
    this.y = this.y * cos + this.x * sin;
  };

  perpRight() {
    return new Vector2(-this.y, this.x);
  };

  toString() {
    return ("x : " + parseInt(this.x * 100) / 100 + ", \ty : " + parseInt(this.y * 100) / 100);
  };
  
}
