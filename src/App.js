import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import Tutorial from "./components/Tutorial";
import TutorialList from "./components/TutorialList";
import AddTutorial from "./components/AddTutorial";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TutorialList />} />
        <Route exact path="/add" element={<AddTutorial />} />
        <Route path="/tutorials/:id" element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
