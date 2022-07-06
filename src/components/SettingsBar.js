import React from "react";
import "../styles/toolbar.scss";

const SettingsBar = () => {
  return (
    <div className="toolbar settings">
      <div className="_container">
        Line thin:
        <input type="number" />
      </div>
    </div>
  );
};

export default SettingsBar;
