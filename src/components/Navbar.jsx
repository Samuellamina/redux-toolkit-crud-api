import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          REDUX-TK-AXIOS
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
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
    </div>
  );
};

export default Navbar;
