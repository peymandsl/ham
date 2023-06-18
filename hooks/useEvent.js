import useSWR from "swr";

import fetcher from "../libs/fetcher";

const useEvent = (eventID) => {
  const { data, error, isLoading, mutate } = useSWR(
    eventID ? `/api/events/getEvent/${eventID}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useEvent;
