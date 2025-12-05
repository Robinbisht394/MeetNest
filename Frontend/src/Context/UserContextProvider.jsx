import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(eventData);

  // get the logged-in user deatils from localstoage
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
