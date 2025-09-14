import { useCourseStore } from "../store/courseStore";

export default function DropButton({ id }: { id: string }) {
  const { drop } = useCourseStore();

  return (
    <button
      onClick={() => drop(id)}
      className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
    >
      ถอน
    </button>
  );
}
