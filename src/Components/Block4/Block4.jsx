import { useContext, useEffect, useState } from "react";
import "./Block4.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";
import { Loading } from "../Loading/Loading";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";

export const Block4 = ({ searchTerm }) => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const summariesData = collection(db, "summaries");

  const fetchSummariesData = async () => {
    try {
      const data = await getDocs(summariesData);
      const summariesInfo = data.docs.map((doc) => ({
        ...doc.data(),
        storyId: doc.id,
      }));

      setSummaries(summariesInfo);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);

      return error;
    }
  };

  const updateViews = async (id) => {
    const story = doc(db, "stories", id);
    let storyInfo = await getDoc(story);
    console.log(storyInfo.data());
    let storyObject = storyInfo.data();

    const newCount = Number(storyObject.views) + 1;
    await updateDoc(story, { views: newCount });
  };

  useEffect(() => {
    fetchSummariesData();
  }, []);

  const { imagesSorted, findImageSet, setStory, setStoryId } =
    useContext(SiteContext);
  const [hover, setHover] = useState(
    new Array(summaries.length).fill({ id: summaries.id, state: false })
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="block-4-container">
      {" "}
      {summaries.map((item, index) => (
        <Link
          // onMouseEnter={(item) => {
          onMouseEnter={() => {
            setHover((prevHover) => {
              return prevHover.map((hookItem) => {
                if (hookItem.id === item.id) {
                  return { id: hookItem.id, state: true };
                }
                return hookItem;
              });
            });
          }}
          onMouseLeave={() => {
            setHover((prevHover) => {
              return prevHover.map((hookItem) => {
                if (hookItem.id === item.id) {
                  return { id: hookItem.id, state: false };
                }
                return hookItem;
              });
            });
          }}
          to={`/story/${item.slug}`}
          onClick={() => {
            updateViews(item.ref, item.views);
          }}
          className="block-4-segment"
          key={item.id}
        >
          <div className="block-1-segment-overlay"></div>
          <div
            className="overlay-image"
            style={
              hover[index]?.state
                ? {
                    backgroundImage: `url(${
                      findImageSet("librum-trending", imagesSorted)[index]
                    })`,
                    opacity: 0.25,
                    scale: "1.1",
                  }
                : {
                    backgroundImage: `url(${
                      findImageSet("librum-trending", imagesSorted)[index]
                    })`,
                    opacity: 0.2,
                    scale: "1",
                  }
            }
          ></div>
          <div className="block-4-segment-text">
            <small>{item.cat}</small>
            <h4>{item.title}</h4>
            <p>{item.info}</p>
            <div className="btn">Read More</div>
            <p>
              Tags:
              {item?.tag?.map((tagItem, index) => (
                <span key={index}>
                  {" "}
                  {index > 0 && ", "}
                  {tagItem}
                </span>
              ))}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
