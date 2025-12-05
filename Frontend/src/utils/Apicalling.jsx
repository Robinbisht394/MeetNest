import React, { useEffect, useState } from "react";

const Apicalling = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const date = new Date();

  console.log(date.toDateString());

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/event/listAllEvents",
          {
            method: "GET",
          }
        );

        if (!response) return;
        // setData(response);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);
  return <div>Apicalling</div>;
};

export default Apicalling;
