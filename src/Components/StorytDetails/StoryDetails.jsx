import "./StoryDetails.css";

export const StoryDetails = ({ story, onSave }) => {
  return (
    <>
      <div>
        <h4>Synopsis</h4>
        <textarea
          name=""
          id=""
          rows="10"
          value={story?.synopsis}
          onChange={() => {}}
        ></textarea>
      </div>
      <div className="story-tags">
        {"Tags: "}

        {story?.tags.map((tag, index) => (
          <div className="story-tag-edit" key={index}>
            {tag}
            <div className="story-tag-delete">x</div>
          </div>
        ))}
      </div>
      <div>
        <div>Add Tag</div>
        <input type="text" />
      </div>
      <div className="story-buttons-container">
        <button
          className="btn"
          onClick={() => {
            onSave();
          }}
        >
          <small>Save</small>
        </button>
      </div>
    </>
  );
};
