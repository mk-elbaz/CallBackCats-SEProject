import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import React, { useState, useRef, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Createschedule() {
  const [schedule, setschedule] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    day: "",
    faculty: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setschedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setschedule({
      first: "",
      second: "",
      third: "",
      fourth: "",
      day: "",
      faculty: "",
    });
  };

  const classes = useStyles();

  const Createschedules = () => {
    AuthService.createSchedule(schedule).then((data) => {
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
        <h3>Create Schedule</h3>
        <label htmlFor="first" className="sr-only">
          Username:{" "}
        </label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Username"
        />
        <label htmlFor="password" className="sr-only">
          Password:{" "}
        </label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Password"
        />
        <label htmlFor="role" className="sr-only">
          Role:{" "}
        </label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={onChange}
          className="form-control"
          placeholder="Enter role (admin/ta/student)"
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
}
