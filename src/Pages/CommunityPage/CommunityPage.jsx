import { Block1 } from "../../Components/Block1/Block1";
import { Block3 } from "../../Components/Block3/Block3";
import { b3content, communityPageContent } from "../../Context/Content";
import "./CommunityPage.css";

export const CommunityPage = () => {
  return (
    <div className="container community-page">
      <div className="community-page">
        <h3 className="community-page-header">Join the Community</h3>
        <Block3 data={communityPageContent} />
        <Block1 />
        <Block3 data={b3content} />
      </div>
    </div>
  );
};
