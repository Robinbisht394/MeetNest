import React, { useEffect, useState } from "react";

const UseFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);

  //   fetch the api

  useEffect(() => {
    const fetchApiCall = async (url, data, isConfig, httpMethod) => {
      try {
        setLoading(true);
        const config = {
          headers: {
            authorizarion: `Bearer ${user.token}`,
            role: user.role,
          },
        };
        const response = await axios.httpMethod(
          url,
          data && data,
          isConfig && config
        );
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchApiCall();
  });
  return { data, loading, error, fetchApiCall };
};

export default UseFetch;
