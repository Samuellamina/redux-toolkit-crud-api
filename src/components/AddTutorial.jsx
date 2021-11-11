import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../features/tutorial/tutorialSlice";
import { Link } from "react-router-dom";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const dispatch = useDispatch();

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const saveTutorial = () => {
    dispatch(
      createTutorial({
        title: title,
        description: description,
        published: false,
      })
    );

    setTitle("");
    setDescription("");
    setSubmitted(true);
  };

  const newTutorial = () => {
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Submitted Successfully</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            {" "}
            Add
          </button>
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
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br />
          <button onClick={saveTutorial}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
