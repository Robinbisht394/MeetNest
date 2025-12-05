import React, { useContext, useEffect, useState, useMemo } from "react";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { user } = useContext(UserContext);

  const [likesData, setLikesData] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.token) return;

    const fetchAnalyticsDetails = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          role: user.role,
        },
      };

      try {
        const [res1, res2] = await Promise.all([
          axios.get(
            "http://localhost:4000/api/analytics/participants-per-event",
            config
          ),
          axios.get(
            "http://localhost:4000/api/analytics/likes-per-event",
            config
          ),
        ]);
        setParticipantsData(res1?.data.eventData || []);
        setLikesData(res2?.data.eventData || []);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsDetails();
  }, [user]);

  // Memoized bar chart data
  const barData = useMemo(
    () => ({
      labels: participantsData.map((event) => event.eventName),
      datasets: [
        {
          label: "Participants",
          data: participantsData.map((event) => event.particpantsCount),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderWidth: 1,
        },
      ],
    }),
    [participantsData]
  );

  // Memoized pie chart data
  const pieData = useMemo(
    () => ({
      labels: likesData.map((event) => event.eventName),
      datasets: [
        {
          label: "Likes",
          data: likesData.map((event) => event.likesCount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderWidth: 2,
        },
      ],
    }),
    [likesData]
  );

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: window.innerWidth < 640 ? 10 : 14,
          },
        },
      },
    },
  };

  const barOptions = useMemo(
    () => ({
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        title: { display: true, text: "Participants Per Event" },
      },
    }),
    []
  );

  const pieOptions = useMemo(
    () => ({
      ...baseOptions,
      plugins: {
        ...baseOptions.plugins,
        title: { display: true, text: "Likes Per Event" },
      },
    }),
    []
  );

  return (
    <div className="h-full sm:p-10 p-4">
      {loading ? (
        <h1 className="text-center text-lg font-semibold">Loading charts...</h1>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 grid-cols-1 h-[80vh]">
          <div className="bg-white shadow-md rounded-lg p-4">
            <Charts type="bar" data={barData} options={barOptions} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Charts type="pie" data={pieData} options={pieOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
