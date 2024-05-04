import { Editor } from "@/Components/Editor/Editor";
import { Loading } from "@/Components/Loading/Loading";
import { Previewer } from "@/Components/Previewer/Previewer";
import { AuthContext } from "@/Context/AuthContext";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DraftPage.css";
import { ErrorPage } from "../ErrorPage/ErrorPage";

import StoryMain from "@/Components/StoryMain/StoryMain";
import ImageBox from "../StoryInfo/ImageUploader";
import {
  formatTimestamp,
  getCurrentDateFormatted,
} from "@/utils/functions/functions";
import { useAccount } from "@/utils/custom-hooks/useAccount";
import { StoryDetails } from "@/Components/StorytDetails/StoryDetails";
const DraftPage = () => {
  const { fetchDraftById, updateDraft } = useDraft();
  const { fetchAccount, updateAccount, updateAccount2 } = useAccount();
  const { user } = useContext(AuthContext);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("main");
  const [storyTitle, setStoryTitle] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { draftid } = useParams();

  const modes = [
    { id: 1, name: "Main", mode: "main" },
    { id: 2, name: "Details", mode: "details" },
    { id: 3, name: "Story", mode: "story" },
  ];

  const handleUpdate = async (update) => {
    try {
      await updateDraft(draftid, update);
    } catch (error) {
      console.log("failed to update", error);
      throw new Error(error);
    }
  };

  const handleTitleUpdate = async () => {
    try {
      setUpdating(true);
      let currentDate = new Date();
      let updatedDraft = {
        ...story,
        title: storyTitle,
        lastEdited: currentDate,
      };
      await updateDraft(draftid, updatedDraft);
      setStory(updatedDraft);

      setEditTitle(false);
      const userAccount = await fetchAccount();
      let updatedAccount = {
        ...userAccount,
        drafts: userAccount.drafts.map((draft) =>
          draft.draftId === draftid ? { ...draft, title: storyTitle } : draft
        ),
      };

      await updateAccount(userAccount.userId, "drafts", updatedAccount.drafts);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
      setUpdateSuccess(true);
    }
  };

  useEffect(() => {
    const fetchThDraft = async (id) => {
      try {
        setLoading(true);
        let res = await fetchDraftById(id);
        // console.log(res);
        setStory(res);
        setStoryTitle(res.title);
        console.log(res.lastEdited, formatTimestamp(res.lastEdited));
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

  if (loading || !story || story === null || story.story === null) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <div className="container standard-page">
      {updating ? (
        <Loading mini={true} />
      ) : (
        <>
          {" "}
          {story.story ? (
            <div>
              {" "}
              <>
                {editTitle ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <input
                      style={{
                        maxWidth: "15rem",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                      type="text"
                      value={storyTitle}
                      onChange={(e) => {
                        setStoryTitle(e.target.value);
                      }}
                    />
                    <button
                      className="btn btn-green"
                      onClick={() => {
                        handleTitleUpdate();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setEditTitle(false);
                        setStoryTitle(story.title);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <h2 style={{ marginBottom: "0px" }}>{story?.title}</h2>
                    <button
                      className="btn"
                      style={{ paddingBottom: "10px" }}
                      onClick={() => {
                        setEditTitle(true);
                      }}
                    >
                      <small>Edit</small>
                    </button>
                  </div>
                )}
                {updateSuccess && (
                  <small style={{ color: "green" }}>
                    Succesfully updated title at {getCurrentDateFormatted()}
                  </small>
                )}
              </>{" "}
            </div>
          ) : (
            <h3>Fetching Story...</h3>
          )}
          {/* <Editor story={story.story} setStory={setStory} mode={"write"} /> */}
          <div
            className={
              mode === "story"
                ? "draft-container story-editor"
                : "draft-container"
            }
          >
            <div style={{ marginBottom: "25px", width: "100%" }}>
              <ImageBox
                prevImage={story?.cover}
                setStory={setStory}
                story={story}
                id={draftid}
              />
            </div>

            <div
              className={mode === "story" ? "draft-main story" : "draft-main"}
            >
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
              {mode === "main" && (
                <StoryMain story={story} setMode={setMode} draftId={draftid} />
              )}
              {mode === "details" && (
                <StoryDetails
                  story={story}
                  onSave={handleUpdate}
                  setStory={setStory}
                />
              )}{" "}
              {mode === "story" && (
                <>
                  <Editor
                    storyText={story?.story}
                    onSave={handleUpdate}
                    setStory={setStory}
                    prevStoryInfo={story}
                    setMode={setMode}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DraftPage;
