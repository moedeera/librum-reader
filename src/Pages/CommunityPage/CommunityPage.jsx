import { Block1 } from "../../Components/Block1/Block1";
import { Block3 } from "../../Components/Block3/Block3";
import { b3content } from "../../Context/Content";
import "./CommunityPage.css";

export const CommunityPage = () => {
  return (
    <div className="container community-page standard-page">
      <h3>Join the Community</h3>
      <Block3 data={b3content} />
      <Block1 />
    </div>
  );
};
