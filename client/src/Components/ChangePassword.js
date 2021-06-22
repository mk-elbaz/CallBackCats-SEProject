import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const ChangePassword = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ email: "", password: ""});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.changePassword(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {}, 2000);
      }
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please confirm your credentials</h3>
        <label htmlFor="email" className="sr-only">
          email:{" "}
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onChange}
          className="form-control"
          placeholder="Enter email"
        />
        <label htmlFor="password" className="sr-only">
          Password:{" "}
        </label>

        <h1>Change Password</h1>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter New Password"
        />
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default ChangePassword;
