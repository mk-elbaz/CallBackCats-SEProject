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
        <label htmlFor="day" className="sr-only">
          day:{" "}
        </label>
        <input
          type="text"
          name="day"
          value={schedule.day}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first" className="sr-only">
          first:{" "}
        </label>
        <input
          type="text"
          name="first"
          value={schedule.first}
          onChange={onChange}
          className="form-control"
          placeholder="Enter First Slot"
        />
         <label htmlFor="second" className="sr-only">
          second:{" "}
        </label>
        <input
          type="text"
          name="second"
          value={schedule.second}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Second Slot"
        />
         <label htmlFor="third" className="sr-only">
          third:{" "}
        </label>
        <input
          type="text"
          name="third"
          value={schedule.third}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth" className="sr-only">
          fourth:{" "}
        </label>
        <input
          type="text"
          name="fourth"
          value={schedule.fourth}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Fourth Slot"
        />
         <label htmlFor="faculty" className="sr-only">
          faculty:{" "}
        </label>
        <input
          type="text"
          name="faculty"
          value={schedule.faculty}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Faculty"
        />
        
        
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
}
