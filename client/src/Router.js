import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ChangePassword from "./Components/ChangePassword";
import AuthContext from "./Context/AuthContext";


function Router() {

    
    const {getLoggedIn} = useContext(AuthContext);

    

    return(
        
    <BrowserRouter>
    <Navbar/>
    <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route exact path="/changePassword">
          <ChangePassword/>
        </Route>
        
    </Switch>
    </BrowserRouter>
    )
}


export default Router;