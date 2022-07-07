import { makeAutoObservable } from "mobx";

class ToolState {
  _tool = null;
  _strokeColor = "#000000";
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this._tool = tool;
  }

  setStrokeColor(color) {
    this._tool.strokeColor = color;
    this._strokeColor = color;
  }
  get strokeColor() {
    return this._strokeColor;
  }
  setFillColor(color) {
    this._tool.fillColor = color;
  }
  setLineWidth(width) {
    this._tool.lineWidth = width;
  }
}

export default ToolState;
