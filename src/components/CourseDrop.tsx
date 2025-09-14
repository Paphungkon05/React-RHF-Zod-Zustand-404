import { useCourseStore } from "../store/courseStore";

export default function CourseDrop() {
  const { courses } = useCourseStore();
  const dropped = courses.filter((c) => c.dropped);

  if (dropped.length === 0) {
    return <p className="mt-4 text-gray-500">ยังไม่มีรายวิชาที่ถอน</p>;
  }

  return (
    <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-red-600 mb-3">รายวิชาที่ถอน</h2>
      <ul className="space-y-2">
        {dropped.map((c) => (
          <li
            key={c.id}
            className="flex justify-between bg-white p-2 rounded shadow-sm"
          >
            <span>
              {c.code} - {c.nameTH} ({c.credit} หน่วยกิต)
            </span>
            <span className="text-red-500 font-semibold">ถอนแล้ว</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
