import { useContext, useState } from "react";
import "./Block1.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

export const Block1 = () => {
  const info = [
    {
      id: 1,
      cat: "Fiction",
      title: "The Quantum Mind",
      info: "The realms of quantum physics and the human mind have long been subjects of fascination and exploration in their respective domains. Yet, the intersection of these two enigmatic domains raises intriguing questions about the nature of consciousness itself.",
      link: "quantum-mind",
      tag: ["physics", "quantum", "mind"],
      pic: "https://images.pexels.com/photos/1.jpg",
      ref: "feienFSFxS4tXfplMD9Q-quantum-mind",
    },

    {
      id: 2,
      cat: "Non-fiction",
      title: "Journey to the Abyss",
      info: "A marine biologist recounts her deep-sea expedition to explore the mysteries of the ocean's abyss. From undiscovered creatures to ancient shipwrecks, her journey unveils the secrets hidden in the depths of the unexplored ocean.",
      link: "journey-to-abyss",
      tag: ["science", "exploration", "marine biology"],
      pic: "https://images.pexels.com/photos/2.jpg",
      ref: "q7WeDCiGAh5zg1b2EIzF",
    },
    {
      id: 3,
      cat: "Non-Fiction",
      title: "The Art of Innovation",
      info: "A business mogul reflects on the journey of creating groundbreaking innovations. From the initial spark of an idea to navigating challenges, this narrative provides insights into the art and science of fostering creativity",
      link: "art-of-innovation",
      tag: ["business", "innovation", "economics"],
      pic: "https://images.pexels.com/photos/3.jpg",
      ref: "3Zktmck8E77mUpxzVmRK",
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
          to={`/story/${item.ref}`}
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
