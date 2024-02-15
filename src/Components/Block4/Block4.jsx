import { useContext, useEffect, useState } from "react";
import "./Block4.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";
import { summarizeParagraph } from "../../assets/images/images";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

// eslint-disable-next-line react/prop-types
export const Block4 = ({ summaries, showingAmount }) => {
  const dummyImageUrl =
    "https://images.pexels.com/photos/20197333/pexels-photo-20197333/free-photo-of-a-man-in-cowboy-hat-riding-a-horse-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  const updateViews = async (id) => {
    console.log(id);
    const story = doc(db, "stories", id);
    let storyInfo = await getDoc(story);
    console.log(storyInfo.data());
    let storyObject = storyInfo.data();

    const newCount = Number(storyObject.views) + 1;
    await updateDoc(story, { views: newCount });
  };
  const [showingCount, setShowingCount] = useState(4);

  useEffect(() => {
    if (showingAmount) {
      setShowingCount(showingAmount);
    }
  }, []);

  const { imagesSorted, findImageSet } = useContext(SiteContext);
  const [hover, setHover] = useState(
    /* eslint-disable-next-line react/prop-types */
    new Array(summaries.length).fill({ id: summaries.id, state: false })
  );
  /* eslint-disable-next-line react/prop-types */

  return (
    <div className="block-4-container">
      {/* eslint-disable-next-line react/prop-types */}
      {summaries.map(
        (item, index) =>
          index < showingCount && (
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
                <div
                  className="block-4-segment-image"
                  style={{
                    backgroundImage: `url("${item.pic}")`,
                  }}
                ></div>

                {/* <small>{item.cat}</small> */}
                <small>By {item?.author}</small>
                <div className="block-4-segment-stats">
                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
                    <small>13</small>
                  </div>
                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
                    <small>13</small>
                  </div>
                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
                    <small>0</small>
                  </div>
                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[3]} alt="" />
                    <small>3 min</small>
                  </div>
                </div>
                <h5>{item.title}</h5>
                <p>{summarizeParagraph(item.info)} </p>
                {/* <div className="btn">Read More</div> */}
                <p className="block-4-tags">
                  Tags:
                  {item?.tag?.map((tagItem, index) => (
                    <span key={index} className="block-4-tag">
                      {" "}
                      {/* {index > 0 && ", "} */}
                      {tagItem}
                    </span>
                  ))}
                </p>
              </div>
            </Link>
          )
      )}
    </div>
  );
};
