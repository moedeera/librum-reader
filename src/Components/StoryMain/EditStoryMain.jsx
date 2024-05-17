import { formatTimestamp } from "@/utils/functions/functions";
import "./StoryMain.css";
import { useContext, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useStories } from "@/utils/custom-hooks/useStories";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { AuthContext } from "@/Context/AuthContext";
import { useAccount } from "@/utils/custom-hooks/useAccount";

const EditStoryMain = ({ story, setMode, url }) => {
  const [loading, setLoading] = useState(false);
  const { deleteStory } = useStories();
  const { deleteSummary } = useSummaries();
  const { updateUserProfile, fetchProfile } = useProfile();

  const { fetchAccount, updateAccount, updateAccount2 } = useAccount();
  const navigate = useNavigate();

  const [updateTime, setUpdateTime] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setUpdateTime(story?.lastEdited);
  }, [story]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteSummary(url);
      let userProfile = await fetchProfile();
      console.log(userProfile.stories);
      let updatedUserProfileStories = userProfile.stories.filter(
        (singleStory) => singleStory.url !== url && singleStory
      );

      await updateUserProfile(
        story.userId,
        "stories",
        updatedUserProfileStories
      );
      const account = await fetchAccount();

      let updatedStories = account.stories.filter(
        (singleStory) => singleStory.url !== url && singleStory
      );

      await updateAccount(account.userId, "stories", updatedStories);

      navigate(`../../mystories}`);
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
          className="btn"
          onClick={() => {
            setMode("story");
          }}
        >
          <small>Edit Story</small>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDelete("/");
          }}
        >
          <small>Delete</small>
        </button>
      </div>
    </>
  );
};

export default EditStoryMain;
