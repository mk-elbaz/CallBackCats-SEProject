import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify, setNewPasswordVerify] = useState("");

  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function changePass(e) {
    e.preventDefault();

    try {
      const changePassData = {
        password,
        newPassword,
        newPasswordVerify
      };

      await axios.put("http://localhost:5000/user/changePassword", changePassData);
      
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      <form onSubmit={changePass}>
        
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          onChange={(e) => setNewPasswordVerify(e.target.value)}
          value={newPasswordVerify}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;