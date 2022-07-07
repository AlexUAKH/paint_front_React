import Brush from "./brush";

export default class Eraser extends Brush {
  constructor(canvas) {
    super(canvas);
  }
  draw(x, y) {
    this.ctx.strokeStyle = "white";
    super.draw(x, y);
  }
}