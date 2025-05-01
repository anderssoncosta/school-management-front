import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Table from "../../components/table";
import {
  useCreateCourse,
  useDeleteCourse,
  useGetCourses,
  useUpdateCourse,
} from "./service";
import { FormModal } from "../../components/modal-form";
import CourseForm from "./form";
import { CourseSchema, courseSchema } from "./form/schema";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AlertDelete } from "../../utils/alerts";
import Pagination from "../../components/pagination";

const Courses = () => {
  const { data: courses } = useGetCourses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Courses.ICourse | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 5;

  const filteredCourses = courses?.filter(
    (course: Courses.ICourse) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = filteredCourses
    ? Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
    : 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const courseData = filteredCourses?.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const methods = useForm<CourseSchema>({
    defaultValues: {},
    resolver: zodResolver(courseSchema),
  });

  const { mutateAsync: createCourse } = useCreateCourse();
  const { mutateAsync: updateCourse } = useUpdateCourse(editingCourse?.id ?? 0);

  const openEditModal = (course: Courses.ICourse) => {
    setEditingCourse(course);
    methods.reset(course);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    methods.reset({
      name: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CourseSchema) => {
    if (editingCourse?.id) {
      await updateCourse(data);
    } else {
      await createCourse(data);
    }

    setIsModalOpen(false);
    setEditingCourse(null);
    methods.reset({
      name: "",
      description: "",
    });
  };

  const { mutateAsync: deleteCourse } = useDeleteCourse();

  const handleDelete = async (id: number) => {
    const confirmed = await AlertDelete();
    if (confirmed) {
      await deleteCourse(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-2xl font-semibold">Cursos</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
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
            Novo Curso
          </button>
        </div>
      </div>

      <Table.root>
        <Table.head>
          <Table.header>ID</Table.header>
          <Table.header>Nome</Table.header>
          <Table.header>Descrição</Table.header>
          <Table.header className="w-1/12">Ações</Table.header>
        </Table.head>

        <Table.body>
          {courseData?.map((course: Courses.ICourse) => (
            <Table.row key={course.id}>
              <Table.cell>{course.id}</Table.cell>
              <Table.cell>{course.name}</Table.cell>
              <Table.cell>{course.description}</Table.cell>
              <Table.cell>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => openEditModal(course)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleDelete(Number(course.id))}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </Table.cell>
            </Table.row>
          ))}
        </Table.body>
      </Table.root>
      {filteredCourses && filteredCourses.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <FormModal
        title={editingCourse ? "Editar Curso" : "Novo Curso"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
          methods.reset({
            name: "",
            description: "",
          });
        }}
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <CourseForm />

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  methods.reset({
                    name: "",
                    description: "",
                  });
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

export default Courses;
