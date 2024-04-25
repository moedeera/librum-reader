import "./StoryMain.css";
const StoryMain = ({ story, setMode, function2 }) => {
  return (
    <>
      {" "}
      <div>
        <h4>Synopsis</h4>
        <p>{story?.synopsis}</p>
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
