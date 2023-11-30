import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useContext, useState } from "react";
import { SiteContext } from "../../Context/Context";
import { Loading } from "../../Components/Loading/Loading";
export const Register = () => {
  const { registerWithEmailAndPassword, isEmailValid, setUser } =
    useContext(SiteContext);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e, type, userInfo, setUserInfo) => {
    if (type === "name") {
      setUserInfo({ ...userInfo, name: e.target.value });
    } else if (type === "email") {
      setUserInfo({ ...userInfo, email: e.target.value });
    } else if (type === "password") {
      setUserInfo({ ...userInfo, password: e.target.value });
    } else if (type === "repeat-password") {
      const newPasswordRepeat = e.target.value;
      setUserInfo({ ...userInfo, passwordRepeat: newPasswordRepeat });

      if (userInfo.password === newPasswordRepeat) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
  };

  const handleSubmit = async () => {
    const checkEmail = isEmailValid(newUser.email);

    console.log(newUser.email);
    if (!checkEmail) {
      alert("invalid email");
      return;
    }
    if (newUser.name === "") {
      alert("Please Enter a Name");
      return;
    }
    if (
      !passwordsMatch ||
      newUser.password === "" ||
      newUser.password.length > 6
    ) {
      alert(
        "Please make sure passwords match and are at least 6 characters in lenght"
      );
      return;
    }

    const response = registerWithEmailAndPassword(newUser);

    setLoading(true);
    if (response) {
      setLoading(false);
      setUser({
        email: newUser.email,
        name: newUser.name,
      });
      navigate("/profile");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="register-container">
        <div className="register-form">
          <h3>Register </h3>
          <small>
            ALready have an account?{" "}
            <Link className="login-account" to={"/login"}>
              Login
            </Link>
          </small>
          <p>Email</p>
          <input
            name="name"
            type="email"
            value={newUser.email}
            onChange={(e) => {
              onChangeHandler(e, "email", newUser, setNewUser);
            }}
            placeholder="Enter your Name"
          />
          <p>Name</p>
          <input
            name="name"
            type="text"
            value={newUser.name}
            onChange={(e) => {
              onChangeHandler(e, "name", newUser, setNewUser);
            }}
            placeholder="Enter your email"
          />

          <p>Password</p>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={newUser.password}
            onChange={(e) => {
              onChangeHandler(e, "password", newUser, setNewUser);
            }}
            placeholder="Enter a password"
          />
          <p>Re-enter your Password</p>
          <input
            name="passwordRepeat"
            type={showPassword ? "text" : "password"}
            value={newUser.passwordRepeat}
            onChange={(e) => {
              onChangeHandler(e, "repeat-password", newUser, setNewUser);
            }}
            placeholder="Enter a password"
          />
          {passwordsMatch ? "" : <small>Passwords don't match</small>}
          <small
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? "Hide" : "Show Password"}
          </small>
          <button onClick={handleSubmit} className="btn btn-primary btn-form">
            register
          </button>
        </div>
        {/* <div className="register-form-image">
      <div className="white-overlay">
        <h1>
          Start <br /> Immersing yourself in a{" "}
          <span className="title-span">Story</span>
        </h1>
      </div>
    </div> */}
      </div>
    </div>
  );
};
