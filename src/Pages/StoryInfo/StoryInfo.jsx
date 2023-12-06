import { useNavigate } from "react-router-dom";
import "./StoryInfo.css";
import { useContext, useState } from "react";
import { SiteContext } from "../../Context/Context";
import ImageUploader from "./AddImage";

export const StoryInfo = () => {
  const navigate = useNavigate();
  const { story, setStory } = useContext(SiteContext);
  const [newStoryInfo, setNewStoryInfo] = useState({
    author: "",
    id: "",
    ref: "",
    title: "Your Story",
    summary: "",
    public: true,
    picture: "",
    tags: [],
    category: "",
  });

  const onChangeHandler = (e, type) => {
    if (type === "title") {
      setNewStoryInfo({ ...newStoryInfo, title: e.target.value });
    } else if (type === "summary") {
      setNewStoryInfo({ ...newStoryInfo, summary: e.target.value });
    } else if (type === "tags") {
      setNewStoryInfo({
        ...newStoryInfo,
        tags: [...newStoryInfo.tags, e.target.value],
      });
    } else if (type === "category") {
      setNewStoryInfo({ ...newStoryInfo, category: e.target.value });
    }
  };

  const handleContinue = () => {
    const newstoryId = Math.floor(Math.random() * (2000 - 1100) + 1100);

    navigate(`/mystory/${newstoryId}`);
  };

  return (
    <div className="container">
      <div className="story-info-page">
        <h3>Story Info</h3>
        <div className="story-info-container">
          {/* <div className="story-info-picture">
            <button className="btn btn-primary">Add Image</button>
          </div> */}
          <ImageUploader />
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
              <small>Tag 1</small>
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
