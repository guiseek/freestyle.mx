export class Vector2 {
  constructor(public x = 0, public y = 0) {}

  add(vec: Vector2) {
    this.x += vec.x
    this.y += vec.y
  }
}
