import { NavLink, Routes, Route } from "react-router-dom"
import TodoPage from "./components/pages/TodoPage"
import AssignmentPage from "./components/pages/AssignmentPage"
import MembersPage from "./components/pages/MembersPage"   // ✅ import MembersPage

export default function App() {
  return (
    <div className="container-app">
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

        <NavLink
          to="/members"
          className={({ isActive }) =>
            isActive ? "font-bold text-blue-600" : "text-gray-700"
          }
        >
          Members
        </NavLink>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/assignment" element={<AssignmentPage />} />
          <Route path="/members" element={<MembersPage />} />   {/* ✅ Route ใหม่ */}
        </Routes>
      </main>
    </div>
  )
}
