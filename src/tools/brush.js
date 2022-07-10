import Tool from "./tool";

export default class Brush extends Tool {
  constructor(canvas, socketService) {
    super(canvas, socketService);
  }

  mouseUpHandler() {
    super.mouseUpHandler();
    this.socketService.sendFinish();
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      const figure = {
        type: 'brush',
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop,
        color: this.ctx.strokeStyle,
        lineWidth: this.ctx.lineWidth
      }
      this.socketService.sendDraw(figure);
    }
  }

  static draw(ctx, x, y, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}