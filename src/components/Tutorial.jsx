import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { get } from "../services/TutorialService";
import {
  updateTutorial,
  deleteTutorial,
} from "../features/tutorial/tutorialSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Tutorial = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const [deleted, setDeleted] = useState(false);

  const dispatch = useDispatch();

  let params = useParams().id;

  const getTutorial = (id) => {
    get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(params);
  }, [params]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updateStatus = (status) => {
    const data = {
      id: currentTutorial._id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    dispatch(updateTutorial({ id: currentTutorial._id, data: data }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateTutorial({ id: currentTutorial._id, data: currentTutorial }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log(currentTutorial);
  };

  const removeTutorial = () => {
    dispatch(deleteTutorial({ id: currentTutorial._id }))
      .unwrap()
      .then(() => {
        setDeleted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {deleted ? (
        <div>
          <h4>Deleted Successfully</h4>
          <Link to="/" className="nav-link">
            <button
              className="btn"
              style={{ backgroundColor: "black", color: "white" }}
            >
              {" "}
              Home
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {currentTutorial ? (
            <div className="edit-form">
              <h4>Tutorial</h4>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={currentTutorial.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentTutorial.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              {currentTutorial.published ? (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updateStatus(false)}
                  style={{ backgroundColor: "grey", color: "black" }}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updateStatus(true)}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Publish
                </button>
              )}

              <button
                className="badge badge-danger mr-2"
                onClick={removeTutorial}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={updateContent}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tutorial;
