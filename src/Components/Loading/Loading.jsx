import "./Loading.css";

export const Loading = ({ mini }) => {
  return (
    <div
      className="container loading"
      style={mini ? { height: "100%" } : { height: "100vh" }}
    >
      <div id="loading"></div>
    </div>
  );
};
