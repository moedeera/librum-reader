import { useParams } from "react-router-dom";
import "./UserPage.css";
import { useEffect, useState } from "react";
import { fetchProfile } from "../../assets/APIs/StoriesAPI";
import { Loading } from "../../Components/Loading/Loading";
import { findImageSet, imagesSorted } from "../../assets/images/images";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const UserPage = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userid } = useParams();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetchProfile(userid);
        setProfile(response);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    console.log(userid);
    fetchInfo();
  }, []);

  const books = [
    {
      name: "Spy world",
      pic: "https://img.wattpad.com/cover/383153-144-k870546.jpg",
      views: 130,
      comments: 20,
      likes: 41,
    },
    {
      name: "Young Detective",
      pic: "https://img.wattpad.com/cover/2108777-144-k375033.jpg",
      views: 243,
      comments: 10,
      likes: 14,
    },
    {
      name: "Greys Bridge Murder",
      pic: "https://img.wattpad.com/cover/51502699-144-k722901.jpg",
      views: 103,
      comments: 23,
      likes: 11,
    },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="container standard-page">
      <div className="user-page-upper-portion">
        <div className="user-page-up-banner"></div>
        <div className="user-page-up-info">
          <div className="user-page-info-avatar">
            <img src={profile.avatar} alt="" />
            <p>{profile.name}</p>
            <small>@{profile.profileName}</small>
          </div>
          <div className="user-page-info-stats">
            <div className="user-page-info-stat">6 stories</div>
            <div className="user-page-info-stat">5 followers</div>
          </div>
          <div className="user-page-info-button">
            <button className="btn">Follow</button>
          </div>
        </div>
      </div>
      <div className="user-page-lower-portion">
        <div className="user-page-lower-about">
          <h4>About</h4>
          <p>{profile.bio}</p>
        </div>
        <div className="user-page-lower-stories">
          <h4>Recent Writings</h4>
          <div className="recent-writings-container">
            {books.map((book, index) => (
              <div key={index} className="recent-writings-item">
                <div
                  className="recent-writings-image-container"
                  style={{ backgroundImage: `url(${book.pic})` }}
                ></div>

                <p>{book.name}</p>
                <div className="recent-writing-item-bio">
                  Nat has always joked about one of her best friends, Molly,
                  being a top-secret CIA agent. After all, it always fit in with
                  her many absences from school...
                </div>
                <div className="recent-stats-container">
                  <div className="recent-story-stat">
                    {book.views}{" "}
                    <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
                  </div>
                  <div className="recent-story-stat">
                    {book.likes}{" "}
                    <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
                  </div>
                  <div className="recent-story-stat">
                    {book.comments}{" "}
                    <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
