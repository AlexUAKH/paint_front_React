import Tool from "./tool";

export default class Line extends Tool {

  mouseUpHandler(e) {
    super.mouseUpHandler();
    const figure = {
      type: 'line',
      ax: this.startX,
      ay: this.startY,
      bx: this.targetX,
      by: this.targetY,
      color: this.ctx.strokeStyle,
      lineWidth: this.ctx.lineWidth
    }
    this.socketService.sendDraw(figure);
    this.socketService.sendFinish();
    this.targetX = e.pageX - e.target.offsetLeft;
    this.targetY = e.pageY - e.target.offsetTop;
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.targetX = e.pageX - e.target.offsetLeft;
      this.targetY = e.pageY - e.target.offsetTop;
      this.preDraw( this.targetX, this.targetY );
    }
  }

  preDraw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  static draw(ctx, ax, ay, bx, by, color, lineWidth) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }
}