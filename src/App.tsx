import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkspaceLayout from "./layout/Workspace";
import Marketing from "./screen/Marketing";
import Gallery from "./screen/Gallery";
import Edit from "./screen/Edit";
import Writing from "./screen/Writing";
import Landing from "./layout/Landing";
import { DataProvider } from "./context/DataProvider";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/work" element={<WorkspaceLayout />}>
            <Route index element={<Marketing />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="writing" element={<Writing />} />
            <Route path="editor" element={<Edit />} />
          </Route>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
