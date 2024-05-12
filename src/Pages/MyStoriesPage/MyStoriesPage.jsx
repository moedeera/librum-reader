import { useContext, useEffect, useState } from "react";
import "./MyStoriesPage.css";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { useAccount } from "@/utils/custom-hooks/useAccount";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useStories } from "@/utils/custom-hooks/useStories";
import { useSummaries } from "@/utils/custom-hooks/useSummaries";
import { Loading } from "@/Components/Loading/Loading";

export const MyStoriesPage = () => {
  const { user } = useContext(AuthContext);
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateAccount, fetchAccount } = useAccount();
  const { deleteStory } = useStories();
  const { deleteDraft } = useDraft();
  const { deleteSummary } = useSummaries();

  //   const handleOnDeleteClick = async() => {
  //   alert
  // }
  const handleStoryDelete = async (id, url) => {
    setLoading(true);
    try {
      await deleteStory(url);
      await deleteSummary(url);

      let updatedAccount = {
        ...account,
        stories: account.stories.filter((story) => story.id !== id && story),
      };
      console.log(updatedAccount);
      await updateAccount(account.userId, "stories", updatedAccount.stories);
      setAccount(updatedAccount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await deleteDraft(id);
      let updatedAccount = {
        ...account,
        drafts: account.drafts.filter((draft) => draft.draftId !== id && draft),
      };
      console.log(updatedAccount);
      await updateAccount(account.userId, "drafts", updatedAccount.drafts);
      setAccount(updateAccount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUserAccount = async () => {
      const data = await fetchAccount();
      console.log(data);
      setAccount(data);
    };

    fetchUserAccount();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container standard-page">
      <div className="my-story-page">
        <h3>Your Stories</h3>
        <h5>Drafts</h5>
        <div className="my-stories-container">
          {account?.drafts?.map((draft, index) => (
            <div key={index} className="my-stories-story">
              <div
                className="ms-cover-image"
                style={{ backgroundImage: `url(${draft.cover})` }}
              ></div>
              {draft.title}

              <div className="button-container">
                <Link className="btn" to={`${draft.draftId}`}>
                  <small>Edit</small>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleOnDelete(draft.draftId);
                  }}
                >
                  <small> Delete</small>
                </button>
              </div>
            </div>
          ))}
        </div>
        <h5>Stories</h5>
        <div className="my-stories-container">
          {account?.stories?.map((story, index) => (
            <div key={index} className="my-stories-story">
              <div
                className="ms-cover-image"
                style={{ backgroundImage: `url(${story.cover})` }}
              ></div>
              {story.title}

              <div className="button-container">
                <Link className="btn" to={`${story?.draftId}`}>
                  <small>Edit</small>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleStoryDelete(story?.id, story?.url);
                  }}
                >
                  <small> Delete</small>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
