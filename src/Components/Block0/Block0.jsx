import { Link } from "react-router-dom";
import "./Block0.css";

export const Block0 = () => {
  return (
    <div className="block-0">
      <div className="block-0-text">
        <h3>Read the latest Short Stories from our top authors</h3>
      </div>
      <div className="block-0-text-info">
        <p>
          Take a glimpse into our world of creativity. From striking visuals to
          seamless user experiences. Explore our portfolio to see how we bring
          ideas to life.
        </p>
        <Link to={"/"} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};
