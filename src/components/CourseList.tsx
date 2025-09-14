import { useCourseStore } from "../store/courseStore"
import DropButton from "./DropButton"

export default function CourseList() {
  const { courses } = useCourseStore()

  if (courses.length === 0)
    return <p className="text-gray-500 mt-4">ยังไม่มีรายวิชา</p>

  return (
    <ul className="mt-4 space-y-2">
      {courses.map((c) => (
        <li key={c.id}
          className={`p-3 rounded shadow flex justify-between ${c.grade === "F" ? "text-red-500" : "text-gray-800"}`}>
          <div>
            <p className="font-bold">{c.code} {c.nameTH} ({c.nameEN})</p>
            <p className="text-sm text-gray-600">{c.teacher} • {c.credit} หน่วยกิต</p>
            <p>เกรด: {c.grade}</p>
          </div>
          {!c.dropped && <DropButton id={c.id} />}
        </li>
      ))}
    </ul>
  )
}
