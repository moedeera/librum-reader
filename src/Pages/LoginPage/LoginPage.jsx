import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useContext, useEffect } from "react";
import { SiteContext } from "../../Context/Context";
import googleIcon from "./google.svg";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { imagesSorted, findImageSet, user, signInWithGoogleFunction } =
    useContext(SiteContext);

  useEffect(() => {
    if (user) {
      navigate("/admin");
      // return;
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-form">
          <h3>Sign in </h3>
          <button
            onClick={signInWithGoogleFunction}
            className="btn btn-white btn-google"
          >
            {" "}
            <p>
              <img className="icon-image" src={googleIcon} alt="googleIcon" />
              Login with Google{" "}
            </p>
          </button>
          <h4>Or</h4>
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
          <button className="btn btn-primary btn-form">Login</button>
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
