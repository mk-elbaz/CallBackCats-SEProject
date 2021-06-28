import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const ChangePass = (props) => {
  const [user, setUser] = useState({  password: ""});
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
    setUser({ password: ""});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.changePass(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Change Your Pass</h3>
        <label htmlFor="password" className="sr-only">
          Password:{" "}
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter New Password"
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Change Password
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default ChangePass;
