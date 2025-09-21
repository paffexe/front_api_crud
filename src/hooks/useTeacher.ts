import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export const useTeacher = () => {
  const client = useQueryClient();

  const getTeacher = () => {
   return useQuery<any, any>({
      queryKey: ["teacherKey"],
      queryFn: () => api.get("teacher").then((res) => res.data),
    });
  };

  const createTeacher = useMutation<any, any, any>({
    mutationFn: (body: any) =>
      api.post("teacher", body).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["teacherKey"] });
    },
    onError: () => {},
  });

  const deleteTeacher = useMutation({
    mutationFn: (id: any) =>
      api.delete(`teacher/${id}`).then((res) => res.data),
  });

  return { getTeacher, createTeacher, deleteTeacher };
};
