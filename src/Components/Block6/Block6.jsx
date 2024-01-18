import "./Block6.css";
import img1 from "./invite.svg";
import img2 from "./buffer.svg";
import img3 from "./developer.svg";
import img4 from "./math.svg";
import { Link } from "react-router-dom";

export const Block6 = () => {
  const cards = [
    { name: "Improve Writing", image: img3 },
    { name: "Collaborate", image: img1 },
    { name: "Share Online", image: img2 },
    { name: "Non-Fiction", image: img4 },
  ];

  return (
    <div className="block-6-container">
      <small>Learn more</small>
      <h3>Get Inspired</h3>
      <div className="block-6-segments-container">
        {cards.map((card, index) => (
          <div key={index} className="block-6-segment">
            <img src={card.image} alt="" />
            <h4>{card.name}</h4>
            <p>
              A unique platform for writers of all levels to enhance their
              craft.
            </p>
            <Link className="btn" to={"/"}>
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
