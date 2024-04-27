import { getCurrentDateFormatted } from "@/utils/functions/functions";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../Loading/Loading";

export const Editor = ({ title, setStory, story, onSave, prevStoryInfo }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editedStory, setEditedStory] = useState(story);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [time, setTime] = useState(null);
  const [reset, setReset] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await onSave({ story: editedStory });
      setStory({ ...prevStoryInfo, story: editedStory });
      setUpdateSuccess(true);
      setTime(getCurrentDateFormatted());
    } catch (error) {
      console.log(error);
      setUpdateError("Error Updating Draft");
    } finally {
      setLoading(false);
    }
  };
  console.log(story);
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
  }, [reset, updateSuccess, updateError]);

  if (loading) {
    return <Loading mini={true} />;
  }

  return (
    <div className="text-editor-page" style={{ marginTop: "0px" }}>
      <div ref={editorRef} className="text-editor" id="quill-container"></div>
      <div>{updateError && <p style={{ color: "crimson" }}>Error</p>}</div>
      <div>
        {updateSuccess && (
          <p style={{ color: "green" }}>Successfully updated at {time}</p>
        )}
      </div>
      <div className="editor-button-container">
        <button
          className="btn"
          onClick={() => {
            handleUpdate();
          }}
        >
          Save Changes
        </button>
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
