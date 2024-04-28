import {
  checkURLAvailability,
  formatTimestamp,
} from "@/utils/functions/functions";
import "./StoryMain.css";
import { useState } from "react";

import { Loading } from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

import { useStories } from "@/utils/custom-hooks/useStories";
import { useProfile } from "@/utils/custom-hooks/useProfile";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";

const StoryMain = ({ story, setMode, onPublish }) => {
  const [loading, setLoading] = useState(false);
  const { createStory } = useStories();
  const { createSummary } = useSummaries();
  const { updateUserProfile, fetchProfile } = useProfile();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setLoading(true);
      let finalUrl = await checkURLAvailability(story?.title);
      let newStory = {
        ...story,
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
        tags: story.tags,
        dateCreated: new Date(),
        cover: story.cover,
        synopsis: story.synopsis,
        title: story.title,
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
    } catch (error) {
      console.log(error);
    } finally {
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
          Last Edited{" "}
          {story?.lastEdited
            ? formatTimestamp(story.lastEdited)
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
          <small>Publish</small>
        </button>

        <button
          className="btn"
          onClick={() => {
            setMode("story");
          }}
        >
          <small>Edit Story</small>
        </button>
      </div>
    </>
  );
};

export default StoryMain;
