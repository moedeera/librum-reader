import Quill from "quill";
import { useEffect, useRef, useState } from "react";

export const Editor = ({ title, setStory, story }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = document.createElement("div");
    editorRef.current.innerHTML = "";
    editorRef.current.appendChild(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: true },
    });

    quillRef.current = quill;

    quill.on("text-change", (delta, oldDelta, source) => {
      const content = quill.getContents();
      setStory(content.ops);
    });
    return () => {
      // Added check to ensure destroy is a function before calling it
      if (quillRef.current && typeof quillRef.current.destroy === "function") {
        quillRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="text-editor-page">
      <div ref={editorRef} className="text-editor" id="quill-container"></div>
      <div className="editor-button-container"></div>
    </div>
  );
};
