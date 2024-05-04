import { getCurrentDateFormatted } from "@/utils/functions/functions";
import { useAccount } from "@/utils/custom-hooks/useAccount";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useParams } from "react-router-dom";
import { Loading } from "@/Components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import ImageBox from "../StoryInfo/ImageUploader";
import { CreateStoryDetails } from "@/Components/CreateStoryDetails/CreateStoryDetails";
import { Editor } from "@/Components/Editor/Editor";

import CreateStoryMain from "@/Components/CreateStoryMain/CreateStoryMain";
const CreateStoryPage = () => {
  const { fetchDraftById, updateDraft, createDraft } = useDraft();
  const { fetchAccount, updateAccount } = useAccount();
  const { user } = useContext(AuthContext);
  let defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/librum-reader.appspot.com/o/images%2Fdefault.webp?alt=media&token=53d8a6e5-033e-4b18-af92-2ceb096f7e9d";
  const [story, setStory] = useState({
    authorName: "",
    userId: "",
    authorPic: "",
    category: "Fiction",
    authorLink: "",
    dateCreated: new Date(),
    lastEdited: null,
    title: "Untitled",
    synopsis: "",
    cover: defaultImage,
    story: [],
    promoted: false,
    wordCount: 0,
    stats: [],
    views: 0,
    likes: 0,
    keywords: [],
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("details");
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
      // await updateDraft(draftid, updatedDraft);
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

  if (loading) {
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
                <CreateStoryMain
                  story={story}
                  setMode={setMode}
                  draftId={draftid}
                />
              )}
              {mode === "details" && (
                <CreateStoryDetails
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

export default CreateStoryPage;
