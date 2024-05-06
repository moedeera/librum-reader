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
  countWordsInString,
  generateTags,
} from "@/utils/functions/functions";
import { useStories } from "@/utils/custom-hooks/useStories";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";

const CreateStoryPage = () => {
  const { createDraft } = useDraft();
  const { createStory } = useStories();
  const { fetchAccount, updateAccount } = useAccount();
  const { fetchProfile, updateUserProfile } = useProfile();
  const { createSummary } = useSummaries();
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
      setError(" Error:Unable to save; Please try again");
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishStory = async () => {
    // check for sufficient word count
    if (story?.wordCount < 1) {
      setError(
        `Insufficient word count at ${story?.wordCount}, please type in more than 50`
      );
      return;
    }
    let synopsisWordCount = countWordsInString(story?.synopsis);
    if (synopsisWordCount < 10) {
      setError(
        "Please write more of a description of the story in the synopsis"
      );
      return;
    }
    // check for sufficient synopsis length
    // set the keywords
    let keywords = [
      ...story.tags,
      ...generateTags(story.title, user.displayName),
    ];

    let uniqueKeywords = Array.from(new Set(keywords));
    try {
      setLoading(true);
      let userProfile = await fetchProfile();
      // create story  object
      setLoading(true);
      let finalUrl = await checkURLAvailability(story?.title);
      let newStory = {
        ...story,
        keywords: uniqueKeywords,
        authorAvatar: user.photoURL,
        dateCreated: new Date(),
        lastEdited: new Date(),
        authorLink: userProfile.url,
        comments: [],
        url: finalUrl,
      };
      console.log(newStory);
      // upload story object
      await createStory(newStory);
      // create summary for the story
      const newSummary = {
        authorName: story.authorName,
        authorLink: story.authorLink,
        stats: story.stats,
        link: finalUrl,
        promoted: false,
        keywords: story.keywords,
        tags: story.tags,
        dateCreated: new Date(),
        cover: story.cover,
        synopsis: story.synopsis,
        title: story.title,
        views: story.views,
        likes: story.likes,
        comments: 0,
        category: story.category,
        wordCount: story.wordCount,
      };
      await createSummary(newSummary);
      // update user profile
      let updatedProfileStories = [
        ...userProfile.stories,
        {
          url: finalUrl,
          title: story.title,
          cover: story.cover,
        },
      ];
      await updateUserProfile(
        userProfile.userId,
        "stories",
        updatedProfileStories
      );
      // update user account
      const UserAccount = await fetchAccount();
      let updatedAccountStories = [
        ...UserAccount.stories,
        {
          url: finalUrl,
          dateCreated: new Date(),
          title: story.title,
          cover: story.cover,
        },
      ];
      await updateAccount(user.uid, "stories", updatedAccountStories);
      // navigate to new story page
      navigate(`../story/${finalUrl}`);
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
              {error && <small style={{ color: "crimson" }}>{error}</small>}
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
