import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkspaceLayout from "./layout/Workspace";
import Test from "./components/Test";
import Gallery from "./screen/Gallery";
import Edit from "./screen/Edit";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkspaceLayout />}>
          <Route index element={<Test />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
