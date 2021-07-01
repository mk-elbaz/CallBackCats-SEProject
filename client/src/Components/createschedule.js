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
    first1: "",
    second1: "",
    third1: "",
    fourth1: "",
    day1: "",
    faculty: "",

    first2: "",
    second2: "",
    third2: "",
    fourth2: "",
    day2: "",
    

    first3: "",
    second3: "",
    third3: "",
    fourth3: "",
    day3: "",

    first4: "",
    second4: "",
    third4: "",
    fourth4: "",
    day4: "",

    first5: "",
    second5: "",
    third5: "",
    fourth5: "",
    day5: "",
    
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
      first1: "",
    second1: "",
    third1: "",
    fourth1: "",
    day1: "",
    faculty: "",

    first2: "",
    second2: "",
    third2: "",
    fourth2: "",
    day2: "",
    

    first3: "",
    second3: "",
    third3: "",
    fourth3: "",
    day3: "",

    first4: "",
    second4: "",
    third4: "",
    fourth4: "",
    day4: "",

    first5: "",
    second5: "",
    third5: "",
    fourth5: "",
    day5: "",
    });
  };

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.createSchedule(schedule).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Create Schedule</h3>
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
        <label htmlFor="day" className="sr-only">
          day1:{" "}
        </label>
        <input
          type="text"
          name="day"
          value={schedule.day}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first1" className="sr-only">
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
          second1:{" "}
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
          third1:{" "}
        </label>
        <input
          type="text"
          name="third"
          value={schedule.third}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth1" className="sr-only">
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

        <p></p>
        <p></p>
        
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Add Schedule
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
}
