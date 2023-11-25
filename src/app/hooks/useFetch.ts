import axios from "axios";
import { useEffect, useState } from "react";

type ErrorResponse = {
  message: string;
};

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsloading(true);
      setError(null);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err: any) {
        setError(err);
      }
      setIsloading(false);
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};
