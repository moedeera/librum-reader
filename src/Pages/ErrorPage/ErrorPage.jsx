import { Link } from "react-router-dom";
import "./Error.css";
export const ErrorPage = () => {
  console.log("error");
  return (
    <div className="container">
      {" "}
      <div className="error-page">
        {" "}
        <h1>404 - Page Not Found</h1>
        <h4>
          Oops! The page you are looking for might be in another directory.
        </h4>
        <p>
          Please check the URL or navigate back to the{" "}
          <Link to="/">home page</Link>.
        </p>
      </div>
    </div>
  );
};
