import "./StoryMain.css";
const StoryMain = ({ story, setMode, function2 }) => {
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
          {story?.lastEdited ? story.lastEdited : "12:35 April 27 2023 "}
        </small>
      </div>
      <div className="story-tags">
        {"Tags: "}
        {story?.tags.map((tag, index) => (
          <small key={index}>
            {tag}
            {index < story.tags.length && ", "}
          </small>
        ))}
      </div>
      <div className="story-buttons-container">
        <button className="btn btn-green">
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
