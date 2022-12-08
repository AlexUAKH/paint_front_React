import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../index";
import SocketService from "../services/socketService";
import "../styles/canvas.scss";
import Brush from "../tools/brush";
import Circle from "../tools/circle";
import Eraser from "../tools/eraser";
import Line from "../tools/line";
import Rectangle from "../tools/rectangle";
import Modal from "./Modal";

const Canvas = observer(() => {
  const [show, setShow] = useState(true);
  const { canvas, tool } = useContext(Context);
  const canvasRef = useRef(null);
  const router = useParams();

  useEffect(() => {
    canvas.setCanvas(canvasRef.current);
    axios
      .get(`https://paint-online.onrender.com/picture/${router.id}`, {
        responseType: "json",
      })
      .then((picture) => {
        if (picture.data) {
          const img = new Image();
          img.src = picture.data;
          img.onload = () => {
            canvas.ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            canvas.ctx.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          };
        }
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) {
      const socket = new WebSocket("wss://paint-online.onrender.com/ws");
      const id = router.id;
      canvas.setSocket(socket);
      canvas.setSessionId(id);
      canvas.setSocketService(new SocketService(socket, id));
      tool.setTool(new Brush(canvasRef.current, canvas.socketService));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id,
            username: canvas.username,
            type: "connection",
          })
        );
      };

      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        switch (msg.type) {
          case "connection":
            console.log(`User ${msg.username} connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
          case "clear":
            canvas.clearCanvas();
            break;
          case "undo":
            undoHandler(msg);
            break;
          default:
            break;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvas.ctx;
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.lineWidth);
        break;
      case "rect":
        Rectangle.draw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.fillColor,
          figure.strokeColor,
          figure.lineWidth
        );
        break;
      case "circle":
        Circle.draw(
          ctx,
          figure.x,
          figure.y,
          figure.radius,
          figure.fillColor,
          figure.strokeColor,
          figure.lineWidth
        );
        break;
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth);
        break;
      case "line":
        Line.draw(
          ctx,
          figure.ax,
          figure.ay,
          figure.bx,
          figure.by,
          figure.color,
          figure.lineWidth
        );
        break;
      case "finish":
        ctx.beginPath();
        break;
      default:
        break;
    }
  };
  const undoHandler = (msg) => {
    console.log(msg);
    // const img = new Image();
    // img.src = msg.data;
    // img.onload = () => {
    //   canvas.ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //   canvas.ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    // }
  };
  const mouseDownHandler = () => {
    canvas.pushToUndoList(canvasRef.current.toDataURL());
  };
  const mouseUpHandler = () => {
    axios
      .post(`https://paint-online.onrender.com/picture/${router.id}`, {
        img: canvasRef.current.toDataURL(),
      })
      .then(() => console.log("saved"));
  };

  return (
    <div className="canvas _container">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={() => mouseUpHandler()}
      />
      <Modal show={show} setShow={setShow} />
    </div>
  );
});

export default Canvas;
