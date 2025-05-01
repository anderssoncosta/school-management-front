interface FilterEnrollmentsProps {
  studentFilter: string;
  courseFilter: string;
  onStudentFilterChange: (value: string) => void;
  onCourseFilterChange: (value: string) => void;
}

export const FilterEnrollments = ({
  studentFilter,
  courseFilter,
  onStudentFilterChange,
  onCourseFilterChange,
}: FilterEnrollmentsProps) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Aluno
          </label>
          <input
            type="text"
            value={studentFilter}
            onChange={(e) => onStudentFilterChange(e.target.value)}
            placeholder="Digite o nome do aluno"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Curso
          </label>
          <input
            type="text"
            value={courseFilter}
            onChange={(e) => onCourseFilterChange(e.target.value)}
            placeholder="Digite o nome do curso"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}; 