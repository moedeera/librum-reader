import { useEffect, useState } from "react";
import "./CreateStoryDetails.css";
import { Loading } from "../Loading/Loading";
import {
  checkForRestrictedWords,
  getCurrentDateFormatted,
} from "@/utils/functions/functions";
import { DropDown } from "../DropDown/DropDown";

export const CreateStoryDetails = ({ story, onSave, setStory }) => {
  const [loading, setLoading] = useState(false);
  const [synopsis, setSynopsis] = useState(story?.synopsis);

  const [newTag, setNewTag] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [newTagError, setNewTagError] = useState(null);
  const [category, setCategory] = useState(story?.category);
  const [changedOnce, setChangedOnce] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const primaryCategories = ["Fiction", "Non-Fiction", "Article"];

  const deleteTag = (tagToDelete) => {
    let newTags = story.tags.filter((tag) => tag !== tagToDelete);
    setStory({ ...story, tags: newTags });
  };
  const handleUpdate = async () => {
    onSave(story);
  };
  const handleTagInputChange = (e) => {
    const input = e.target.value;
    const wordResult = checkForRestrictedWords(input);
    const numbers = input.match(/\d/g);
    // Check if the tag count is already exceeded
    if (story.tags.length === 5) {
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
    setStory({ ...story, tags: [...story?.tags, newTag] });
    setNewTag("");
  };

  if (!story || loading) {
    return <Loading mini={true} />;
  }

  return (
    <>
      <div>
        <div>{updateError && <p style={{ color: "crimson" }}>Error</p>}</div>
        <div>
          {updateSuccess && (
            <p style={{ color: "green" }}>
              Successfully updated at {getCurrentDateFormatted()}
            </p>
          )}
        </div>
        <div>
          <p>Title</p>
          <input
            type="text"
            value={story.title}
            onChange={(e) => {
              setStory({ ...story, title: e.target.value });
            }}
          />
        </div>
        <p>Synopsis</p>
        <textarea
          name=""
          id=""
          rows="7"
          value={story?.synopsis}
          onChange={(e) => {
            setStory({ ...story, synopsis: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="story-tags">
        {"Tags: "}

        {story.tags.map((tag, index) => (
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
      <DropDown
        selections={primaryCategories}
        setValue={setCategory}
        current={category}
      />
      <div className="story-buttons-container">
        <button
          className="btn"
          onClick={() => {
            console.log(story);
          }}
        >
          <small>Save</small>
        </button>
        <button
          className="btn btn-green"
          onClick={() => {
            console.log("publish");
          }}
        >
          <small>Publish</small>
        </button>
        <button
          className={"btn btn-danger "}
          onClick={() => {
            console.log("discard");
            // setCategory(story?.category);
            // setSynopsis(story?.synopsis);
            // setTags(story?.tags);
          }}
        >
          <small>Discard</small>
        </button>
      </div>
    </>
  );
};
