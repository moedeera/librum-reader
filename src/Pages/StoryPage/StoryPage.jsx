import "quill/dist/quill.snow.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Quill from "quill";
import "./StoryPage.css";
import { SiteContext } from "../../Context/Context";
import { loremIpsum } from "../../Context/Content";

export const StoryPage = () => {
  const [postData, setPostData] = useState("");
  const { story } = useContext(SiteContext);
  let info = { title: "Your Story" };

  useEffect(() => {
    if (story) {
      info.title = story;
      console.log(story);
    }
  }, [story]);

  const wrapperRef = useCallback((wrapper) => {
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
    const savedData = localStorage.getItem("savedData");
    if (savedData && savedData !== null) {
      console.log(JSON.parse(savedData));
      quill.setContents(JSON.parse(savedData));
    } else {
      // quill.setText("Hello\n");
      quill.setContents(loremIpsum);
    }

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
  return (
    <div className="container">
      <div className="story-page">
        <h3 className="story-page-header">{info.title}</h3>
        <div className="story-container">
          <div
            className="story-page"
            ref={wrapperRef}
            id="quill-container"
          ></div>
          <div className="test-block">
            <div className="test-block-upper">
              <p>Similar Stories</p>
            </div>
            <div className="test-block-lower"></div>
          </div>
        </div>

        <div className="story-button-container">
          {/* <button id="edit-button" className="btn btn-primary btn-green">
            Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};
