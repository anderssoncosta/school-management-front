import { useState } from "react";
import Table from "../../components/table";
import {
  useCreateStudent,
  useDeleteStudent,
  useGetStudents,
  useUpdateStudent,
} from "./service";
import { useFormatDate } from "../../hooks/useFormatDate";
import { FormModal } from "../../components/modal-form";
import StudentForm from "./form";
import { FormProvider, useForm } from "react-hook-form";
import { StudentSchema, studentSchema } from "./form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AlertDelete } from "../../utils/alerts";
import Pagination from "../../components/pagination";

const Students = () => {
  const { data: students } = useGetStudents();
  const { formatDate } = useFormatDate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] =
    useState<Students.IStudent | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 5;

  const filteredStudents = students?.filter(
    (student: Students.IStudent) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = filteredStudents
    ? Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
    : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const studentsData = filteredStudents?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const methods = useForm<StudentSchema>({
    defaultValues: {},
    resolver: zodResolver(studentSchema),
  });

  const { mutate: createStudent } = useCreateStudent();
  const { mutate: updateStudent } = useUpdateStudent(editingStudent?.id ?? 0);

  const openEditModal = (student: Students.IStudent) => {
    setEditingStudent(student);
    methods.reset({
      ...student,
      dateOfBirth: student.dateOfBirth
        ? new Date(student.dateOfBirth).toISOString().split("T")[0]
        : "",
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingStudent(null);
    methods.reset({
      name: "",
      email: "",
      dateOfBirth: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: StudentSchema) => {
    const payload = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
    };

    if (editingStudent?.id) {
      await updateStudent(payload);
    } else {
      await createStudent(payload);
    }

    setIsModalOpen(false);
    setEditingStudent(null);
    methods.reset();
  };

  const { mutateAsync: deleteStudent } = useDeleteStudent();

  const handleDelete = async (id: number) => {
    const confirmed = await AlertDelete();
    if (confirmed) {
      await deleteStudent(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-2xl font-semibold">Alunos</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 w-80 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={openCreateModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Novo Aluno
          </button>
        </div>
      </div>

      <Table.root>
        <Table.head>
          <Table.header>ID</Table.header>
          <Table.header>Nome</Table.header>
          <Table.header>E-mail</Table.header>
          <Table.header>Data de Nascimento</Table.header>
          <Table.header className="w-1/12">Ações</Table.header>
        </Table.head>

        <Table.body>
          {studentsData?.map((student: Students.IStudent) => (
            <Table.row key={student.id}>
              <Table.cell>{student.id}</Table.cell>
              <Table.cell>{student.name}</Table.cell>
              <Table.cell>{student.email}</Table.cell>
              <Table.cell>{formatDate(student.dateOfBirth)}</Table.cell>
              <Table.cell>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => openEditModal(student)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(Number(student.id))}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </Table.cell>
            </Table.row>
          ))}
        </Table.body>
      </Table.root>
      {filteredStudents && filteredStudents.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      <FormModal
        title={editingStudent ? "Editar Aluno" : "Novo Aluno"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
          methods.reset();
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <StudentForm />

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  methods.reset();
                }}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              >
                {"Salvar"}
              </button>
            </div>
          </form>
        </FormProvider>
      </FormModal>
    </div>
  );
};

export default Students;
