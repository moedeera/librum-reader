import { Link } from "react-router-dom";
import "./Register.css";
export const Register = () => {
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
          <input type="text" placeholder="Enter your email" />
          <p>Name</p>
          <input type="text" placeholder="Enter your Name" />
          <p>Password</p>
          <input type="password" placeholder="Enter a password" />
          <p>Re-enter your Password</p>
          <input type="password" placeholder="Enter a password" />
          <button className="btn btn-primary">register</button>
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
