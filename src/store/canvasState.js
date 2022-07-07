import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  _haveUndo = false;
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  get haveUndo() {
    return this._haveUndo;
  }
  setHaveUndo(val) {
    this._haveUndo = val;
  }
  get haveRedo() {
    return this.redoList.length > 0;
  }

  pushToUndoList(data) {
    // this.undoList.push(this.canvas.toDataURL());
    this.undoList.push(data);
    if (!this.haveUndo) this.setHaveUndo(true);
  }
  pushToRedoList(data) {
    this.redoList.push(data);
  }

  undo() {
    const ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      const img = new Image();
      this.pushToRedoList(this.canvas.toDataURL())
      img.src = this.undoList.pop();
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.setHaveUndo(false);
    }

  }
  redo() {
    const ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      const img = new Image();
      this.pushToUndoList(this.canvas.toDataURL())
      img.src = this.redoList.pop();
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
}

export default CanvasState;
