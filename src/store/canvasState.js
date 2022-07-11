import { makeAutoObservable } from "mobx";

class CanvasState {
  _canvas = null;
  _ctx = null;
  _socketService = null;
  _undoList = [];
  _redoList = [];
  _socket = null;
  _sessionId = null;
  _haveUndo = false;
  _username = '';
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
  }
  get canvas() {
    return this._canvas;
  }
  get ctx() {
    return this._ctx;
  }
  setSocketService(service) {
    this._socketService = service;
  }
  get socketService() {
    return this._socketService;
  }
  setSocket(socket) {
    this._socket = socket;
  }
  get socket() {
      return this._socket;
  }

  setSessionId(id) {
    this._sessionId = id;
  }
  get sessionId() {
    return this._sessionId;
  }

  setUsername(username) {
    this._username = username;
  }
  get username() {
    return this._username;
  }
  get haveUndo() {
    return this._haveUndo;
  }
  setHaveUndo(val) {
    this._haveUndo = val;
  }
  get haveRedo() {
    return this._redoList.length > 0;
  }

  pushToUndoList(data) {
    // this.undoList.push(this.canvas.toDataURL());
    this._undoList.push(data);
    if (!this.haveUndo) this.setHaveUndo(true);
  }
  pushToRedoList(data) {
    this._redoList.push(data);
  }

  undo() {
    if (this._undoList.length > 0) {
      const img = new Image();
      this.pushToRedoList(this.canvas.toDataURL())
      img.src = this._undoList.pop();
      img.onload = () => {
        this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    } else {
      this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.setHaveUndo(false);
    }
  }
  redo() {
    if (this._undoList.length > 0) {
      const img = new Image();
      this.pushToUndoList(this.canvas.toDataURL())
      img.src = this._redoList.pop();
      img.onload = () => {
        this.clearCanvas();
        this._ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  clearCanvas() {
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default new CanvasState();
