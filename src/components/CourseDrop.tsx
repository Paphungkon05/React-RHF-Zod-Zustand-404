import { useCourseStore } from "../store/courseStore";

export default function DropButton({ id }: { id: string }) {
  const { drop } = useCourseStore();
  return (
    <button
      onClick={() => drop(id)}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      ถอน
    </button>
  );
}
