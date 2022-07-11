import Brush from "./brush";

export default class Eraser extends Brush {

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const figure = {
        type: 'eraser',
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop,
        lineWidth: this.ctx.lineWidth
      }
      this.socketService.sendDraw(figure);
    }
  }

  static draw(ctx, x, y, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "white";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}