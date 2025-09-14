import { create } from "zustand"

export type Course = {
  id: string
  code: string
  nameTH: string
  nameEN: string
  credit: number
  teacher: string
  grade: string
  dropped?: boolean
}

type CourseStore = {
  courses: Course[]
  add: (c: Omit<Course, "id">) => void
  drop: (id: string) => void
  gpa: () => number
}

const uid = () => Math.random().toString(36).slice(2, 9)

const gradeToPoint: Record<string, number> = {
  A: 4, "B+": 3.5, B: 3, "C+": 2.5, C: 2, "D+": 1.5, D: 1, F: 0
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  add: (c) =>
    set((state) => ({
      courses: [...state.courses, { ...c, id: uid(), dropped: false }],
    })),
  drop: (id) =>
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === id ? { ...c, dropped: true } : c
      ),
    })),
  gpa: () => {
    const active = get().courses.filter((c) => !c.dropped && c.grade !== "W")
    if (active.length === 0) return 0
    const totalCredits = active.reduce((s, c) => s + c.credit, 0)
    const totalPoints = active.reduce(
      (s, c) => s + (gradeToPoint[c.grade] || 0) * c.credit,
      0
    )
    return totalPoints / totalCredits
  },
}))
