import React, { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { Navigate } from "react-router-dom";
const AuthRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;
