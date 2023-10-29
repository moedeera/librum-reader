import "./Block1.css";
import { Link } from "react-router-dom";

export const Block1 = () => {
  const info = [
    {
      id: 1,
      cat: "Fantasy",
      title: "Greenwood Castle",
      info: "Witch versus Vampires ",
      link: "/",
    },
    {
      id: 2,
      cat: "Education",
      title: "Patents: A Short History",
      info: "A quick summary of Patents in the US",
      link: "/",
    },
    {
      id: 3,
      cat: "Sci-fi",
      title: "Protocol Odyssey",
      info: "High space fantasy",
      link: "/",
    },
  ];
  return (
    <div className="block-1">
      {info.map((item) => (
        <Link to={item.link} className="block-1-segment" key={item.id}>
          <div className="block-1-segment-text">
            <small>{item.cat}</small>
            <h3>{item.title}</h3>
            <p>{item.info}</p>
            <div className="btn">Read More</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
