import { useContext, useEffect, useState } from "react";
import "./MyStoriesPage.css";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { useAccount } from "@/utils/custom-hooks/useAccount";
import { formatTimestamp } from "@/utils/functions/functions";

export const MyStoriesPage = () => {
  const { user } = useContext(AuthContext);
  const [account, setAccount] = useState({});

  const navigate = useNavigate();
  const { updateAccount, fetchAccount } = useAccount();

  useEffect(() => {
    const fetchUserAccount = async () => {
      const data = await fetchAccount();
      console.log(data);
      setAccount(data);
    };

    fetchUserAccount();
  }, [user]);

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
                <button className="btn btn-danger">
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
