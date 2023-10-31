import "quill/dist/quill.snow.css";
import Quill from "quill";
import { useCallback } from "react";
import "./PostStory.css";

export const PostStory = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, {
      theme: "snow",
    });

    return () => {
      wrapperRef.innerHTML = "";
    };
  }, []);

  return (
    <div className="container">
      <div className="text-editor-page">
        <h3>Your Story</h3>
        <div className="text-editor" ref={wrapperRef}></div>
        <div className="editor-button-container">
          <button className="btn btn-primary">Preview</button>
          <button className="btn btn-primary btn-green">Save</button>
        </div>
      </div>
    </div>
  );
};
