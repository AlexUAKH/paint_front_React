import Tool from "./tool";

export default class Rectangle extends Tool {
  constructor(canvas, socket, id, socketService) {
    super(canvas, socket, id, socketService);
  }

  mouseUpHandler() {
    super.mouseUpHandler();
    const figure = {
      type: 'rect',
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height,
      fillColor: this.ctx.fillStyle,
      strokeColor: this.ctx.strokeStyle,
      lineWidth: this.ctx.lineWidth
    }
    this.socketService.sendDraw(figure);
    this.socketService.sendFinish();
    // this.sendToSocket(figure);
    // this.sendToSocket({type: 'finish'});
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.width = e.pageX - e.target.offsetLeft - this.startX;
      this.height = e.pageY - e.target.offsetTop - this.startY;
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
      this.ctx.rect(this.startX, this.startY, this.width, this.height);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  static draw(ctx, x, y, width, height, fillColor, strokeColor, lineWidth) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
  }
}