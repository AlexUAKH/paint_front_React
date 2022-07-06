import React from "react";
import "../styles/toolbar.scss";

const ToolBar = () => {
  return (
    <div className="toolbar tool">
      <div className="wrapper _container">
        <div className="toolbar__draw">
          <button className="toolbar__btn brush" />
          <button className="toolbar__btn rect" />
          <button className="toolbar__btn circle" />
          <button className="toolbar__btn eraser" />
          <button className="toolbar__btn line" />
          <input className="toolbar__btn color" type="color" />
          {/* <input type="color" className="toolbar__" /> */}
        </div>
        <div className="toolbar__options">
          <button className="toolbar__btn undo" />
          <button className="toolbar__btn redo" />
          <button className="toolbar__btn save" />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
