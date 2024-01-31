import { useContext, useState } from "react";
import "./Block4.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

// eslint-disable-next-line react/prop-types
export const Block4 = ({ summaries, more }) => {
  const updateViews = async (id) => {
    console.log(id);
    const story = doc(db, "stories", id);
    let storyInfo = await getDoc(story);
    console.log(storyInfo.data());
    let storyObject = storyInfo.data();

    const newCount = Number(storyObject.views) + 1;
    await updateDoc(story, { views: newCount });
  };

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
          index < more && (
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
                <p className="block-4-tags">
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
          )
      )}
    </div>
  );
};
