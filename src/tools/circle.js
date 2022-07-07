import Tool from "./tool";

export default class Circle extends Tool {
  constructor(canvas, color) {
    super(canvas, color);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const deltaX = e.pageX - e.target.offsetLeft - this.startX;
      const deltaY = e.pageY - e.target.offsetTop - this.startY;
      const radius = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      this.draw(this.startX, this.startY, radius);
    }
  }

  draw(x, y, radius) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(this.startX, this.startY, radius, 0, 360);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}