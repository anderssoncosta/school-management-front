import { z } from "zod";

export const enrollmentSchema = z.object({
  studentId: z.number().min(1, "Selecione um aluno"),
  courseId: z.number().min(1, "Selecione um curso"),
});

export type EnrollmentSchema = z.infer<typeof enrollmentSchema>;
