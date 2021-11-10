import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tutorial from "./components/Tutorial";
import TutorialList from "./components/TutorialList";
import AddTutorial from "./components/AddTutorial";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          REDUX-TK-AXIOS
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/tutorials" className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" component={<TutorialList />} />
          <Route exact path="/add" component={<AddTutorial />} />
          <Route path="/tutorials/:id" component={<Tutorial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
