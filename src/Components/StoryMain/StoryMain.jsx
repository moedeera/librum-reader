import { formatTimestamp } from "@/utils/functions/functions";
import "./StoryMain.css";
import { useState } from "react";

import { Loading } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

import { useStories } from "@/utils/custom-hooks/useStories";
const StoryMain = ({ story, setMode, onPublish }) => {
  const [loading, setLoading] = useState(false);
  const { createStory } = useStories();
  const navigate = useNavigate();

  const handleClick = () => {
    let publishedStory = {};
    // try {
    //   setLoading(true);
    //   await onPublish()
    //   setTimeout(() => {
    //     navigate(path);
    //   }, 3000);

    // } catch (error) {
    //   setLoading(false)
    // }
  };

  if (loading) {
    return <Loading mini={true} />;
  }

  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>Synopsis</h4>
        <p>{story?.synopsis}</p>
      </div>
      <div style={{ margin: "10px 0" }}>
        {" "}
        <small>
          Last Edited{" "}
          {story?.lastEdited
            ? formatTimestamp(story.lastEdited)
            : "12:35 April 27 2023 "}
        </small>
      </div>
      <div className="story-tags">
        {"Tags: "}
        {story?.tags.map((tag, index) => (
          <small key={index}>
            {tag}
            {index < story?.tags.length && ", "}
          </small>
        ))}
      </div>
      <div className="story-buttons-container">
        <button
          className="btn btn-green"
          onClick={() => {
            handleClick("/");
          }}
        >
          <small>Publish</small>
        </button>

        <button
          className="btn"
          onClick={() => {
            setMode("story");
          }}
        >
          <small>Edit Story</small>
        </button>
      </div>
    </>
  );
};

export default StoryMain;
