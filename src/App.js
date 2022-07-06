import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import "./styles/app.scss";

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
            element={<Navigate replace to={`u${(+new Date()).toString(16)}`} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
