import { useContext, useState } from "react";
import "./Block1.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

export const Block1 = () => {
  const info = [
    {
      id: 1,
      cat: "Fiction",
      title: "The Enigmatic Chronicles",
      info: "In a forgotten library, a curious librarian stumbles upon a book with blank pages. As she delves into its mystery, she finds herself transported to different realms, uncovering the enigmatic stories within the empty pages.",
      link: "/enigmatic-chronicles",
      tag: ["fantasy", "mystery", "adventure"],
      pic: "https://images.pexels.com/photos/1.jpg",
    },

    {
      id: 2,
      cat: "Non-fiction",
      title: "Journey to the Abyss",
      info: "A marine biologist recounts her deep-sea expedition to explore the mysteries of the ocean's abyss. From undiscovered creatures to ancient shipwrecks, her journey unveils the secrets hidden in the depths of the unexplored ocean.",
      link: "/journey-to-abyss",
      tag: ["science", "exploration", "marine biology"],
      pic: "https://images.pexels.com/photos/2.jpg",
    },
    {
      id: 3,
      cat: "Fiction",
      title: "Echoes of Eternity",
      info: "In a dystopian future, a musician discovers a forbidden instrument that echoes the emotions of the past. As he plays, the melodies unravel a hidden truth about the society's oppressive regime and ignite a rebellion fueled by music.",
      link: "/echoes-of-eternity",
      tag: ["dystopia", "music", "rebellion"],
      pic: "https://images.pexels.com/photos/3.jpg",
    },
  ];
  const { imagesSorted, findImageSet } = useContext(SiteContext);

  const [hover, setHover] = useState([
    { id: 1, state: false },
    { id: 2, state: false },
    { id: 3, state: false },
  ]);

  return (
    <div className="block-1-container">
      {info.map((item, index) => (
        <Link
          // onMouseEnter={(item) => {
          onMouseEnter={() => {
            console.log(item);
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
            console.log(item);
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
          className="block-1-segment"
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
            <p>
              Tags:
              {item.tag.map((tagItem, index) => (
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
