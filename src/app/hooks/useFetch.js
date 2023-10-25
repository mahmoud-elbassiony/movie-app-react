import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([] | {});
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsloading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setIsloading(false);
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};
