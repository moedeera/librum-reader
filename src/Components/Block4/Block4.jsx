import { useContext, useState } from "react";
import "./Block4.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

export const Block4 = () => {
  const { storiesInfo, imagesSorted, findImageSet, setStory } =
    useContext(SiteContext);
  const [hover, setHover] = useState([
    { id: 1, state: false },
    { id: 2, state: false },
    { id: 3, state: false },
    { id: 4, state: false },
    { id: 5, state: false },
    { id: 6, state: false },
  ]);

  return (
    <div className="block-4-container">
      {" "}
      {storiesInfo.map((item, index) => (
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
          to={item.link}
          onClick={() => {
            setStory(item.name);
            console.log("set");
          }}
          className="block-4-segment"
          key={item.id}
        >
          <div className="block-1-segment-overlay"></div>
          <div
            className="overlay-image"
            style={
              hover[index].state
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
          <div className="block-1-segment-text">
            <small>{item.cat}</small>
            <h4>{item.title}</h4>
            <p>{item.info}</p>
            <div className="btn">Read More</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
