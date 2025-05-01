import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../service/api";
import { AlertError, AlertSuccess } from "../../../utils/alerts";
import { AxiosError } from "axios";

export const useGetEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const response = await api.get(`api/enrollments`);
      return response.data;
    },
  });
};

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { studentId: number; courseId: number }) => {
      const response = await api.post(`api/enrollments`, data);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Matrícula realizada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as string) || "Erro ao realizar matrícula!";
      AlertError({ message });
    },
  });
}; 

export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`api/enrollments/${id}`);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Matrícula deletada com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as string) || "Erro ao deletar matrícula!";
      AlertError({ message });
    },
  });
};