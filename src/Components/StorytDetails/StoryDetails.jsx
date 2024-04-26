import { useEffect, useState } from "react";
import "./StoryDetails.css";
import { Loading } from "../Loading/Loading";
import { checkForRestrictedWords } from "@/utils/functions/functions";

export const StoryDetails = ({ story, onSave }) => {
  const [synopsis, setSynopsis] = useState(story?.synopis);
  const [tags, setTags] = useState([...story?.tags]);
  const [newTag, setNewTag] = useState("");
  const [newTagError, setNewTagError] = useState(null);

  // Effect to update state when the `story` prop changes
  useEffect(() => {
    setSynopsis(story?.synopsis);
    setTags([...story?.tags]);
  }, [story]);

  const deleteTag = (tagToDelete) => {
    let newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
    console.log(newTags);
  };

  const handleTagInputChange = (e) => {
    const input = e.target.value;
    const wordResult = checkForRestrictedWords(input);
    const numbers = input.match(/\d/g);
    // Check if the tag count is already exceeded
    if (tags.length === 3) {
      setNewTagError(
        "Currently at tag Limit, please delete a tag to enter new one"
      );
      return;
    }
    // Check to see if the tag is too long
    if (input.length > 15) {
      console.log("character limit exceeded");
      setNewTagError("Character limit exceeded");
      return;
    }
    if (numbers && numbers.length > 5) {
      setNewTagError("The input contains more than 5 numbers.");
      return;
    }
    if (wordResult.startsWith("Error")) {
      setNewTagError(wordResult);
      return;
    }
    setNewTag(input);
    setNewTagError(null);
  };

  const handleAddTag = () => {
    setTags([...tags, newTag]);
    setNewTag("");
  };

  if (!story) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h4>Synopsis</h4>
        <textarea
          name=""
          id=""
          rows="10"
          value={synopsis}
          onChange={(e) => {
            setSynopsis(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="story-tags">
        {"Tags: "}

        {tags.map((tag, index) => (
          <div className="story-tag-edit" key={index}>
            {tag}
            <div
              onClick={() => {
                deleteTag(tag);
              }}
              className="story-tag-delete"
            >
              x
            </div>
          </div>
        ))}
      </div>
      <div className="story-tags-add">
        <div>Add Tag</div>
        <input
          type="text"
          value={newTag}
          onChange={(e) => {
            handleTagInputChange(e);
          }}
        />
        {newTagError && <small>{newTagError}</small>}
      </div>
      <div>
        {" "}
        <button
          className="btn btn-green"
          onClick={() => {
            handleAddTag();
          }}
        >
          <small>Add tag</small>
        </button>
      </div>

      <div className="story-buttons-container">
        <button
          className="btn"
          onClick={() => {
            onSave();
          }}
        >
          <small>Save Changes</small>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            console.log(synopsis, tags);
          }}
        >
          <small>Discard Changes</small>
        </button>
      </div>
    </>
  );
};
