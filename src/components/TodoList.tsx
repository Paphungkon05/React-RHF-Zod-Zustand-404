import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoList() {
  const { todos, toggle, remove, add } = useTodoStore();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    add(text);
    setText("");
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="พิมพ์งานที่ต้องทำ"
        />
        <button onClick={handleAdd}>+ เพิ่ม</button>
      </div>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              style={{ textDecoration: t.done ? "line-through" : "none", cursor: "pointer" }}
              onClick={() => toggle(t.id)}
            >
              {t.text}
            </span>
            <button onClick={() => remove(t.id)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
