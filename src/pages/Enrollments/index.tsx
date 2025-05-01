import { useState } from "react";
import Table from "../../components/table";
import {
  useCreateEnrollment,
  useGetEnrollments,
  useDeleteEnrollment,
} from "./service";
import { FormModal } from "../../components/modal-form";
import { EnrollmentForm } from "./form";
import { useFormatDate } from "../../hooks/useFormatDate";
import { TrashIcon } from "@heroicons/react/24/outline";
import { AlertDelete } from "../../utils/alerts";
import { FilterEnrollments } from "./components/FilterEnrollments";
import Pagination from "../../components/pagination";

const Enrollments = () => {
  const { formatDate } = useFormatDate();
  const { data: enrollments } = useGetEnrollments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentFilter, setStudentFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  const filteredEnrollments = enrollments?.filter(
    (enrollment: Enrollments.IEnrollment) => {
      const matchesStudent = enrollment.studentName
        .toLowerCase()
        .includes(studentFilter.toLowerCase());
      const matchesCourse = enrollment.courseName
        .toLowerCase()
        .includes(courseFilter.toLowerCase());
      return matchesStudent && matchesCourse;
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const totalPages = enrollments
    ? Math.ceil(enrollments.length / ITEMS_PER_PAGE)
    : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const enrollmentsData = filteredEnrollments?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const { mutateAsync: createEnrollment } = useCreateEnrollment();
  const { mutateAsync: deleteEnrollment } = useDeleteEnrollment();

  const handleSubmit = async (data: {
    studentId: number;
    courseId: number;
  }) => {
    await createEnrollment(data);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await AlertDelete();
    if (confirmed) {
      await deleteEnrollment(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-2xl font-semibold">Matrículas</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Nova Matrícula
        </button>
      </div>

      <FilterEnrollments
        studentFilter={studentFilter}
        courseFilter={courseFilter}
        onStudentFilterChange={setStudentFilter}
        onCourseFilterChange={setCourseFilter}
      />

      <Table.root>
        <Table.head>
          <Table.header>ID do Estudante</Table.header>
          <Table.header>Aluno</Table.header>
          <Table.header>Curso</Table.header>
          <Table.header>Data de Matrícula</Table.header>
          <Table.header>Ações</Table.header>
        </Table.head>

        <Table.body>
          {enrollmentsData?.map(
            (enrollment: Enrollments.IEnrollment, index: number) => (
              <Table.row key={index}>
                <Table.cell>{enrollment.studentId}</Table.cell>
                <Table.cell>{enrollment.studentName}</Table.cell>
                <Table.cell>{enrollment.courseName}</Table.cell>
                <Table.cell>{formatDate(enrollment.enrollmentDate)}</Table.cell>
                <Table.cell>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleDelete(enrollment.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </Table.cell>
              </Table.row>
            )
          )}
        </Table.body>
      </Table.root>

      {enrollments && enrollments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <FormModal
        title="Nova Matrícula"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <EnrollmentForm
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </FormModal>
    </div>
  );
};

export default Enrollments;
