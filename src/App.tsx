// src/App.tsx
import { NavLink, Routes, Route } from "react-router-dom"
import TodoPage from "./components/pages/TodoPage"
import AssignmentPage from "./components/pages/AssignmentPage"

export default function App() {
  return (
    <div className="container-app">
      {/* เมนูนำทาง */}
      <nav className="flex gap-4 mb-6 bg-white/80 p-3 rounded-xl shadow-sm sticky top-0 z-10">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700"
          }
        >
          TodoApp
        </NavLink>

        <NavLink
          to="/assignment"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700"
          }
        >
          Assignment
        </NavLink>
      </nav>

      {/* ส่วนเนื้อหา */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/assignment" element={<AssignmentPage />} />
        </Routes>
      </main>
    </div>
  )
}