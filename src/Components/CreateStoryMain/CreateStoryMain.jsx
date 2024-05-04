import {
  checkURLAvailability,
  formatTimestamp,
} from "@/utils/functions/functions";
import "./CreateStoryMain.css";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useStories } from "@/utils/custom-hooks/useStories";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { AuthContext } from "@/Context/AuthContext";
import { useAccount } from "@/utils/custom-hooks/useAccount";

const CreateStoryMain = ({ story, setMode, onPublish, draftId }) => {
  const [loading, setLoading] = useState(false);
  const { createStory } = useStories();
  const { createSummary } = useSummaries();
  const { updateUserProfile, fetchProfile } = useProfile();
  const { deleteDraft } = useDraft();
  const { fetchAccount, updateAccount } = useAccount();
  const navigate = useNavigate();

  const [updateTime, setUpdateTime] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setUpdateTime(story?.lastEdited);
  }, [story]);

  const handleClick = async () => {
    try {
      setLoading(true);
      let finalUrl = await checkURLAvailability(story?.title);
      let newStory = {
        ...story,
        authorAvatar: user.photoURL,
        dateCreated: new Date(),
        lastEdited: new Date(),
        comments: [],
        url: finalUrl,
      };

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
      const publishedStory = await createStory(newStory);
      let userProfile = await fetchProfile();
      console.log(userProfile.stories);
      let updatedUserProfileStories = [
        ...userProfile.stories,
        {
          title: newStory.title,
          cover: newStory.cover,
          url: newStory.url,
        },
      ];

      await updateUserProfile(
        story.userId,
        "stories",
        updatedUserProfileStories
      );
      const account = await fetchAccount();
      let updatedAccount = {
        ...account,
        drafts: account.drafts.filter(
          (draft) => draft.draftId !== draftId && draft
        ),
        stories: [
          ...account.stories,
          {
            title: story?.title,
            cover: story?.cover,
            url: finalUrl,
          },
        ],
      };
      await updateAccount(account.userId, "drafts", updatedAccount.drafts);
      await deleteDraft(draftId);

      navigate(`../../story/${finalUrl}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading mini={true} />;
  }

  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>Synopsis</h4>
        <p>{story?.synopsis}</p>
      </div>
      <div style={{ margin: "10px 0" }}>
        {" "}
        <small>
          Last Edited at{" "}
          {story?.lastEdited &&
          updateTime !== null &&
          story?.lastEdited !== null
            ? formatTimestamp(updateTime)
            : "12:35 April 27 2023 "}
        </small>
      </div>
      <div className="story-tags">
        {"Tags: "}
        {story?.tags.map((tag, index) => (
          <small key={index}>
            {tag}
            {index < story?.tags.length && ", "}
          </small>
        ))}
      </div>
      <div className="story-buttons-container">
        <button
          className="btn btn-green"
          onClick={() => {
            handleClick("/");
          }}
        >
          <small>Save</small>
        </button>

        <button
          className="btn"
          onClick={() => {
            setMode("story");
          }}
        >
          <small>Publish</small>
        </button>
      </div>
    </>
  );
};

export default CreateStoryMain;
