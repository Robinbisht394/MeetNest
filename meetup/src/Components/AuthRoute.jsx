import React, { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { Navigate, replace } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" replace />;
    replace;
  }
  return children;
};

export default AuthRoute;
