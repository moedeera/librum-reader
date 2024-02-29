import Quill from "quill";
import { useCallback, useContext, useEffect, useState } from "react";
import "./PostStory.css";
import { SiteContext } from "../../Context/Context";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { Loading } from "../../Components/Loading/Loading";
import {
  fetchStoryBySlugOrId,
  publishStory,
  saveStory,
  uploadImage,
} from "../../assets/APIs/StoriesAPI";
import { useParams } from "react-router-dom";

export const PostStory = () => {
  const { story, data, storyImage, setStory } = useContext(SiteContext);
  const [storyInfo, setStoryInfo] = useState(null);
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");
  const [editedStory, setEditedStory] = useState(null);
  const [postData, setPostData] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchStoryBySlugOrId(id)
      .then((match) => {
        setValue(match); // This will log the actual document data or null
        console.log(match);
        setStoryInfo(match);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch story:", error);
      });
  }, []);

  const wrapperRef = useCallback(
    (wrapper) => {
      if (!wrapper) return;

      // Assuming editor is uniquely identified or this hook only runs once per component instance
      let editor = wrapper.querySelector(".quill-editor");
      if (!editor) {
        editor = document.createElement("div");
        editor.classList.add("quill-editor");
        wrapper.appendChild(editor);
      } else {
        // Optionally clear previous editor's content
      }

      const quill = new Quill(editor, {
        theme: "snow",
        readOnly: false, // Set to false to enable editing
        modules: {
          toolbar: true, // Enables the default toolbar
        },
      });

      // Handle Quill editor content or events as needed
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          // This logs the changes made by the user
          const content = quill.getContents();
          setEditedStory(content.ops);
          // setStoryInfo({ ...storyInfo, story: content.ops });
          console.log(content.ops, storyInfo);
        }
      });

      // Cleanup function to destroy the Quill instance when the component unmounts or if re-initialized
      return () => {
        quill.destroy();
      };
    },
    [] // Dependencies array, adjust if necessary based on your use case
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <div className="text-editor-page">
        <h3>Your Story</h3>
        <div
          className="text-editor"
          ref={wrapperRef}
          id="quill-container"
        ></div>

        <div className="editor-button-container">
          <button
            className="btn btn-primary"
            onClick={() => {
              saveStory(storyInfo.id);
            }}
          >
            Save Story
          </button>
          <button
            onClick={() => {}}
            id="save-button"
            className="btn btn-primary btn-green"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
