

import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const Enroll = (props) => {
  const [applicant, setApplicant] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    grade: "",
    faculty: "",
    nationality: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setApplicant({
      fullName: "",
      birthDate: "",
      email: "",
      grade: "",
      faculty: "",
      nationality: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.enroll(applicant).then((data) => {
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
        <h3>Please Apply</h3>
        <label htmlFor="fullName" className="sr-only">
          FullName:{" "}
        </label>
        <input
          type="text"
          name="fullName"
          value={applicant.fullName}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Full Name"
        />

        <label htmlFor="birthDate" className="sr-only">
          BirthDate:{" "}
        </label>
        <input
          type="Date"
          name="birthDate"
          value={applicant.birthDate}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Birth Date"
        />

        <label htmlFor="email" className="sr-only">
          Email:{" "}
        </label>
        <input
          type="text"
          name="email"
          value={applicant.email}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Email"
        />

        <label htmlFor="grade" className="sr-only">
          High School Grade:{" "}
        </label>
        <input
          type="text"
          name="grade"
          value={applicant.grade}
          onChange={onChange}
          className="form-control"
          placeholder="Enter High School Grade"
        />

        <label htmlFor="faculty" className="sr-only">
          Faculty:{" "}
        </label>
        <input
          type="text"
          name="faculty"
          value={applicant.faculty}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Faculty"
        />

        <label htmlFor="nationality" className="sr-only">
          Nationality:{" "}
        </label>
        <input
          type="text"
          name="nationality"
          value={applicant.nationality}
          onChange={onChange}
          className="form-control"
          placeholder="Enter Nationality"
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Apply Now!
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Enroll;
