import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../Context/Context";
import googleIcon from "./google.svg";

import { AuthContext } from "@/Context/AuthContext";
import { useAuth } from "@/utils/custom-hooks/useAuth";

export const LoginPage = () => {
  const { handleLogin, signInWithGoogleFunction, loading, error, setError } =
    useAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logUser, setLogUser] = useState({
    name: "",
    email: "",
    password: "",
  });

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

    setUser,
    profileInfo,
    setProfileInfo,
    loginWithEmailAndPassword,
  } = useContext(SiteContext);

  useEffect(() => {
    if (user && user !== null) {
      navigate("/home");
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
              signInWithGoogleFunction();
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
              handleLogin(logUser.email, logUser.password);
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
