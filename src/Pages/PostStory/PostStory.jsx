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
  uploadImage,
} from "../../assets/APIs/StoriesAPI";
import { useParams } from "react-router-dom";

export const PostStory = () => {
  const { story, data, storyImage, setStory } = useContext(SiteContext);
  const [storyArray, setStoryArray] = useState([]);
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");

  const [postData, setPostData] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    // Create a new Quill editor
    const editor = document.createElement("div");
    editor.setAttribute("id", "quill-editor");
    wrapper.append(editor);

    // Initialize Quill on the editor
    const quill = new Quill(editor, {
      theme: "snow",
    });

    const button = document.getElementById("save-button");

    button.addEventListener("click", () => {
      var delte = quill.getContents();
      console.log("content:", ":", delte.ops);
      localStorage.setItem("savedData", JSON.stringify(delte.ops));
    });

    // Log new characters when the user edits the content
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        // This logs the changes made by the user
        const content = quill.root.innerHTML;
        setPostData(content);
        var delte = quill.getContents();

        setStoryArray(delte.ops);
      }
    });

    // Cleanup function
    return () => {
      quill.off("text-change");
      wrapper.innerHTML = "";
    };
  }, []);
  useEffect(() => {
    const fetch = async () => {
      let story = await fetchStoryBySlugOrId(id);
      return story;
    };

    setStoryArray(fetch);
  }, []);

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
              publishStory(id, storyArray);
            }}
          >
            Save Story
          </button>
          <button
            onClick={() => {
              localStorage.setItem("savedData", JSON.stringify(storyArray));
            }}
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
