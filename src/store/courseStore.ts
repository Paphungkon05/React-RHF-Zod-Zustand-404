import { create } from "zustand";

export type Course = {
  id: string;
  code: string;
  nameTH: string;
  nameEN: string;
  credit: number;
  teacher: string;
  grade: string;
  dropped?: boolean;
};

type CourseStore = {
  courses: Course[];
  add: (c: Omit<Course, "id">) => void;
  drop: (id: string) => void;
};

const uid = () => Math.random().toString(36).slice(2, 9);

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  add: (c) => set((state) => [...state.courses, { ...c, id: uid() }]),
  drop: (id) =>
    set((state) =>
      state.courses.map((c) => (c.id === id ? { ...c, dropped: true } : c))
    ),
}));
