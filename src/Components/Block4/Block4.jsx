import { useContext, useEffect, useState } from "react";
import "./Block4.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";
import { summarizeParagraph } from "../../assets/images/images";

// eslint-disable-next-line react/prop-types
export const Block4 = ({ summaries, showingAmount }) => {
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

  // console.log(formatFirebaseTimestamp(summaries[0].dateCreated));

  const [showingCount, setShowingCount] = useState(12);

  useEffect(() => {
    if (showingAmount) {
      setShowingCount(showingAmount);
    }
  }, []);

  const { imagesSorted, findImageSet } = useContext(SiteContext);

  return (
    <div className="block-4-container">
      {/* eslint-disable-next-line react/prop-types */}
      {summaries?.map(
        (item, index) =>
          index < showingCount && (
            <div className="block-4-segment" key={item.id}>
              <div className="block-1-segment-overlay"></div>
              <div className="overlay-image"></div>
              <div className="block-4-segment-text">
                <Link
                  to={`/story/${item.link}`}
                  onClick={() => {
                    // updateViews(item.ref, item.views);
                    console.log(item);
                  }}
                  className="block-4-segment-image"
                  style={{
                    backgroundImage: `url("${item.cover}")`,
                  }}
                ></Link>

                <small>{item.category}</small>

                <Link to={`/user/${item.authorLink}`}>
                  <small className="block-4-author-small">
                    By {item?.authorName}
                  </small>
                </Link>

                <div className="block-4-segment-stats">
                  <div k className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[0]} alt="" />
                    <small>{item.views}</small>
                  </div>

                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[1]} alt="" />
                    <small>{item.stats[2]}</small>
                  </div>

                  <div className="block-4-segment-stat">
                    <img src={findImageSet("icons", imagesSorted)[2]} alt="" />
                    <small>{item.likes}</small>
                  </div>

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
                  to={`/story/${item.link}`}
                  onClick={() => {
                    // updateViews(item.ref, item.views);
                    console.log("hello");
                  }}
                >
                  <h5>{item.title}</h5>
                </Link>

                <p
                  onClick={() => {
                    console.log(item);
                  }}
                >
                  {summarizeParagraph(item.synopsis)}{" "}
                </p>
                {/* <div className="btn">Read More</div> */}
                <p className="block-4-tags">
                  Tags:
                  {item?.tags?.map((tagItem, index) => (
                    <small key={index} className="block-4-tag">
                      {" "}
                      {/* {index > 0 && ", "} */}
                      {tagItem}
                    </small>
                  ))}
                </p>
              </div>
            </div>
          )
      )}
    </div>
  );
};
