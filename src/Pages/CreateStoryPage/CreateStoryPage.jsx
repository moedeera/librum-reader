import { useAccount } from "@/utils/custom-hooks/useAccount";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "@/Components/Loading/Loading";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import ImageBox from "../StoryInfo/ImageUploader";
import { CreateStoryDetails } from "@/Components/CreateStoryDetails/CreateStoryDetails";

import { CreateStoryEditor } from "@/Components/CreateStoryEditor/CreateStoryEditor";
import {
  checkURLAvailability,
  generateTags,
} from "@/utils/functions/functions";
import { useStories } from "@/utils/custom-hooks/useStories";
import { useProfile } from "@/utils/custom-hooks/useProfile";
const CreateStoryPage = () => {
  const { createDraft } = useDraft();
  const { createStory } = useStories();
  const { fetchAccount, updateAccount } = useAccount();
  const { fetchProfile } = useProfile();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState("details");
  const [storyTitle, setStoryTitle] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const navigate = useNavigate();
  const modes = [
    { id: 2, name: "Details", mode: "details" },
    { id: 3, name: "Story", mode: "story" },
  ];
  console.log("creating draft", user);
  const handleCreateDraft = async () => {
    try {
      //set loading to true
      setLoading(true);
      // create draft  object
      let userProfile = await fetchProfile();

      let newDraft = {
        authorName: user.displayName,
        userId: user.uid,
        authorPic: user.photoURL,
        category: story.category,
        authorLink: userProfile.url,
        dateCreated: new Date(),
        lastEdited: new Date(),
        title: story.title,
        synopsis: story.synopsis,
        cover: story.cover,
        story: story.story,
        promoted: story.promoted,
        wordCount: story.wordCount,
        stats: [],
        views: 0,
        likes: 0,
        keywords: [],
        tags: story.tags,
      };
      // upload draft object
      const createdDraft = await createDraft(newDraft);
      const draftId = createdDraft.id;
      // update user account
      const UserAccount = await fetchAccount();
      let updatedDrafts = [
        ...UserAccount.drafts,
        {
          draftId: draftId,
          dateCreated: new Date(),
          title: story.title,
          cover: story.cover,
        },
      ];
      await updateAccount(user.uid, "drafts", updatedDrafts);
      // navigate to new draft page
      navigate(`../mystories/${draftId}`);
    } catch (error) {
      console.log("failed to update", error);
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishStory = async () => {
    // check for sufficient word count
    // check for sufficient synopsis length
    // set the keywords
    let keywords = [
      ...story.tags,
      ...generateTags(story.title, user.displayName),
    ];

    let uniqueKeywords = Array.from(new Set(keywords));
    try {
      setLoading(true);

      // create story  object
      setLoading(true);
      let finalUrl = await checkURLAvailability(story?.title);
      let newStory = {
        ...story,
        keywords: uniqueKeywords,
        authorAvatar: user.photoURL,
        dateCreated: new Date(),
        lastEdited: new Date(),
        comments: [],
        url: finalUrl,
      };
      console.log(newStory);
      // upload story object
      // update user profile
      // update user account
      // navigate to new story page
    } catch (error) {
      console.log("failed to update", error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user || user !== null) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Set a timeout to switch off loading and set error if loading is too long
    const timer = setTimeout(() => {
      if (loading) {
        navigate("/404");
        return;
      }
    }, 5000); // 10000 milliseconds = 10 seconds

    // Cleanup function to clear the timer if the component unmounts or isLoading changes
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
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
                id={""}
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
              {error && (
                <small style={{ color: "crimson" }}>
                  Error:Unable to save; Please try again
                </small>
              )}
              {mode === "details" && (
                <CreateStoryDetails
                  story={story}
                  setStory={setStory}
                  onSaveDraft={handleCreateDraft}
                  onPublishStory={handlePublishStory}
                />
              )}{" "}
              {mode === "story" && (
                <>
                  <CreateStoryEditor
                    storyText={story?.story}
                    onSave={handleCreateDraft}
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
