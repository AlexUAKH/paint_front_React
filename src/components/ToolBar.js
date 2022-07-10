import React, { useContext, useState } from "react";
import "../styles/toolbar.scss";
import Brush from "../tools/brush";
import Rectangle from "../tools/rectangle";
import Eraser from "../tools/eraser";
import Circle from "../tools/circle";
import Line from "../tools/line";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const tools = ['brush', 'rect', 'circle', 'eraser', 'line'];

const ToolBar = observer(() => {
  const { canvas, tool } = useContext(Context);
  const [active, setActive] = useState('');

  const setActiveTool = (name) => {
    switch (name) {
      case "brush":
        tool.setTool(new Brush(canvas.canvas, canvas.socketService));
        break;
      case "rect":
        tool.setTool(new Rectangle(canvas.canvas, canvas.socketService));
        break;
      case "circle":
        tool.setTool(new Circle(canvas.canvas, canvas.socketService));
        break;
      case "eraser":
        tool.setTool(new Eraser(canvas.canvas, canvas.socketService));
        break;
      case "line":
        tool.setTool(new Line(canvas.canvas, canvas.socketService));
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
          {
            tools.map(tool => (
              <button
                key={tool}
                className={`toolbar__btn ${tool} ${active === tool ? "active" : ""}`}
                onClick={() => setActiveTool(tool)}
              />
            ))
          }
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
