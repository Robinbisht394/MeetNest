import React, { useContext, useEffect } from "react";

import axios from "axios";
import { UserContext } from "../Context/UserContextProvider";
const Analytics = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchAnalyticsDetails = () => {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };
      Promise.all([
        axios.get(
          "http://localhost:4000/api/analytics/participants-per-event",
          config
        ),
        axios.get(
          "http://localhost:4000/api/analytics/likes-per-event",
          config
        ),
      ])
        .then(([res1, res2]) => {
          console.log(res1.data, res2.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(res1, res2);
    };
    fetchAnalyticsDetails();
  }, []);
  return (
    <div>
      <div>Participants Per event</div>
      <div>likes Per Event</div>
    </div>
  );
};

export default Analytics;
