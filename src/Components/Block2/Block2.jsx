import "./Block2.css";
import { Link } from "react-router-dom";
export const Block2 = ({ dataInfo }) => {
  let info = dataInfo ?? {
    title: "Lorem ipsum dolor sit amet",
    part1:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est",
    part2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    link: { to: "/", text: "More" },
  };

  return (
    <div className="block-2-container">
      <h3>{info.title}</h3>
      <div className="block-2-segments-container">
        <div className="block-2-segment">
          <p>{info.part1}</p>
        </div>
        <div className="block-2-segment">
          <p>{info.part2}</p>

          {info.link && (
            <Link to={info.link.to} className="btn">
              {info.link.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
