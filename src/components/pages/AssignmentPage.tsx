import CourseForm from "../CourseForm";
import CourseList from "../CourseList";
import CourseDrop from "../CourseDrop";

export default function AssignmentPage() {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ระบบถอนรายวิชา</h1>
      <CourseForm />
      <CourseList />
      <CourseDrop />
    </section>
  );
}
