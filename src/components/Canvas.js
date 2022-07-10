import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Brush from "../tools/brush";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import Rectangle from "../tools/rectangle";
import Circle from "../tools/circle";
import Eraser from "../tools/eraser";
import Line from "../tools/line";
import SocketService from "../services/socketService";

const Canvas = observer(() => {
  const [show, setShow] = useState(true);
  const { canvas, tool } = useContext(Context);
  const canvasRef = useRef(null);
  const router = useParams();

  useEffect(() => {
    canvas.setCanvas(canvasRef.current);
  }, [])

  useEffect(() => {
    if (!show) {
      const socket = new WebSocket("ws://localhost:4500/ws");
      const id = router.id;
      canvas.setSocket(socket);
      canvas.setSessionId(id);
      canvas.setSocketService(new SocketService(socket, id));
      tool.setTool(new Brush(canvasRef.current, canvas.socketService))
      socket.onopen = () => {
        socket.send(JSON.stringify({
          id,
          username: canvas.username,
          type: "connection"
        }))
      }
      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        switch (msg.type) {
          case 'connection':
            console.log(`User ${msg.username} connected`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
          case 'clear':
            canvas.clearCanvas();
            console.log("clear")
            break;
        }
      }
    }
  }, [show])

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvas.ctx;
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
        break;
      case 'rect':
        Rectangle.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillColor, figure.strokeColor, figure.lineWidth);
        break;
      case 'circle':
        Circle.draw(ctx, figure.x, figure.y, figure.radius, figure.fillColor, figure.strokeColor, figure.lineWidth);
        break;
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case 'line':
        Line.draw(ctx, figure.ax, figure.ay, figure.bx, figure.by, figure.color, figure.lineWidth);
        break;
      case 'finish':
        ctx.beginPath();
        break
    }
  }

  const mouseDownHandler = () => {
    canvas.pushToUndoList(canvasRef.current.toDataURL());
  }

  return (
    <div className="canvas _container">
      <canvas ref={canvasRef} width={600} height={400} onMouseDown={() => mouseDownHandler()} />
      <Modal show={show} setShow={setShow} />
    </div>
  );
});

export default Canvas;
