import React, { useContext } from "react";
import "../styles/toolbar.scss";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const SettingsBar = observer(() => {
  const { tool } = useContext(Context);
  const changeColor = (e) => {
    tool.setFillColor(e);
    tool.setStrokeColor(e);
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
          <button className="settings__btn">Share</button>
        </div>

        </div>
    </div>
  );
});

export default SettingsBar;
