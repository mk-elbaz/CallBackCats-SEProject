import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Admin  from './Components/Admin';
import Student  from './Components/Student';
import TA  from './Components/TA';
import Enroll from './Components/Enroll';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <UnPrivateRoute path="/enroll" component={Enroll}/>
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
<<<<<<< HEAD
<<<<<<< HEAD
     // <PrivateRoute path="/auth/requestResetPassword" roles={["admin","ta","student"]} component={ChangePassword}/>
=======
>>>>>>> parent of a4d945c (a)
=======
>>>>>>> parent of a4d945c (a)
      <PrivateRoute path="/ta" roles={["ta"]} component={TA}/>
      <PrivateRoute path="/student" roles={["student"]} component={Student}/>
    </Router>
  );
}

export default App;
