import { z } from 'zod';

export const studentSchema = z.object({
  id: z.number().optional(),
  name: z.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .min(5, 'O email deve ter pelo menos 5 caracteres')
    .max(100, 'O email deve ter no máximo 100 caracteres'),
  dateOfBirth: z.string()
    .refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, 'A idade deve ser maior ou igual a 18 anos')
});

export type StudentSchema = z.infer<typeof studentSchema>;