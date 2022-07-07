import Tool from "./tool";

export default class Rectangle extends Tool {
  constructor(canvas, color) {
    super(canvas, color);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const width = e.pageX - e.target.offsetLeft - this.startX;
      const height = e.pageY - e.target.offsetTop - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x, y, width, height) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}