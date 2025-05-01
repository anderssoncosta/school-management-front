import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/layout";
import Courses from "../pages/Courses";
import Students from "../pages/Students";
import Enrollments from "../pages/Enrollments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Enrollments />,
      },
      {
        path: "/cursos",
        element: <Courses />,
      },
      {
        path: "/alunos",
        element: <Students />,
      },
    ],
  },
]);

export default router;
