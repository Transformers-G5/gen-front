import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkspaceLayout from "./layout/Workspace";
import Test from "./components/Test";
import Gallery from "./screen/Gallery";
import Landing from "./layout/Landing";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Test />} />
          <Route path='/workspace' element={<WorkspaceLayout />}/>
          <Route path="gallery" element={<Gallery />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
