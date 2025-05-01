import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../service/api";
import { AlertError, AlertSuccess } from "../../../utils/alerts";
import { AxiosError } from "axios";

export const useGetStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await api.get(`api/students`);
      return response.data;
    },
  });
};

export const useGetStudentById = (id: number) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const response = await api.get(`api/students/${id}`);

      return response.data;
    },
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Students.IStudent) => {
      const response = await api.post(`api/students`, data);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Aluno criado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as string) || "Erro ao criar aluno!";
      AlertError({ message });
    },
  });
};

export const useUpdateStudent = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Students.IStudent) => {
      const response = await api.put(`api/students/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Aluno atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as string) || "Erro ao atualizar aluno!";
      AlertError({ message });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`api/students/${id}`);
      return response.data;
    },
    onSuccess: () => {
      AlertSuccess({ message: "Aluno deletado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
