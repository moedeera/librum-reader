import { useNavigate } from "react-router-dom";
import "./StoryInfo.css";

export const StoryInfo = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    const newstoryId = Math.floor(Math.random() * (2000 - 1100) + 1100);

    navigate(`/mystory/${newstoryId}`);
  };

  return (
    <div className="container">
      <div className="story-info-page">
        <h1>Story Info</h1>
        <div className="story-info-container">
          <div className="story-info-picture">
            <button className="btn btn-primary">Add Image</button>
          </div>
          <div className="story-info-details">
            {" "}
            <div className="story-info-input">
              <h4>Title</h4>
              <input type="text" />
            </div>
            <div className="story-info-input">
              <h4>Description</h4>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="story-info-input">
              <h4>Tags</h4>
              <input type="text" />
            </div>
            <div className="story-info-input">
              <h4>Category</h4>
              <input type="text" />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleContinue();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
