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
        <label htmlFor="day1" className="sr-only">
          day1:{" "}
        </label>
        <input
          type="text"
          name="day1"
          value={schedule.day1}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first1" className="sr-only">
          first1:{" "}
        </label>
        <input
          type="text"
          name="first1"
          value={schedule.first1}
          onChange={onChange}
          className="form-control"
          placeholder="Enter First Slot"
        />
         <label htmlFor="second1" className="sr-only">
          second1:{" "}
        </label>
        <input
          type="text"
          name="second1"
          value={schedule.second1}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Second Slot"
        />
         <label htmlFor="third1" className="sr-only">
          third1:{" "}
        </label>
        <input
          type="text"
          name="third1"
          value={schedule.third1}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth1" className="sr-only">
          fourth1:{" "}
        </label>
        <input
          type="text"
          name="fourth1"
          value={schedule.fourth1}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Fourth Slot"
        />

        <p></p>
        <p></p>

<label htmlFor="day2" className="sr-only">
          day2:{" "}
        </label>
        <input
          type="text"
          name="day2"
          value={schedule.day2}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first2" className="sr-only">
          first2:{" "}
        </label>
        <input
          type="text"
          name="first2"
          value={schedule.first2}
          onChange={onChange}
          className="form-control"
          placeholder="Enter First Slot"
        />
         <label htmlFor="second2" className="sr-only">
          second2:{" "}
        </label>
        <input
          type="text"
          name="second2"
          value={schedule.second2}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Second Slot"
        />
         <label htmlFor="third2" className="sr-only">
          third2:{" "}
        </label>
        <input
          type="text"
          name="third2"
          value={schedule.third2}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth2" className="sr-only">
          fourth2:{" "}
        </label>
        <input
          type="text"
          name="fourth2"
          value={schedule.fourth2}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Fourth Slot"
        />

        <p></p>
        <p></p>

<label htmlFor="day3" className="sr-only">
          day3:{" "}
        </label>
        <input
          type="text"
          name="day3"
          value={schedule.day3}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first3" className="sr-only">
          first3:{" "}
        </label>
        <input
          type="text"
          name="first3"
          value={schedule.first3}
          onChange={onChange}
          className="form-control"
          placeholder="Enter First Slot"
        />
         <label htmlFor="second3" className="sr-only">
          second3:{" "}
        </label>
        <input
          type="text"
          name="second3"
          value={schedule.second3}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Second Slot"
        />
         <label htmlFor="third3" className="sr-only">
          third3:{" "}
        </label>
        <input
          type="text"
          name="third3"
          value={schedule.third3}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth3" className="sr-only">
          fourth3:{" "}
        </label>
        <input
          type="text"
          name="fourth3"
          value={schedule.fourth3}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Fourth Slot"
        />

        <p></p>
        <p></p>


<label htmlFor="day4" className="sr-only">
          day4:{" "}
        </label>
        <input
          type="text"
          name="day4"
          value={schedule.day4}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first4" className="sr-only">
          first4:{" "}
        </label>
        <input
          type="text"
          name="first4"
          value={schedule.first4}
          onChange={onChange}
          className="form-control"
          placeholder="Enter First Slot"
        />
         <label htmlFor="second4" className="sr-only">
          second4:{" "}
        </label>
        <input
          type="text"
          name="second4"
          value={schedule.second4}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Second Slot"
        />
         <label htmlFor="third4" className="sr-only">
          third4:{" "}
        </label>
        <input
          type="text"
          name="third4"
          value={schedule.third4}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth4" className="sr-only">
          fourth4:{" "}
        </label>
        <input
          type="text"
          name="fourth4"
          value={schedule.fourth4}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Fourth Slot"
        />

        <p></p>
        <p></p>

<label htmlFor="day5" className="sr-only">
          day5:{" "}
        </label>
        <input
          type="text"
          name="day5"
          value={schedule.day5}
          onChange={onChange}
          className="form-control"
          placeholder="Enter The Day"
        />
        <label htmlFor="first5" className="sr-only">
          first5:{" "}
        </label>
        <input
          type="text"
          name="first5"
          value={schedule.first5}
          onChange={onChange}
          className="form-control"
          placeholder="Enter First Slot"
        />
         <label htmlFor="second5" className="sr-only">
          second5:{" "}
        </label>
        <input
          type="text"
          name="second5"
          value={schedule.second5}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Second Slot"
        />
         <label htmlFor="third5" className="sr-only">
          third5:{" "}
        </label>
        <input
          type="text"
          name="third5"
          value={schedule.third5}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Third Slot"
        />
         <label htmlFor="fourth5" className="sr-only">
          fourth5:{" "}
        </label>
        <input
          type="text"
          name="fourth5"
          value={schedule.fourth5}
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
