import { getAuth, confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const auth = getAuth();

export const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get("oobCode");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    const auth = getAuth();
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("Password has been reset successfully.");
    } catch (error) {
      setMessage(`Error resetting password: ${error.message}`);
    }
  };

  return (
    <div className="container standard-page">
      <h3>Reset Password</h3>
      <form onSubmit={handlePasswordReset}>
        <div style={{ marginBottom: "10px" }}>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button type="submit" className="btn">
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
