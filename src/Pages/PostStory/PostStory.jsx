import Quill from "quill";
import { useCallback, useContext, useState } from "react";
import "./PostStory.css";
import { SiteContext } from "../../Context/Context";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export const PostStory = () => {
  const { story, data } = useContext(SiteContext);
  const [storyArray, setStoryArray] = useState([]);
  const storyData = collection(db, "stories");
  const storySummaries = collection(db, "summaries");

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

  const PublishStory = async () => {
    console.log(story.tags[0]);
    try {
      const docRef = await addDoc(storyData, {
        author: story.author,
        authorPic: story.authorPic,
        id: story.id,
        title: story.title,
        summary: story.summary,
        public: true,
        picture: story.picture,
        tags: story.tags[0],
        category: story.category,
        comments: [],
        likes: 0,
        views: 0,
        ref: "",
        story: storyArray,
        date: new Date(),
      });
      const titleToLink = (title) => {
        return title.trim().replace(/\s+/g, "-");
      };

      const link = titleToLink(story.title);

      await updateDoc(docRef, {
        id: docRef.id,
        link: link,
        slug: `${docRef.id}-${link}`,
      });
      const iD = docRef.id;
      await addDoc(storySummaries, {
        id: story.id,
        ref: iD,
        cat: story.category,
        title: story.title,
        info: story.summary,
        tag: story.tags[0],
        pic: story.picture,
        author: story.author,
      });

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
