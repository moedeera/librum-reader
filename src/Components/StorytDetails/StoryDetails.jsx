import { useEffect, useState } from "react";
import "./StoryDetails.css";
import { Loading } from "../Loading/Loading";
import {
  checkForRestrictedWords,
  generateTags,
  getCurrentDateFormatted,
} from "@/utils/functions/functions";
import { DropDown } from "../DropDown/DropDown";

export const StoryDetails = ({ story, onSave, setStory }) => {
  const [loading, setLoading] = useState(false);
  const [synopsis, setSynopsis] = useState(story?.synopsis);
  const [tags, setTags] = useState([...story?.tags]);
  const [newTag, setNewTag] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [newTagError, setNewTagError] = useState(null);
  const [category, setCategory] = useState(story?.category);
  const [changedOnce, setChangedOnce] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const primaryCategories = ["Fiction", "Non-Fiction", "Article"];

  // Effect to update state when the `story` prop changes
  useEffect(() => {
    setSynopsis(story?.synopsis);
    setTags([...story?.tags]);
  }, [story]);

  const deleteTag = (tagToDelete) => {
    let newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      let currentDate = new Date();
      console.log(currentDate);
      let newKeywords = [
        ...tags,
        generateTags(story?.title, story?.authorName),
      ];
      await onSave({ synopsis, tags, category, lastEdited: currentDate });
      setStory({
        ...story,
        synopsis,
        tags,
        category,
        lastEdited: currentDate,
        keywords: newKeywords,
      });
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error);
      setUpdateError("Error Updating Draft");
    } finally {
      setLoading(false);
    }
  };
  const handleTagInputChange = (e) => {
    const input = e.target.value;
    const wordResult = checkForRestrictedWords(input);
    const numbers = input.match(/\d/g);
    // Check if the tag count is already exceeded
    if (tags.length === 5) {
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
      <DropDown
        selections={primaryCategories}
        setValue={setCategory}
        current={category}
      />
      <div className="story-buttons-container">
        <button
          className="btn"
          onClick={() => {
            handleUpdate();
          }}
        >
          <small>Save Changes</small>
        </button>
        <button
          className={"btn btn-danger "}
          onClick={() => {
            setCategory(story?.category);
            setSynopsis(story?.synopsis);
            setTags(story?.tags);
          }}
        >
          <small>Discard Changes</small>
        </button>
      </div>
    </>
  );
};
