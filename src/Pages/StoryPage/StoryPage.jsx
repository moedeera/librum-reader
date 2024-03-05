import "quill/dist/quill.snow.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "./StoryPage.css";
import { SiteContext } from "../../Context/Context";
import { findImageSet, imagesSorted } from "../../assets/images/images";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import { fetchStoryBySlugOrId } from "../../assets/APIs/StoriesAPI";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { updateSingleSummaryStat } from "@/assets/APIs/SummariesAPI";
export const StoryPage = () => {
  const [postData, setPostData] = useState("");
  const [error, setError] = useState(false);
  const { storyId, story } = useContext(SiteContext);
  let info = { title: "Legend of the Lurkers" };

  const [storyFirebase, setStoryFirebase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const { storyidorslug } = useParams();

  useEffect(() => {
    setError(false); // Reset error state
    setLoading(true); // Start loading
    fetchStoryBySlugOrId(storyidorslug)
      .then((match) => {
        setValue(match);
        setStoryFirebase(match);
      })
      .catch((error) => {
        console.error("Failed to fetch story:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false); // Stop loading whether the fetch succeeded or failed
      });
  }, [storyidorslug]); // Add storyidorslug to the dependency array to refetch when it changes

  useEffect(() => {
    if (storyFirebase !== null) {
      info.title = storyFirebase.title;
      console.log(storyFirebase);
      let updatedStats = [
        Number(storyFirebase.views),
        Number(storyFirebase.likes),
        storyFirebase.comments.length,
      ];
      updateSingleSummaryStat(storyFirebase.ref, updatedStats);
    }
  }, [storyFirebase]);

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
    return <ErrorPage story={true} />;
  }

  return (
    <div className="container">
      <div className="story-page">
        <div className="story-header-container">
          {" "}
          <small className="story-category-small">Fiction</small>
          <h3 className="story-page-header">{storyFirebase?.title}</h3>
          <small>by {storyFirebase?.author}</small>
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
