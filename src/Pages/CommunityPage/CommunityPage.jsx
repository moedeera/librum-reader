import { Block3 } from "../../Components/Block3/Block3";
import { b3content } from "../../Context/Content";
import "./CommunityPage.css";

export const CommunityPage = () => {
  return (
    <div className="container standard-page">
      <Block3 data={b3content} />
    </div>
  );
};
