import CourseForm from "../CourseForm"
import CourseList from "../CourseList"
import CourseDrop from "../CourseDrop"
import { useCourseStore } from "../../store/courseStore"

export default function AssignmentPage() {
  const { gpa } = useCourseStore()

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ระบบถอนรายวิชา</h1>
      <CourseForm />
      <CourseList />
      <CourseDrop />
      <p className="mt-6 font-semibold">GPA รวม: {gpa().toFixed(2)}</p>
    </section>
  )
}
