import "quill/dist/quill.snow.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "./StoryPage.css";
import { SiteContext } from "../../Context/Context";
import { findImageSet, imagesSorted } from "../../assets/images/images";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import { fetchStoryBySlugOrId } from "../../assets/APIs/StoriesAPI";
export const StoryPage = () => {
  const [postData, setPostData] = useState("");
  const [error, setError] = useState(false);
  const { storyId, story } = useContext(SiteContext);
  let info = { title: "Legend of the Lurkers" };

  const [storyFirebase, setStoryFirebase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const { storyidorslug } = useParams();

  useEffect(() => {
    fetchStoryBySlugOrId(storyidorslug)
      .then((match) => {
        setValue(match); // This will log the actual document data or null

        setStoryFirebase(match);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch story:", error);
      });
  }, []);

  useEffect(() => {
    if (story) {
      info.title = story;
    }
  }, [story]);

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

      quill.setContents(storyFirebase.story);
      console.log(storyFirebase.story);
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
    [storyFirebase]
  );
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          border: "1px solid rgba(128,128,128,0.5)",
          margin: "100px auto 0px",
          width: "50%",
          minWidth: "300px",
        }}
      >
        <h3>We encountered an Error! </h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="story-page">
        <div className="story-header-container">
          {" "}
          <small className="story-category-small">Fiction</small>
          <h3 className="story-page-header">{storyFirebase.title}</h3>
          <small>by {storyFirebase.author}</small>
        </div>

        <div className="story-container">
          <div className="story-stats">
            <div className="story-user">
              <div
                style={{
                  backgroundImage: `url("${
                    findImageSet("fantasy", imagesSorted)[1]
                  }")`,
                }}
                className="story-user-image"
              ></div>
              <Link to={`/user/${storyFirebase.author}`}>
                {" "}
                {storyFirebase.author}{" "}
              </Link>
            </div>
            <div className="story-stats-container">
              <div className="single-story-stat">
                {storyFirebase.views}{" "}
                <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
              </div>
              <div className="single-story-stat">
                {storyFirebase.likes}{" "}
                <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
              </div>
              <div className="single-story-stat">
                {storyFirebase.comments.length}{" "}
                <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
              </div>
            </div>
          </div>

          <div
            className="story-page"
            ref={wrapperRef}
            id="quill-container"
          ></div>
          <div className="story-side-info">
            <div className="story-info-summary">
              <p>Tags:</p>
              {storyFirebase.tags.map((tag, index) => (
                <Link key={index} to={`../stories/${tag}`}>
                  {tag}
                  {index < storyFirebase.tags.length - 1 && ", "}
                </Link>
              ))}
              <br />
              <p>670 words</p>
              <small>Last Edited : November 23 2023</small>
            </div>
            <div className="story-info-summary">
              <p>Similiar stories:</p>
              <div className="similar-stories-container">
                <div className="similar-story">
                  <div className="ss-image"></div>
                  <div className="ss-story-title"></div>
                  <div className="ss-story-author"></div>
                </div>
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
