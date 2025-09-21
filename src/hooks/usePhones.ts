import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export const usePhone = () => {
  const client = useQueryClient();

  const getPhone = () => {
    return useQuery<any, any>({
      queryKey: ["phoneKey"],
      queryFn: () => api.get("phone").then((res) => res.data),
    });
  };

  const createPhone = useMutation<any, any, any>({
    mutationFn: (body: any) => api.post("phone", body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
    onError: () => {},
  });

  const deletePhone = useMutation({
    mutationFn: (id: any) => api.delete(`phone/${id}`).then((res) => res.data),
  });

  const updatePhone = useMutation<any, any, { id: string; body: any }>({
    mutationFn: ({ id, body }) =>
      api.put(`phone/${id}`, body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["phoneKey"] });
    },
  });

  return { getPhone, createPhone, deletePhone, updatePhone };
};
