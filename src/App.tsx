import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkspaceLayout from "./layout/Workspace";
import Marketing from "./screen/Marketing";
import Gallery from "./screen/Gallery";
import Edit from "./screen/Edit";
import Writing from "./screen/Writing";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkspaceLayout />}>
          <Route index element={<Marketing />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="writing" element={<Writing />} />
          <Route path="editor" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
