import { LandingOverlay } from "../landingOverlay/LandingOverlay";
import "./Landing.css";
import { Link } from "react-router-dom";
export const Landing = () => {
  // const squares = Array(120).fill({ id: 1 });

  return (
    <div className="landing-container">
      <LandingOverlay />
      <div className="landing-background">
        <div className="grid-container">
          {/* {squares.map((square, index) => (
            <div key={index} className="square"></div>
          ))} */}
        </div>
      </div>
      <div className="landing-background-overlay"></div>
      <div className="landing-header-text">
        {" "}
        <div className="landing-header-text">
          <div className="landing-header-main">
            <h1>
              {" "}
              Read, write, and critique <br />
              short stories.
            </h1>
          </div>
        </div>
        <p>
          {" "}
          A unique platform for writers of all levels to enhance their craft.
          Dive into a world of creativity where you can read, write, and
          critique short stories with a vibrant community of like-minded
          individuals.
        </p>
        <Link to={"/stories"} className="btn btn-primary">
          DISCOVER GREAT STORIES
        </Link>
      </div>
    </div>
  );
};
