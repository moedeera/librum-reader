import "./Loading.css";

export const Loading = ({ mini }) => {
  // if (mini) {
  //   return  <div className={mini ? "loading" : "container loading"}
  //   style={mini ? { height: "100%" } : { height: "100vh" }}
  // >
  //   <div id="loading"></div>
  // </div>
  // }

  return (
    <div
      className={mini ? "loading" : "container loading"}
      style={mini ? { height: "100%" } : { height: "100vh" }}
    >
      <div id="loading"></div>
    </div>
  );
};
