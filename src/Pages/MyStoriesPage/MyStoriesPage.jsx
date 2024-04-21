import { useContext, useEffect, useState } from "react";
import "./MyStoriesPage.css";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/Context/AuthContext";
import { useAccount } from "@/utils/custom-hooks/useAccount";

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
        <h3>MyStoriesPage</h3>
        <div className="my-stories-container">
          {account?.drafts?.map((draft, index) => (
            <Link key={index} className="my-stories-story" to={`${draft.slug}`}>
              <div
                className="ms-cover-image"
                style={{ backgroundImage: `url(${draft.cover})` }}
              ></div>
              {draft.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
