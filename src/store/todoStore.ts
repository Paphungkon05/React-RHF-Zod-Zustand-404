import { create } from "zustand";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type TodoStore = {
  todos: Todo[];
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const uid = () => Math.random().toString(36).slice(2, 9);

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  add: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: uid(), text, done: false }],
    })),
  toggle: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),
  remove: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));
