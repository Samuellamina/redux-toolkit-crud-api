import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TutorialList from "./TutorialList";
import AddTutorial from "./AddTutorial";
import Tutorial from "./Tutorial";

const Navbar = () => {
  return (
    <div>
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
    </div>
  );
};

export default Navbar;
