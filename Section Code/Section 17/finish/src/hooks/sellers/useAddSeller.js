import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";

const useAddSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newSeller) =>
      apiClient.post("/users", newSeller).then((res) => res.data),

    onMutate: (newSeller) => {
      const previousSellers = queryClient.getQueryData(["sellers"]);

      queryClient.setQueryData(["sellers"], (sellers) => [
        newSeller,
        ...sellers,
      ]);

      return { previousSellers };
    },

    onSuccess: (savedSeller, newSeller) => {
      // Method 1: Invalid cached data
      // queryClient.invalidateQueries({
      //   queryKey: ["sellers"],
      // });
      // Method 2: Update the cached data

      queryClient.setQueryData(["sellers"], (sellers) =>
        sellers?.map((seller) => (seller === newSeller ? savedSeller : seller))
      );
    },
    onError: (error, newSeller, context) => {
      if (!context) {
        return;
      }

      queryClient.setQueryData(["sellers"], context.previousSellers);
    },
  });
};

export default useAddSeller;
