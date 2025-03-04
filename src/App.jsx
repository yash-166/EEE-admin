import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registrations from "./components/Registartions";
import LevelOne from "./components/LevelOne";
import LevelTwo from "./components/LevelTwo";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-[#0A192F] text-white flex max-h-[650px]">
      <Sidebar />
      <div className="flex-1 ps-4 flex flex-col items-center">
        <Routes>
          <Route path="/"  element={<Registrations />} />
          <Route path="/levelOne" element={<LevelOne  />} />
          <Route path="/levelTwo" element={<LevelTwo/>} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
