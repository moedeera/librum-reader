import { Link } from "react-router-dom";
import "./Error.css";
export const ErrorPage = ({ story }) => {
  return (
    <div className="container">
      {" "}
      <div className="error-page">
        {" "}
        <h1> {story ? "404 Not Found" : "404 - Page Not Found"}</h1>
        <h4>
          Oops! The {story ? "literature" : "page"} you are looking for{" "}
          {story && "was either deleted, made private, or "}may be in another
          directory.
        </h4>
        <p>
          Please check the URL or navigate back to the{" "}
          <Link to="/">home page</Link>.
        </p>
      </div>
    </div>
  );
};
