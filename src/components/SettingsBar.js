import React, { useContext } from "react";
import "../styles/toolbar.scss";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const SettingsBar = observer(() => {
  const { canvas, tool } = useContext(Context);

  const changeColor = (e) => {
    tool.setFillColor(e);
    tool.setStrokeColor(e);
  }
  const clear = () => {
    const confirm = window.confirm("Save image before clearing. All data will be lost. ");
    if (confirm) {
      canvas.clearCanvas();
      canvas.socketService.sendClear();
    }
  }
  const share = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        window.alert("Link was copied. For collaboration just send it to your friend");
    })
  }

  return (
    <div className="toolbar settings">
      <div className="wrapper _container">
        <div className="settings__styles">
          <div className="settings__control">
            <label htmlFor="width-label">Line width:</label>
            <input
              id="width-label"
              min={1}
              max={30}
              type="number"
              defaultValue={1}
              onChange={(e) => tool.setLineWidth(e.target.value)}
            />
          </div>
          <div className="settings__control">
            <label htmlFor="color-label">Color:</label>
            <input
              id="color-label"
              type="color"
              onChange={(e) => changeColor(e.target.value)}
            />
          </div>
          <div className="settings__control">
            <label htmlFor="stroke-label">Stroke:</label>
            <input
              id="stroke-label"
              type="color"
              value={tool.strokeColor}
              onChange={(e) => tool.setStrokeColor(e.target.value)}
            />
          </div>
        </div>
        <div className="settings__actions">
          <button className="settings__btn btn" onClick={clear}>Clear</button>
          <button className="settings__btn btn" onClick={share}>Share</button>
        </div>

        </div>
    </div>
  );
});

export default SettingsBar;
