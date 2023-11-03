import { Block4 } from "../../Components/Block4/Block4";
import "./Stories.css";
export const Stories = () => {
  return (
    <div className="container">
      <div className="stories-page">
        {" "}
        <h3>Browse Short Stories</h3>
        <Block4 />
        <button className="btn btn-primary">More</button>
      </div>
    </div>
  );
};
