import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

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

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>

        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
        {user.role === "admin" ? (
          <Link to="/createSchedule">
            <li className="nav-item nav-link">Schedules</li>
          </Link>
        ) : null}
        {user.role === "admin" ? (
          <Link to="/create-course">
            <li className="nav-item nav-link">Create Course</li>
          </Link>
        ) : null}
        {user.role === "admin"?(
          <Link to="/course-list">
            <li className="nav-item nav-link">Courses List</li>
          </Link>
        ) : null}
        {user.role === "student" ? (
          <Link to="/student">
            <li className="nav-item nav-link">Student</li>
          </Link>
        ) : null}
        {user.role === "student" ? (
          <Link to="/viewSchedule">
            <li className="nav-item nav-link">View Schedule</li>
          </Link>
        ) : null}
        {user.role === "student" ? (
          <Link to="/studentCourses">
            <li className="nav-item nav-link">Courses List</li>
          </Link>
        ) : null}
        {user.role === "ta" ? (
          <Link to="/ta">
            <li className="nav-item nav-link">TA</li>
          </Link>
        ) : null}
        {user.role === "ta" ? (
          <Link to="/taCourses">
            <li className="nav-item nav-link">Courses List</li>
          </Link>
        ) : null}
        {user.role === "ta" ||
        user.role === "admin" ||
        user.role === "student" ? (
          <Link to="/changePass">
            <li className="nav-item nav-link">Change Password</li>
          </Link>
        ) : null}
        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
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
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
