import { useNavigate } from "react-router-dom";
import "./StoryInfo.css";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../Context/Context";
import ImageUploader from "./AddImage";
import { DropDown } from "../../Components/DropDown/DropDown";

export const StoryInfo = () => {
  const navigate = useNavigate();
  const { story, setStory, user } = useContext(SiteContext);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Cancel the event
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = "";
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [newStoryInfo, setNewStoryInfo] = useState({
    author: user.name,
    id: "",
    ref: "",
    title: "",
    summary: "",
    public: true,
    authorPic: user.pic,
    tags: [],
    category: "",
  });

  const [error, setError] = useState("");
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

  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    // Split the input by commas or spaces and filter out any empty strings
    const newItems = input.split(/[\s,]+/).filter((item) => item.trim() !== "");
    setItems(newItems);
    setNewStoryInfo({ ...newStoryInfo, tags: [newItems] });
    console.log(newItems);
  }, [input]);

  const handleContinue = () => {
    const newStoryId = Math.floor(Math.random() * (2000 - 1100) + 1100);

    setStory({
      ...story,
      id: newStoryId,
      title: newStoryInfo.title,
      author: user.name,
      authorPic: user.pic,

      summary: newStoryInfo.summary,
      tags: newStoryInfo.tags,
      comments: [],
      likes: 0,
      views: 0,
    });

    navigate(`/mystory/${newStoryId}`);
  };

  if (user === null || !user) {
    navigate("/login");
    return;
  }

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
              <input
                name="title"
                type="text"
                value={newStoryInfo.title}
                onChange={(e) => {
                  onChangeHandler(e, "title");
                }}
              />
            </div>
            <div className="story-info-input">
              <h4>Description</h4>
              <textarea
                name="title"
                type="text"
                value={newStoryInfo.summary}
                onChange={(e) => {
                  onChangeHandler(e, "summary");
                }}
                id=""
                cols="30"
                rows="10"
              />
            </div>
            <div className="story-info-input">
              <h4>Tags</h4>
              <input type="text" value={input} onChange={handleInputChange} />

              <div className="story-info-tags">
                {" "}
                {items.map((item, index) => (
                  <small key={index}>{item}</small>
                ))}{" "}
              </div>
            </div>
            <div className="story-info-input">
              <DropDown
                selections={[
                  "Fiction",
                  "Sci-fi",
                  "Fantasy",
                  "Non-Fiction",
                  "Fan-Fiction",
                ]}
                setValue={setNewStoryInfo}
                storyInfo={newStoryInfo}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleContinue();
              }}
            >
              Continue
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log(newStoryInfo);
              }}
            >
              Preview
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setStory({
                  ...story,
                  id: "preview",
                  title: newStoryInfo.title,
                  author: user.name,
                  authorPic: user.pic,
                  summary: newStoryInfo.summary,
                  tags: newStoryInfo.tags,
                  comments: [],
                  likes: 0,
                  views: 0,
                });
                console.log(story);
              }}
            >
              Preview & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
