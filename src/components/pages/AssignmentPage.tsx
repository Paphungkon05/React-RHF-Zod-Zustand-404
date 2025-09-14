import { useState, useMemo } from "react";
import { useCourseStore } from "../../store/courseStore";

const GRADE_POINTS: Record<string, number | null> = {
  A: 4.0, "B+": 3.5, B: 3.0,
  "C+": 2.5, C: 2.0,
  "D+": 1.5, D: 1.0,
  F: 0.0, W: null,
};

export default function AssignmentPage() {
  const { courses, add, drop } = useCourseStore();

  const [code, setCode] = useState("");
  const [nameTH, setNameTH] = useState("");
  const [nameEN, setNameEN] = useState("");
  const [credit, setCredit] = useState(3);
  const [teacher, setTeacher] = useState("");
  const [grade, setGrade] = useState("A");

  const handleAdd = () => {
    if (!code.trim() || !nameTH.trim()) return;
    add({ code, nameTH, nameEN, credit, teacher, grade });
    setCode(""); setNameTH(""); setNameEN("");
    setCredit(3); setTeacher(""); setGrade("A");
  };

  const computed = useMemo(() => {
    const valid = courses.filter((c) => !c.dropped && GRADE_POINTS[c.grade] !== null);
    const sumCredits = valid.reduce((acc, c) => acc + c.credit, 0);
    const sumPoints = valid.reduce((acc, c) => acc + (GRADE_POINTS[c.grade]! * c.credit), 0);
    const gpa = sumCredits ? sumPoints / sumCredits : 0;
    return { gpa, total: courses.length, dropped: courses.filter(c => c.dropped).length };
  }, [courses]);

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ระบบถอนรายวิชา + คำนวณ GPA</h1>

      {/* ฟอร์มเพิ่มรายวิชา */}
      <div className="grid gap-2 mb-6 sm:grid-cols-2">
        <input className="input" placeholder="รหัสวิชา" value={code} onChange={(e) => setCode(e.target.value)} />
        <input className="input" placeholder="ชื่อวิชา (ไทย)" value={nameTH} onChange={(e) => setNameTH(e.target.value)} />
        <input className="input" placeholder="ชื่อวิชา (อังกฤษ)" value={nameEN} onChange={(e) => setNameEN(e.target.value)} />
        <input type="number" className="input" placeholder="หน่วยกิต" value={credit} onChange={(e) => setCredit(Number(e.target.value))} />
        <input className="input" placeholder="อาจารย์ผู้สอน" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
        <select className="input" value={grade} onChange={(e) => setGrade(e.target.value)}>
          {Object.keys(GRADE_POINTS).map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>
      <button onClick={handleAdd} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">เพิ่มรายวิชา</button>

      {/* แสดงรายวิชา */}
      <h2 className="text-xl font-semibold mt-6 mb-2">รายวิชาที่ลงทะเบียน</h2>
      <ul className="space-y-2">
        {courses.filter((c) => !c.dropped).map((c) => (
          <li key={c.id} className="flex justify-between items-center p-2 bg-white shadow rounded">
            <span>{c.code} {c.nameTH} ({c.credit} หน่วยกิต) — เกรด {c.grade}</span>
            <button onClick={() => drop(c.id)} className="text-red-500 hover:underline">ถอน</button>
          </li>
        ))}
      </ul>

      {/* รายวิชาที่ถอน */}
      <h2 className="text-xl font-semibold mt-6 mb-2">รายวิชาที่ถอน</h2>
      <ul className="space-y-1 text-gray-600">
        {courses.filter((c) => c.dropped).map((c) => (
          <li key={c.id}>{c.code} {c.nameTH} (เกรด {c.grade})</li>
        ))}
      </ul>

      {/* GPA Summary */}
      <div className="mt-6 p-4 rounded bg-indigo-50">
        <p>วิชาทั้งหมด: {computed.total}</p>
        <p>วิชาที่ถอน: {computed.dropped}</p>
        <p className="font-bold text-indigo-700">GPA: {computed.gpa.toFixed(2)}</p>
      </div>
    </section>
  );
}
