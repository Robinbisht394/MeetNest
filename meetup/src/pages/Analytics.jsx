import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContextProvider";
import Charts from "../Components/Charts/Charts";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  plugins,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
  plugins,
  ArcElement
);
const Analytics = () => {
  const { user } = useContext(UserContext);
  // state variables for chart data
  const [likesData, setLikesData] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const [loading, setLoading] = useState(true);
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
          // console.log(res1.data.eventData, res2.data.eventData);
          setParticipantsData(res1?.data.eventData);
          setLikesData(res2?.data.eventData);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    };
    fetchAnalyticsDetails();
  }, []);

  let barData;
  let pieData;
  if (!loading) {
    barData = {
      labels: participantsData.map((event) => {
        return event.eventName;
      }),
      datasets: [
        {
          label: "Events",
          data: participantsData.map((event) => {
            return event.particpantsCount;
          }),

          backgroundColor: ["rgba(255,99,32,0.6)"],
          borderWidth: 1,
        },
      ],
    };

    pieData = {
      labels: likesData.map((event) => {
        return event.eventName;
      }),
      datasets: [
        {
          label: "likes",
          data: likesData.map((event) => {
            return event.likesCount;
          }),

          backgroundColor: [
            "rgba(255,99,132,0.6)",
            "rgba(255,132,132,0.7)",
            "rgba(255,99,54,0.6)",
            "rgba(160,99,132,0.6)",
            "rgba(255,99,30,0.6)",
          ],
          borderWidth: 2,
        },
      ],
    };
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Participants Per Event" },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Likes Per Event" },
    },
  };

  return (
    <div className="h-[100%] sm:p-10 p-5">
      {loading ? (
        <h1>Loading charts...</h1>
      ) : (
        <>
          <Charts type="bar" data={barData} options={barOptions} />
          <Charts type="pie" data={pieData} options={pieOptions} />
        </>
      )}
    </div>
  );
};

export default Analytics;
