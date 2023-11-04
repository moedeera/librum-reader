import { Link } from "react-router-dom";
import "./Footer.css";
import { useContext } from "react";
import { SiteContext } from "../../Context/Context";

export const Footer = () => {
  const { menuItemsLG, menuAlt } = useContext(SiteContext);

  return (
    <div className="container footer">
      <div className="footer-container">
        <div className="footer-upper">
          <div className="footer-about">
            {" "}
            <h1>
              Get started with Librum<span className="header-span">Reader</span>
            </h1>
            <p>
              A unique platform for writers of all levels to enhance their
              craft. Dive into a world of creativity where you can read, write,
              and critique short stories with a vibrant community of like-minded
              individuals.
            </p>
            <Link to={"/"} className="btn btn-primary">
              {" "}
              Lets Collaborate
            </Link>
          </div>
          <div className="footer-links">
            <div className="link-set">
              {" "}
              <h4>Directory</h4>
              {menuItemsLG.map((item) => (
                <Link key={item.id} to={item.link}>
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="link-set">
              <h4>More</h4>
              {menuAlt.map((item) => (
                <Link key={item.id} to={item.link}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-lower"></div>
      </div>
    </div>
  );
};
