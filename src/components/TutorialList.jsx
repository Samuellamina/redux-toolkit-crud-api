import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAllTutorials,
  findTutorialsByTitle,
  retrieveTutorials,
} from "../features/tutorial/tutorialSlice";

const TutorialList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector((state) => state.tutorials);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveTutorials());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => dispatch(deleteAllTutorials());

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle({ title: searchTitle }));
  };

  return (
    <div>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search by title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>
          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial._id}
                className="badge badge-warning"
              >
                <button>Edit</button>
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialList;
