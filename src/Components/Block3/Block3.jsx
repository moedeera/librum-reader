import { Link } from "react-router-dom";
import "./Block3.css";
import icon from "./icon1.svg";
import { useEffect, useState } from "react";

export const Block3 = ({ data }) => {
  const [info, setInfo] = useState({
    title: "Sed ut perspiciatis unde omnis iste natus",
    text: `
         Error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur,
        dipisci velit, sed quia non numquam eius modi tempora incidunt ut
        labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
        veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
        iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
        consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
    button: { link: "/", text: "More" },
  });

  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [data]);

  return (
    <div className="block-3-container">
      <div className="block-3-text">
        {" "}
        <h3>{info.title}</h3>
        <div className="block-3-segment">
          <p>{info.text}</p>
          {info.button && (
            <Link className="btn btn-primary" to={info.button.link}>
              {info.button.text}
            </Link>
          )}
        </div>
      </div>
      <div className="block-3-image">
        <img src={icon} alt="" />
      </div>
    </div>
  );
};
