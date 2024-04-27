import Quill from "quill";
import { useEffect, useRef, useState } from "react";

export const Editor = ({ title, setStory, story, onSave }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editedStory, setEditedStory] = useState(story);
  const [updateError, setUpdateError] = useState(null);
  const [reset, setReset] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await onSave({ story: editedStory });
      setStory({ ...story, story: editedStory });
    } catch (error) {
      console.log(error);
      setUpdateError("Error Updating Draft");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = document.createElement("div");
    editorRef.current.innerHTML = "";
    editorRef.current.appendChild(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      readOnly: false,
      modules: { toolbar: true },
    });

    quill.setContents(story);

    quillRef.current = quill;

    quill.on("text-change", (delta, oldDelta, source) => {
      const content = quill.getContents();
      console.log(content.ops);
      setEditedStory(content.ops);
    });
    return () => {
      // Added check to ensure destroy is a function before calling it
      if (quillRef.current && typeof quillRef.current.destroy === "function") {
        quillRef.current.destroy();
      }
    };
  }, [reset]);

  return (
    <div className="text-editor-page" style={{ marginTop: "0px" }}>
      <div ref={editorRef} className="text-editor" id="quill-container"></div>
      <div>{updateError && <p style={{ color: "crimson" }}>Error</p>}</div>
      <div className="editor-button-container">
        <button className="btn">Save Changes</button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setReset(reset + 1);
          }}
        >
          Discard Changes
        </button>
      </div>
    </div>
  );
};
