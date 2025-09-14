import { useState } from "react"

function ButtonAdd() {
  const [count, setCount] = useState(0)

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white shadow hover:bg-indigo-600 active:scale-95"
    >
      count is {count}
    </button>
  )
}

export default ButtonAdd
