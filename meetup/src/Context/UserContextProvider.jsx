import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext();
import axios from "axios";
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [eventData, setEventData] = useState({});
  const [savedEvent, setSavedEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("userContext", user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // const fetchSavedEvents = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         authorization: `Bearer ${user.token}`,
  //         role: user.role,
  //       },
  //     };

  //     const response = await axios.get("http://localhost:4000/api/user/saved");
  //     console.log(response);
  //     setSavedEvent(response?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {}, [savedEvent]);
  return (
    <UserContext.Provider
      value={{ user, setUser, loading, eventData, setEventData, savedEvent }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
