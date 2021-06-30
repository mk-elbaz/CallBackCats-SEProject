import React from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import CreateSchedule from "./Components/createschedule";
import ViewSchedule from "./Components/showschedule";
import Student from "./Components/Student";
import TA from "./Components/TA";
import Enroll from "./Components/Enroll";

import CreateStudent from "./Components/create-student.component";
import EditStudent from "./Components/edit-student.component";
import EditCourse from "./Components/edit-course.component";
import StudentList from "./Components/student-list.component";
import CourseList from "./Components/course-list.component";
import CreateCourse from "./Components/create-course.component";

import ChangePassword from "./Components/ChangePassword";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <UnPrivateRoute path="/enroll" component={Enroll} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
      <PrivateRoute
        path="/createSchedule"
        roles={["admin"]}
        component={CreateSchedule}
      />

      <PrivateRoute
        path="/create-student"
        roles={["admin"]}
        component={CreateStudent}
      />
      <PrivateRoute
        path="/create-course"
        roles={["admin"]}
        component={CreateCourse}
      />
      <PrivateRoute
        path="/course-list"
        roles={["admin"]}
        component={CourseList}
      />
      <PrivateRoute
        path="/student-list"
        roles={["ta"]}
        component={StudentList}
      />
      <PrivateRoute
        path="/edit-course"
        roles={["admin"]}
        component={EditCourse}
      />
      <PrivateRoute
        path="/edit-student"
        roles={["ta"]}
        component={EditStudent}
      />

      <PrivateRoute
        path="/viewSchedule"
        roles={["student"]}
        component={ViewSchedule}
      />
      <PrivateRoute
        path="/changePass"
        roles={["admin", "ta", "student"]}
        component={ChangePassword}
      />
      <PrivateRoute path="/ta" roles={["ta"]} component={TA} />
      <PrivateRoute path="/student" roles={["student"]} component={Student} />
    </Router>
  );
}

export default App;
