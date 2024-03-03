import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../Context/Context";
import googleIcon from "./google.svg";
import { signInWithGoogleFunction } from "../../assets/APIs/UserAPIs";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const onChangeHandler = (e, type, userInfo, setUserInfo) => {
    if (type === "name") {
      setUserInfo({ ...userInfo, name: e.target.value });
    } else if (type === "email") {
      setUserInfo({ ...userInfo, email: e.target.value });
    } else if (type === "password") {
      setUserInfo({ ...userInfo, password: e.target.value });
    }
  };

  const {
    imagesSorted,
    findImageSet,
    user,
    setUser,
    profileInfo,
    setProfileInfo,
    loginWithEmailAndPassword,
  } = useContext(SiteContext);

  useEffect(() => {
    if (user && user !== null && profileInfo && profileInfo !== null) {
      navigate("/");
      return;
    }
  }, [user, navigate, profileInfo]);

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-form">
          <h3>Sign in </h3>
          <button
            onClick={() => {
              signInWithGoogleFunction(setProfileInfo, setUser);
            }}
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
            Do not have an account?{" "}
            <Link className="b" to={"/register"}>
              Create a new one
            </Link>
          </small>
          <p>Email</p>
          <input
            name="email"
            type="email"
            value={logUser.email}
            onChange={(e) => {
              onChangeHandler(e, "email", logUser, setLogUser);
            }}
            placeholder="Enter your email"
          />
          <p>Password</p>
          <input
            name="password"
            type="password"
            value={logUser.password}
            onChange={(e) => {
              onChangeHandler(e, "password", logUser, setLogUser);
            }}
            placeholder="Enter Your password"
          />
          <p style={{ color: "crimson" }}>{error}</p>
          <button
            onClick={() => {
              setError("");
              loginWithEmailAndPassword(logUser, navigate, "/", setError);
            }}
            className="btn btn-primary btn-form"
          >
            Login
          </button>
        </div>
        <div
          className="login-form-image"
          style={{
            backgroundImage: `url(${findImageSet("library", imagesSorted)})`,
          }}
        >
          <div className="white-overlay">
            <h1>
              Immerse <br /> in Amazing{" "}
              <span className="title-span">Literature</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
