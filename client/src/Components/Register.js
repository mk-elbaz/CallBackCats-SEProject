import axios from "axios";
import Select from "react-select";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [role, setRole] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        displayName,
        username,
        password,
        passwordVerify,
      };

      await axios.post("http://localhost:5000/user/register", registerData);

      await getLoggedIn();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  const optionsRole = [
    {
      key: "admin",
      label: "admin",
    },
    {
      key: "student",
      label: "student",
    },
    {
      key: "ta",
      label: "ta",
    },
  ];

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder=""
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Verify your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <Select
          name="role"
          value={role}
          onChange={setRole}
          options={optionsRole}
        ></Select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
