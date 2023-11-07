import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useContext } from "react";
import { SiteContext } from "../../Context/Context";

export const LoginPage = () => {
  const { imagesSorted, findImageSet } = useContext(SiteContext);
  return (
    <div className="container">
      <div className="login-container">
        <div className="login-form">
          <h3>Login </h3>
          <small>
            Don't have an account?{" "}
            <Link className="b" to={"/register"}>
              Create a new one
            </Link>
          </small>
          <p>Email</p>
          <input type="text" placeholder="Enter your email" />
          <p>Password</p>
          <input type="password" placeholder="Enter Your password" />
          <button className="btn btn-primary">Login</button>
        </div>
        <div
          className="login-form-image"
          style={{
            backgroundImage: `url(${findImageSet("library", imagesSorted)})`,
          }}
        >
          <div className="white-overlay">
            <h1>
              Start <br /> Immersing yourself in a{" "}
              <span className="title-span">Story</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
