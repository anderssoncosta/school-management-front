import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetStudents } from "../../Students/service";
import { useGetCourses } from "../../Courses/service";
import { StudentSchema } from "../../Students/form/schema";
import { CourseSchema } from "../../Courses/form/schema";
import { enrollmentSchema, EnrollmentSchema } from "./schema";

interface EnrollmentFormProps {
  onSubmit: (data: EnrollmentSchema) => Promise<void>;
  onCancel: () => void;
}

export const EnrollmentForm = ({ onSubmit, onCancel }: EnrollmentFormProps) => {
  const { data: students } = useGetStudents();
  const { data: courses } = useGetCourses();

  const methods = useForm<EnrollmentSchema>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      studentId: 0,
      courseId: 0,
    },
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Aluno</label>
        <select
          {...methods.register("studentId", { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={0}>Selecione um aluno</option>
          {students?.map((student: StudentSchema) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
        {methods.formState.errors.studentId && (
          <p className="text-red-500 text-sm">
            {String(methods.formState.errors.studentId.message)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Curso</label>
        <select
          {...methods.register("courseId", { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value={0}>Selecione um curso</option>
          {courses?.map((course: CourseSchema) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {methods.formState.errors.courseId && (
          <p className="text-red-500 text-sm">
            {String(methods.formState.errors.courseId.message)}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
        >
          Matricular
        </button>
      </div>
    </form>
  );
};
