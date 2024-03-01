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
  updateStory,
  uploadImage,
} from "../../assets/APIs/StoriesAPI";
import { useParams } from "react-router-dom";

export const PostStory = () => {
  const { story, data, storyImage, setStory } = useContext(SiteContext);
  const [storyInfo, setStoryInfo] = useState("");
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");
  const [editedStory, setEditedStory] = useState(null);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const { id } = useParams();
  let info = { title: "My story" };
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
  useEffect(() => {
    if (story) {
      info.title = story;
    }
  }, [story]);
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
      console.log(storyInfo.story);
      quill.setContents(storyInfo.story);
      // Handle Quill editor content or events as needed
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          // This logs the changes made by the user
          const content = quill.getContents();

          setEditedStory(content.ops);
          localStorage.setItem("qjs-edited-story", JSON.stringify(content.ops));
          console.log(content.ops, editedStory);
        }
      });

      // Cleanup function to destroy the Quill instance when the component unmounts or if re-initialized
      return () => {
        quill.destroy();
      };
    },
    [] // Dependencies array, adjust if necessary based on your use case
  );

  const handleSave = async () => {
    const updatedStoryData = localStorage.getItem("qjs-edited-story");
    console.log(updatedStoryData);
    let x = await updateStory(storyInfo.id, JSON.parse(updatedStoryData));
    console.log(x);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <div className="text-editor-page">
        <h3>{info.title}</h3>
        <div
          className="text-editor"
          ref={wrapperRef}
          id="quill-container"
        ></div>

        <div className="editor-button-container">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSave();
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
