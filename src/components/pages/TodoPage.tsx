import { useState } from "react";
import { useTodoStore } from "../../store/todoStore";

export default function TodoPage() {
  const { todos, add, toggle, remove } = useTodoStore();
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;
    add(task.trim());
    setTask("");
  };

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="เพิ่มงานใหม่..."
          className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          เพิ่ม
        </button>
      </div>

      {/* List */}
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">ยังไม่มีงาน</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-white shadow p-2 rounded-lg"
            >
              <span
                onClick={() => toggle(t.id)}
                className={`cursor-pointer ${
                  t.done ? "line-through text-gray-400" : ""
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => remove(t.id)}
                className="text-red-500 hover:underline"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
