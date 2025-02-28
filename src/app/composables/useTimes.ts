import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};

const setLocalStorageItem = (
  key: string,
  value: {
    type: string;
    time: string;
    end?: boolean;
  }[]
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useTimes = () => {
  return useQuery<
    {
      type: string;
      time: string;
      end?: boolean;
    }[]
  >({
    queryKey: ["times"],
    queryFn: async () => {
      const data = getLocalStorageItem("times");
      return data;
    },
  });
};

export const useAddTime = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      type,
      time,
      end,
    }: {
      type: string;
      time: string;
      end?: boolean;
    }) => {
      const oldTimes = getLocalStorageItem("times");
      setLocalStorageItem("times", [...oldTimes, { type, time, end }]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["times"] }),
  });
};

export const useResetTimes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.setItem("times", JSON.stringify([]));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["times"] }),
  });
};
