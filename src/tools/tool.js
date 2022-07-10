export default class Tool {
  constructor(canvas, socketService) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.socketService = socketService;
    // this.destroyEvents();
    this.listen();
  }

  set fillColor(color) {
    this.ctx.fillStyle = color;
  }
  set strokeColor(color) {
    this.ctx.strokeStyle = color;
  }
  set lineWidth(width) {
    this.ctx.lineWidth = width;
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.beginPath();
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {}
  // destroyEvents() {
  //   this.canvas.onmouseup = null;
  //   this.canvas.onmousedown = null;
  //   this.canvas.onmousemove = null;
  // }
}