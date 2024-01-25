import "./Block6.css";
import img1 from "./invite.svg";
import img2 from "./buffer.svg";
import img3 from "./developer.svg";
import img4 from "./math.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Block6 = ({ input, alt }) => {
  const [cards, setCards] = useState([
    {
      name: "Improve Writing",
      text: " A unique platform for writers of all levels to enhance their craft.",
      image: img3,
      link: "/",
    },
    {
      name: "Collaborate",
      text: " A unique platform for writers of all levels to enhance their craft.",
      image: img1,
      link: "/",
    },
    {
      name: "Share Online",
      text: " A unique platform for writers of all levels to enhance their craft.",
      image: img2,
      link: "/",
    },
    {
      name: "Non-Fiction",
      text: " A unique platform for writers of all levels to enhance their craft.",
      image: img4,
      link: "/",
    },
  ]);

  useEffect(() => {
    if (input) {
      setCards(input);
    }
  }, []);

  return (
    <div className="block-6-container">
      {alt === 1 ? (
        ""
      ) : (
        <>
          {" "}
          <small>Learn more</small>
          <h3>Get Inspired</h3>
          <p>
            {" "}
            A unique platform for writers of all levels to enhance their craft.
            A unique platform for writers of all levels to enhance their craft.
            A unique platform for writers of all levels to enhance their craft.
            A unique platform for writers of all levels to enhance their craft.
          </p>
        </>
      )}

      <div className="block-6-segments-container">
        {cards.map((card, index) => (
          <div key={index} className="block-6-segment">
            <div>
              {" "}
              <img src={card.image} alt="" />
            </div>

            <div>
              {" "}
              <h4>{card.name}</h4>
              <p>{card.text}</p>{" "}
              <Link className="btn btn-alt" to={"/"}>
                Learn More <span>{" > "}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
