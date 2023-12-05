import Quill from "quill";
import { useCallback, useContext, useState } from "react";
import "./PostStory.css";
import { SiteContext } from "../../Context/Context";

export const PostStory = () => {
  const { user } = useContext(SiteContext);
  console.log(user);

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
          <button className="btn btn-primary" onChangeCapture={() => {}}>
            Save Story
          </button>
          <button id="save-button" className="btn btn-primary btn-green">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
