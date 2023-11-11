import { useState } from "react";

export const PasswordReset = () => {
  const [reset, setReset] = useState(false);

  const handleReset = async () => {
    console.log("reset");
    setReset(false);
  };
  return (
    <div className="profile-page-segment">
      <h4>Reset Password</h4>
      {reset ? (
        <>
          {" "}
          <p>Current Password</p>
          <input type="text" placeholder="Enter current password" />
          <p>New Password </p>
          <input type="password" placeholder="Enter current password" />
          <p>Re-enter New Password</p>
          <input type="text" placeholder="Enter current password" />
          <button className="btn btn-primary" onClick={handleReset}>
            Reset
          </button>
        </>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => {
            setReset(true);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
};
