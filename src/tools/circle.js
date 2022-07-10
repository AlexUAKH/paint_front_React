import Tool from "./tool";

export default class Circle extends Tool {
  constructor(canvas, socketService) {
    super(canvas, socketService);
  }

  mouseUpHandler() {
    super.mouseUpHandler();
    const figure = {
      type: 'circle',
      x: this.startX,
      y: this.startY,
      radius: this.radius,
      fillColor: this.ctx.fillStyle,
      strokeColor: this.ctx.strokeStyle,
      lineWidth: this.ctx.lineWidth
    }
    this.socketService.sendDraw(figure);
    this.socketService.sendFinish();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const deltaX = e.pageX - e.target.offsetLeft - this.startX;
      const deltaY = e.pageY - e.target.offsetTop - this.startY;
      this.radius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      this.preDraw();
    }
  }

  preDraw() {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(this.startX, this.startY, this.radius, 0, 360);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  static draw(ctx, x, y, radius, fillColor, strokeColor, lineWidth) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.arc(x, y, radius, 0, 360);
    ctx.fill();
    ctx.stroke();
  }
}