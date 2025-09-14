import { useState } from "react"
import { useCourseStore } from "../store/courseStore"

export default function CourseForm() {
  const { add } = useCourseStore()
  const [form, setForm] = useState({
    code: "",
    nameTH: "",
    nameEN: "",
    credit: 0,
    teacher: "",
    grade: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.code || !form.grade) return
    add(form)
    setForm({ code: "", nameTH: "", nameEN: "", credit: 0, teacher: "", grade: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-2">
      <input placeholder="รหัสวิชา"
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        className="border p-2 w-full" />
      <input placeholder="ชื่อวิชา (TH)"
        value={form.nameTH}
        onChange={(e) => setForm({ ...form, nameTH: e.target.value })}
        className="border p-2 w-full" />
      <input placeholder="ชื่อวิชา (EN)"
        value={form.nameEN}
        onChange={(e) => setForm({ ...form, nameEN: e.target.value })}
        className="border p-2 w-full" />
      <input placeholder="หน่วยกิต" type="number"
        value={form.credit}
        onChange={(e) => setForm({ ...form, credit: Number(e.target.value) })}
        className="border p-2 w-full" />
      <input placeholder="อาจารย์ผู้สอน"
        value={form.teacher}
        onChange={(e) => setForm({ ...form, teacher: e.target.value })}
        className="border p-2 w-full" />
      <select
        value={form.grade}
        onChange={(e) => setForm({ ...form, grade: e.target.value })}
        className="border p-2 w-full"
      >
        <option value="">เลือกเกรด</option>
        <option>A</option><option>B+</option><option>B</option>
        <option>C+</option><option>C</option><option>D+</option><option>D</option>
        <option>F</option><option>W</option>
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        เพิ่มรายวิชา
      </button>
    </form>
  )
}
