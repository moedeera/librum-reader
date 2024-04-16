import React, { useEffect, useState } from "react";
import { DropDown } from "../DropDown/DropDown";
import ImageBox from "@/Pages/StoryInfo/ImageUploader";

export const StoryInfoForm = ({ storyInfo, setStoryInfo, setBasics }) => {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const onChangeHandler = (e, type) => {
    if (type === "title") {
      setStoryInfo({ ...storyInfo, title: e.target.value });
    } else if (type === "summary") {
      setStoryInfo({ ...storyInfo, summary: e.target.value });
    } else if (type === "tags") {
      setStoryInfo({
        ...storyInfo,
        tags: [...storyInfo.tags, e.target.value],
      });
    } else if (type === "category") {
      setStoryInfo({ ...storyInfo, category: e.target.value });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    // Split the input by commas or spaces and filter out any empty strings
    const newItems = input.split(/[\s,]+/).filter((item) => item.trim() !== "");
    setItems(newItems);
    setStoryInfo({ ...storyInfo, tags: [...newItems, "general"] });
    // console.log(newItems);
  }, [input]);

  return (
    <div className="story-info-page">
      <h3>Story Info</h3>
      <div className="story-info-container">
        <ImageBox setError={setError} />
        <div className="story-info-details">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="story-info-input">
            <h4>Title</h4>
            <input
              name="title"
              type="text"
              value={storyInfo.title}
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
              value={storyInfo.summary}
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
              setValue={setStoryInfo}
              storyInfo={storyInfo}
            />
          </div>
          <div className="story-page-button-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                setBasics(true);
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
