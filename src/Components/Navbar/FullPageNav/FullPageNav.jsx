import "./FullPageNav.css";

export const FullPageNav = ({ showFullMenu }) => {
  return (
    <div className="full-page-navbar-container">
      <div className="full-page-navbar">
        <div className="navbar-header">
          <span className="header-span-light">Librum</span>
          <span className="header-span">Reader</span>.
        </div>
        <div
          className="navbar-close"
          onClick={() => {
            showFullMenu(false);
          }}
        >
          <div className="close-x-line segment-r"></div>
          <div className="close-x-line segment-l"></div>
        </div>
      </div>
      <div className="full-pag-grid"></div>
    </div>
  );
};
