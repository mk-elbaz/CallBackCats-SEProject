import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import axios from 'axios'

const Navbar = (props) => {
  const { loggedIn , getLoggedIn} = useContext(AuthContext);

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-item nav-link">Register</li>
        </Link>
        <Link to="/enroll">
          <li className="nav-item nav-link">Apply Now!</li>
        </Link>
      </>
    );
  };

  async function logout() {
    try {
      await axios.get("http://localhost:5000/user/logout");

      await getLoggedIn();
    } catch (err) {
      console.error(err);
    }
  }

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>

        {loggedIn === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
        {loggedIn === "admin" ? (
          <Link to="/createSchedule">
            <li className="nav-item nav-link">Schedules</li>
          </Link>
        ) : null}
        {loggedIn === "admin" ? (
          <Link to="/create-student">
            <li className="nav-item nav-link">Create Student</li>
          </Link>
        ) : null}
        {loggedIn === "admin" ? (
          <Link to="/create-course">
            <li className="nav-item nav-link">Create Course</li>
          </Link>
        ) : null}
        {loggedIn === "admin" || loggedIn === "student" ? (
          <Link to="/course-list">
            <li className="nav-item nav-link">Courses List</li>
          </Link>
        ) : null}
        {loggedIn === "ta" ? (
          <Link to="/student-list">
            <li className="nav-item nav-link">Student List</li>
          </Link>
        ) : null}
        {loggedIn === "student" ? (
          <Link to="/student">
            <li className="nav-item nav-link">Student</li>
          </Link>
        ) : null}
        {loggedIn === "student" ? (
          <Link to="/viewSchedule">
            <li className="nav-item nav-link">View Schedule</li>
          </Link>
        ) : null}
        {loggedIn === "ta" ? (
          <Link to="/ta">
            <li className="nav-item nav-link">TA</li>
          </Link>
        ) : null}
        {loggedIn === "ta" ||
        loggedIn === "admin" ||
        loggedIn === "student" ? (
          <Link to="/changePass">
            <li className="nav-item nav-link">Change Password</li>
          </Link>
        ) : null}
        
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <div className="navbar-brand">GIU</div>
      </Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {loggedIn === "" ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
