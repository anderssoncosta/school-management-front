import { z } from "zod";

export const courseSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .min(5, "A descrição deve ter pelo menos 5 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres"),
});

export type CourseSchema = z.infer<typeof courseSchema>;
