import { Editor } from "@/Components/Editor/Editor";
import { Loading } from "@/Components/Loading/Loading";
import { AuthContext } from "@/Context/AuthContext";
import { useDraft } from "@/utils/custom-hooks/useDraft";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DraftPage = () => {
  const { fetchDraftById } = useDraft();
  const { user } = useContext(AuthContext);
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Editor />
    </div>
  );
};

export default DraftPage;
