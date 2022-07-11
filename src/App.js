import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import "./styles/app.scss";
//u${(+new Date()).toString(16)}
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <ToolBar />
        <SettingsBar />
        <Routes>
          <Route path="/:id" element={<Canvas />} />
          <Route
            path="*"
            element={<Navigate replace to={`/u47fc687t`}  />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
