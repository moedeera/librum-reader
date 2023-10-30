import { useContext, useState } from "react";
import "./Block1.css";
import { Link } from "react-router-dom";
import { SiteContext } from "../../Context/Context";

export const Block1 = () => {
  const info = [
    {
      id: 1,
      cat: "Fantasy 600",
      title: "Greenwood Castle",
      info: "Witch versus Vampires ",
      link: "/",
    },
    {
      id: 2,
      cat: "Education 800",
      title: "Patents: A Short History",
      info: "A quick summary of Patents in the US",
      link: "/",
    },
    {
      id: 3,
      cat: "Sci-fi 600",
      title: "Protocol Odyssey",
      info: "High space fantasy",
      link: "/",
    },
  ];
  const { imagesSorted, findImageSet } = useContext(SiteContext);

  const [hover, setHover] = useState([
    { id: 1, state: false },
    { id: 2, state: false },
    { id: 3, state: false },
  ]);

  return (
    <div className="block-1">
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
          </div>
        </Link>
      ))}
    </div>
  );
};
