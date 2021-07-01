import React from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import CreateSchedule from "./Components/createschedule";
import ViewSchedule from "./Components/showschedule";
import Student from "./Components/Student";
import StudentCourses from "./Components/StudentCoursesList";
import StudentGrade from "./Components/StudentGrade";
import TACourses from "./Components/TACourseList";
import TA from "./Components/TA";
import Enroll from "./Components/Enroll";

import EditStudent from "./Components/edit-student.component";
import EditCourse from "./Components/edit-course.component";
import ViewCourse from "./Components/view-course.component";
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

      <PrivateRoute
        path="/edit-student/:id"
        roles={["ta"]}
        component={EditStudent}
      />
      <PrivateRoute
        path="/edit-course/:id"
        roles={["admin"]}
        component={EditCourse}
      />
      <PrivateRoute
        path="/view-course/:id"
        roles={["admin", "student"]}
        component={ViewCourse}
      />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
      <PrivateRoute
        path="/createSchedule"
        roles={["admin"]}
        component={CreateSchedule}
      />
      <PrivateRoute
        path="/studentCourseGrade"
        roles={["student"]}
        component={StudentGrade}
      />
      <PrivateRoute
        path="/studentCourses"
        roles={["student"]}
        component={StudentCourses}
      />
      <PrivateRoute
        path="/taCourses"
        roles={["ta"]}
        component={TACourses}
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
