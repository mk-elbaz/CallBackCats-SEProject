import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import  AuthContext from "../Context/AuthContext";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn === "")
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );

        if (!roles.includes(loggedIn))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
