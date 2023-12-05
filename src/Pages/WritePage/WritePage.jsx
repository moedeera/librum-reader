import { Link } from "react-router-dom";
import "./WritePage.css";

export const WritePage = () => {
  return (
    <div className="container">
      <div className="write-page-container">
        <div>
          {" "}
          <h3>Write New Story </h3>
          <Link to="/storyinfo" className="btn btn-primary">
            New Story
          </Link>
        </div>
        <div>
          {" "}
          <h3>Or Edit Saved Story:</h3>
          <p>No Saved Stories</p>
        </div>
      </div>
    </div>
  );
};
