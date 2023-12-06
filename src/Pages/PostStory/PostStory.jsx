import Quill from "quill";
import { useCallback, useContext, useState } from "react";
import "./PostStory.css";
import { SiteContext } from "../../Context/Context";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase-config";

export const PostStory = () => {
  const { user, story } = useContext(SiteContext);

  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");
  const profilesRef = collection(db, "profiles");

  const [postData, setPostData] = useState("");

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
    const savedData = localStorage.getItem("savedData");
    if (savedData && savedData !== null) {
      console.log(JSON.parse(savedData));
      quill.setContents(JSON.parse(savedData));
    } else {
      quill.setText("Hello\n");
    }

    const button = document.getElementById("save-button");

    button.addEventListener("click", () => {
      //   const content = quill.root.innerHTML;
      //   const data = parseHtmlToQuillDelta(content);

      //   console.log(data);
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
      }
    });

    // Cleanup function
    return () => {
      quill.off("text-change");
      wrapper.innerHTML = "";
    };
  }, []);

  const saveStory = async () => {};

  const PublishStory = async () => {
    try {
      await addDoc(storyData, {
        ref: "",
        id: story.id,
        author: story.author,
        likes: 0,
        views: 0,
        comments: 0,
        tags: story.tags,
        title: story.title,
        story: postData,
        date: new Date(),
        pic: story.pic,
      });

      await addDoc(storySummaries, {
        id: story.id,
        cat: story.category,
        title: story.title,
        summary: story.summary,
        tag: story.tags,
        pic: story.pic,
      });
      const matchProfile = profilesRef.where("email", "==", user.email);
      const currentStories = matchProfile.stories; // Default to an empty array if 'stories' doesn't exist
      const updatedStories = [...currentStories, story.id];

      // Update User Profile to include the stories
      // await updateDoc(matchProfile, newCount);

      console.log("success, story and summary was saved on data-base");
    } catch (error) {
      console.log(error);
    }
  };

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
              PublishStory();
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
