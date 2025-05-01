import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../service/api";
import { AlertError, AlertSuccess } from "../../../utils/alerts";
import { AxiosError } from "axios";

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get(`api/courses`);
      return response.data;
    },
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Courses.ICourse) => {
      const response = await api.post(`api/courses`, data);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Curso criado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as string) || "Erro ao criar curso!";
      AlertError({ message });
    },
  });
};

export const useUpdateCourse = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Courses.ICourse) => {
      const response = await api.put(`api/courses/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Curso atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as string) || "Erro ao atualizar curso!";
      AlertError({ message });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`api/courses/${id}`);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Curso deletado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as string) || "Erro ao deletar curso!";
      AlertError({ message });
    },
  });
};
