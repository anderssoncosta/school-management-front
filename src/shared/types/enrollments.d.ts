namespace Enrollments {
  export interface IEnrollment {
    id: number;
    studentId: number;
    studentName: string;
    courseName: string;
    enrollmentDate: string;
  }
}