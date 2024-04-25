import { Editor } from "@/Components/Editor/Editor";
import { Loading } from "@/Components/Loading/Loading";
import { Previewer } from "@/Components/Previewer/Previewer";
import { AuthContext } from "@/Context/AuthContext";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DraftPage.css";
import { ErrorPage } from "../ErrorPage/ErrorPage";

const DraftPage = () => {
  const { fetchDraftById } = useDraft();
  const { user } = useContext(AuthContext);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("main");

  const { draftid } = useParams();

  const modes = [
    { id: 1, name: "Main", mode: "main" },
    { id: 2, name: "Details", mode: "details" },
    { id: 3, name: "Story", mode: "story" },
  ];

  useEffect(() => {
    const fetchThDraft = async (id) => {
      try {
        setLoading(true);
        let res = await fetchDraftById(id);
        console.log(res);
        setStory(res);
      } catch (error) {
        setError(true);
        throw new Error(error);
      } finally {
        setLoading(false);
      }
    };
    if (user && user !== null) {
      fetchThDraft(draftid);
    }
  }, [user]);

  useEffect(() => {
    console.log(story?.tags[0]);
  }, [story]);

  if (loading || !story || story === null || story.story === null) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="container standard-page">
      {story.story ? <h3>{story?.title}</h3> : <h3>Fetching Story...</h3>}

      {/* <Editor story={story.story} setStory={setStory} mode={"write"} /> */}
      <div
        className={
          mode === "story" ? "draft-container story-editor" : "draft-container"
        }
      >
        <div className="draft-cover">
          <div
            className="draft-cover-image"
            style={{ backgroundImage: `url(${story?.cover})` }}
          >
            <button className="btn">Change Cover</button>
          </div>
        </div>

        <div className={mode === "story" ? "draft-main story" : "draft-main"}>
          <div className="draft-header">
            <div
              style={
                mode === "main"
                  ? {
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }
                  : {}
              }
              onClick={() => {
                setMode("main");
              }}
            >
              Main
            </div>
            <div
              style={
                mode === "details"
                  ? {
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }
                  : {}
              }
              onClick={() => {
                setMode("details");
              }}
            >
              Details
            </div>
            <div
              style={
                mode === "story"
                  ? {
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }
                  : {}
              }
              onClick={() => {
                setMode("story");
              }}
            >
              Story
            </div>
          </div>
          {mode === "main" && (
            <>
              {" "}
              <div>
                <h4>Synopsis</h4>
                <p>{story?.synopsis}</p>
              </div>
              <div className="draft-tags">
                {"Tags: "}
                {story?.tags.map((tag, index) => (
                  <small key={index}>
                    {tag}
                    {index < story.tags.length && ", "}
                  </small>
                ))}
              </div>
              <div className="draft-buttons-container">
                <button className="btn btn-green">
                  <small>Publish</small>
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    setMode("edit");
                  }}
                >
                  <small>Edit Story</small>
                </button>
              </div>
            </>
          )}
          {mode === "details" && (
            <>
              <div>
                <h4>Synopsis</h4>
                <textarea
                  name=""
                  id=""
                  rows="10"
                  value={story.synopsis}
                ></textarea>
              </div>
              <div className="draft-tags">
                {"Tags: "}

                {story?.tags.map((tag, index) => (
                  <div className="draft-tag-edit" key={index}>
                    {tag}
                    <div className="draft-tag-delete">x</div>
                  </div>
                ))}
              </div>
              <div>
                <div>Add Tag</div>
                <input type="text" />
              </div>
              <div className="draft-buttons-container">
                <button className="btn">
                  <small>Save</small>
                </button>
                <button className="btn btn-danger">
                  <small style={{ color: "white" }}>Cancel</small>
                </button>
              </div>
            </>
          )}{" "}
          {mode === "story" && (
            <>
              <Editor story={story?.story} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraftPage;
