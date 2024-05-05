import { getWordCount } from "@/utils/functions/functions";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";
import { Loading } from "../Loading/Loading";

export const CreateStoryEditor = ({ setStory, prevStoryInfo, setMode }) => {
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [time, setTime] = useState(null);
  const [reset, setReset] = useState(0);
  const [startedEditing, setStartedEditing] = useState(false);
  const [wordCount, setWordCount] = useState(prevStoryInfo.wordCount);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleUpdate = async () => {
    console.log("saving", prevStoryInfo);
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

    quill.setContents(prevStoryInfo?.story);

    quillRef.current = quill;

    quill.on("text-change", (delta, oldDelta, source) => {
      const content = quill.getContents();
      const newWordCount = getWordCount(quill);

      // console.log(content.ops);
      if (!startedEditing) {
        setStartedEditing(true);
      }
      console.log(content.ops, prevStoryInfo?.story);
      setStory({
        ...prevStoryInfo,
        story: content.ops,
        wordCount: newWordCount,
      });

      setWordCount(newWordCount);
    });
    return () => {
      // Added check to ensure destroy is a function before calling it
      if (quillRef.current && typeof quillRef.current.destroy === "function") {
        quillRef.current.destroy();
      }
    };
  }, [reset, updateSuccess, updateError]);
  // story

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
      <div>
        <small>Word count : {wordCount}</small>
      </div>
      {startedEditing ? (
        <div className="draft-buttons-container">
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
            Discard
          </button>
        </div>
      ) : (
        <button
          className="btn"
          onClick={() => {
            setMode("main");
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
};
