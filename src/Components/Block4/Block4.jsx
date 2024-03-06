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

  function processNumber(num) {
    if (num <= 200) {
      return 1;
    } else {
      // Divides the number by 200 and rounds to the nearest whole number
      return Math.round(num / 200);
    }
  }

  function formatFirebaseTimestamp(firebaseTimestamp) {
    const date = firebaseTimestamp.toDate();

    // Create a custom format "YYYY-MM-DD HH:MM"
    const formatted =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    return formatted;
  }

  console.log(formatFirebaseTimestamp(summaries[0].dateCreated));

  const [showingCount, setShowingCount] = useState(12);

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
      {summaries?.map(
        (item, index) =>
          index < showingCount && (
            <div
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
                <Link
                  to={`/story/${item.slug}`}
                  onClick={() => {
                    updateViews(item.ref, item.views);
                    // console.log(item);
                  }}
                  className="block-4-segment-image"
                  style={{
                    backgroundImage: `url("${item.pic}")`,
                  }}
                ></Link>

                {/* <small>{item.cat}</small> */}

                <Link to={`/user/${item.author}`}>
                  <small className="block-4-author-small">
                    By {item?.author}
                  </small>
                </Link>

                <div className="block-4-segment-stats">
                  {item?.stats.map((item, index) => (
                    <div key={index} className="block-4-segment-stat">
                      <img
                        src={findImageSet("icons", imagesSorted)[index]}
                        alt=""
                      />
                      <small>{item}</small>
                    </div>
                  ))}

                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[3]} alt="" />
                    <small>{processNumber(item.wordCount)} min</small>
                  </div>
                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[4]} alt="" />
                    <small>
                      {formatFirebaseTimestamp(item.dateCreated).slice(2, 10)}
                    </small>
                  </div>
                </div>

                <Link
                  to={`/story/${item.slug}`}
                  onClick={() => {
                    updateViews(item.ref, item.views);
                  }}
                >
                  <h5>{item.title}</h5>
                </Link>

                <p
                  onClick={() => {
                    console.log(item);
                  }}
                >
                  {summarizeParagraph(item.info)}{" "}
                </p>
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
            </div>
          )
      )}
    </div>
  );
};
