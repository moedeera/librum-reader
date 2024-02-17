import { useParams } from "react-router-dom";
import "./UserPage.css";

export const UserPage = () => {
  const { userid } = useParams();
  return (
    <div className="container standard-page">
      {" "}
      <h3>
        {" "}
        <span>{userid}</span> profile
      </h3>
    </div>
  );
};
