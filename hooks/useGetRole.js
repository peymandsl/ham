import useSWR from "swr";

import fetcher from "../libs/fetcher";

const useGetRole = ({ userId }) => {
  if (userId) {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/users/getRole/${userId}`,
      fetcher
    );
    return {
      data,
      error,
      isLoading,
      mutate,
    };
  } else {
    return { data: { role: "user" } };
  }
};

export default useGetRole;
