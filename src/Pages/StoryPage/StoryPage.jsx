import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "./StoryPage.css";
import { findImageSet, imagesSorted } from "../../assets/images/images";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { useStories } from "@/utils/custom-hooks/useStories";
import { formatTimestamp } from "@/utils/functions/functions";
export const StoryPage = () => {
  const [postData, setPostData] = useState("");
  const [error, setError] = useState(false);

  const { fetchStory } = useStories();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const { storyidorslug } = useParams();

  useEffect(() => {
    const getStory = async () => {
      try {
        let data = await fetchStory(storyidorslug);
        setStory(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getStory();
  }, []);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (wrapper === null) return;

      // Create a new Quill editor
      const editor = document.createElement("div");
      editor.setAttribute("id", "quill-editor");
      wrapper.append(editor);

      // Initialize Quill on the editor
      const quill = new Quill(editor, {
        theme: "snow",
        readOnly: true,
        modules: {
          toolbar: false, // Disable the toolbar
        },
      });

      // }

      quill.setContents(story?.story);
      console.log(story?.story);
      function getWordCount() {
        var text = quill.getText();

        // Remove trailing newline character which Quill adds by default
        if (text.endsWith("\n")) {
          text = text.slice(0, -1);
        }

        // Use a regular expression to split the text into words
        var words = text.match(/\b\w+\b/g);

        // Return the number of words
        return words ? words.length : 0;
      }
      console.log("Character count: ", getWordCount());
      // fetchAndSetStory();
      // Log new characters when the user edits the content
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          // This logs the changes made by the user
          const content = quill.root.innerHTML;
          setPostData(content);
        }
      });
    },
    [story]
  );
  if (loading) {
    return <Loading />;
  }

  if (error || story === null || !story) {
    return <ErrorPage story={true} />;
  }

  return (
    <div className="container">
      <div className="story-page">
        <div className="story-header-container">
          {" "}
          <small className="story-category-small">{story?.category}</small>
          <h3 className="story-page-header">{story?.title}</h3>
          <small>by {story?.authorName}</small>
        </div>

        <div className="story-container">
          <div className="story-stats">
            <div className="story-user">
              <div
                style={{
                  backgroundImage: `url("${
                    story?.authorAvatar
                      ? story.authorAvatar
                      : findImageSet("fantasy", imagesSorted)[1]
                  }")`,
                }}
                className="story-user-image"
              ></div>
              <Link to={`/user/${story?.authorLink}`}>
                {" "}
                {story.authorName}{" "}
              </Link>
            </div>
            <div className="story-stats-container">
              <div className="single-story-stat">
                {story?.stats[0]}{" "}
                <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
              </div>
              <div className="single-story-stat">
                {story?.stats[1]}{" "}
                <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
              </div>
              <div className="single-story-stat">
                {story?.stats[2].length > 1 ? story.stats[2].length : 0}{" "}
                <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
              </div>
            </div>
          </div>

          <div
            className="story-page"
            ref={wrapperRef}
            id="quill-container"
            style={{
              border: "1px solid rgba(128, 128, 128, 0.25)",
              background: "whitesmoke",
            }}
          ></div>
          <div className="story-side-info">
            <div className="story-info-summary">
              <p>Tags:</p>
              {story?.tags.map((tag, index) => (
                <Link key={index} to={`../stories/${tag}`}>
                  {tag}
                  {index < story.tags.length - 1 && ", "}
                </Link>
              ))}
              <br />
              <p>{story.wordCount} words</p>
              <small>Last Edited : {formatTimestamp(story.lastEdited)}</small>
            </div>
            <div className="story-info-summary">
              <p>Synopsis:</p>
              <div className="similar-stories-container">
                <small>{story.synopsis}</small>
              </div>
            </div>

            <div className="test-block-lower"></div>
          </div>
        </div>

        <div className="story-button-container"></div>
      </div>
    </div>
  );
};
