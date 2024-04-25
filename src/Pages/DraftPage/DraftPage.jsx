import { Editor } from "@/Components/Editor/Editor";
import { Loading } from "@/Components/Loading/Loading";
import { Previewer } from "@/Components/Previewer/Previewer";
import { AuthContext } from "@/Context/AuthContext";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DraftPage.css";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { StoryDetails } from "@/Components/StorytDetails/StoryDetails";
import StoryMain from "@/Components/StoryMain/StoryMain";

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
            {modes.map((currentMode) => (
              <div
                style={
                  currentMode.mode === mode
                    ? {
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }
                    : {}
                }
                onClick={() => {
                  setMode(currentMode.mode);
                }}
                key={currentMode.id}
              >
                {currentMode.name}
              </div>
            ))}
          </div>
          {mode === "main" && <StoryMain story={story} setMode={setMode} />}
          {mode === "details" && <StoryDetails story={story} />}{" "}
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
