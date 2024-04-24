import { Editor } from "@/Components/Editor/Editor";
import { Loading } from "@/Components/Loading/Loading";
import { Previewer } from "@/Components/Previewer/Previewer";
import { AuthContext } from "@/Context/AuthContext";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DraftPage.css";

const DraftPage = () => {
  const { fetchDraftById } = useDraft();
  const { user } = useContext(AuthContext);
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("read");

  const { draftid } = useParams();

  useEffect(() => {
    const fetchThDraft = async (id) => {
      try {
        setLoading(true);
        let res = await fetchDraftById(id);
        console.log(res);
        setStory(res);
      } catch (error) {
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
    console.log(story.story);
  }, [story]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container standard-page">
      {story.story ? <h3>{story.title}</h3> : <h3>Fetching Story...</h3>}

      {/* <Editor story={story.story} setStory={setStory} mode={"write"} /> */}
      <div className="draft-container">
        <div className="draft-cover">
          <div
            className="draft-cover-image"
            style={{ backgroundImage: `url(${story.cover})` }}
          >
            <button className="btn">Change Cover</button>
          </div>
        </div>
        <div className="draft-main">
          <div>
            <p>Synopsis</p>
            <small>{story.synopsis}</small>
          </div>

          <div className="draft-buttons-container">
            <button className="btn">
              <small>Read</small>
            </button>
            <button className="btn">
              <small>Edit Details</small>
            </button>
            <button className="btn">
              <small>Edit Story</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftPage;
