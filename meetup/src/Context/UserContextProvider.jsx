import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("userContext", user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, loading, eventData, setEventData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
