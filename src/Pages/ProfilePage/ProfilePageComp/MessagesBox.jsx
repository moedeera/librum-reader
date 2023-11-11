import { Link } from "react-router-dom";
export const MessagesBox = () => {
  return (
    <div className="profile-page-segment">
      <h4>Messages (1 unread)</h4>
      <div className="latest">
        <h5>Latest Message</h5>
        <small>From:JJ smith</small>
        <small style={{ fontStyle: "italic" }}>Dec 12 2023</small>
        <p className="latest-message">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo
        </p>
      </div>
      <div className="all">
        <Link to={"/messages"} className="btn btn-primary">
          See All
        </Link>
      </div>
    </div>
  );
};
