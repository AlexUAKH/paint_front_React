import React, { useContext, useState } from "react";
import "../styles/toolbar.scss";
import Brush from "../tools/brush";
import { Context } from "../index";
import Rectangle from "../tools/rectangle";
import Eraser from "../tools/eraser";
import Circle from "../tools/circle";
import Line from "../tools/line";
import { observer } from "mobx-react-lite";

const ToolBar = observer(() => {
  const { canvas, tool } = useContext(Context);
  const [active, setActive] = useState('brush');

  const setActiveTool = (name) => {
    switch (name) {
      case "brush":
        tool.setTool(new Brush(canvas.canvas));
        break;
      case "rect":
        tool.setTool(new Rectangle(canvas.canvas));
        break;
      case "circle":
        tool.setTool(new Circle(canvas.canvas));
        break;
      case "eraser":
        tool.setTool(new Eraser(canvas.canvas));
        break;
      case "line":
        tool.setTool(new Line(canvas.canvas));
        break;
    }
    setActive(name);
  }

  const save = () => {
    const img = canvas.canvas.toDataURL();
    const a = document.createElement("a");
    a.href = img;
    a.download = "saved.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="toolbar tool">
      <div className="wrapper _container">
        <div className="toolbar__draw">
          <button className={`toolbar__btn brush ${active === "brush" ? "active" : ""}`} onClick={() => setActiveTool('brush')} />
          <button className={`toolbar__btn rect ${active === "rect" ? "active" : ""}`} onClick={() => setActiveTool('rect')} />
          <button className={`toolbar__btn circle ${active === "circle" ? "active" : ""}`} onClick={() => setActiveTool('circle')} />
          <button className={`toolbar__btn eraser ${active === "eraser" ? "active" : ""}`} onClick={() => setActiveTool('eraser')} />
          <button className={`toolbar__btn line ${active === "line" ? "active" : ""}`} onClick={() => setActiveTool('line')}  />
        </div>
        <div className="toolbar__options">
          <button className="toolbar__btn undo" disabled={!canvas.haveUndo} onClick={() => canvas.undo()} />
          <button className="toolbar__btn redo" disabled={!canvas.haveRedo} onClick={() => canvas.redo()} />
          <button className="toolbar__btn save" onClick={() => save()}/>
        </div>
      </div>
    </div>
  );
});

export default ToolBar;
