import React, { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { Navigate, replace } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const { user, setUser, loading } = useContext(UserContext);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
    replace;
  }

  return children;
};

export default AuthRoute;
