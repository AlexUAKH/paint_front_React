import React, { useContext, useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Brush from "../tools/brush";

const Canvas = observer(() => {
  const { canvas, tool } = useContext(Context);
  const canvasRef = useRef(null);

  useEffect(() => {
    canvas.setCanvas(canvasRef.current);
    tool.setTool(new Brush(canvasRef.current))
  }, [])

  const mouseDownHandler = () => {
    canvas.pushToUndoList(canvasRef.current.toDataURL());
  }

  return (
    <div className="canvas _container">
      <canvas ref={canvasRef} width={600} height={400} onMouseDown={() => mouseDownHandler()}/>
    </div>
  );
});

export default Canvas;
