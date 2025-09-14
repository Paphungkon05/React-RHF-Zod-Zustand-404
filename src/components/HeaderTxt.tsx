import { useState } from 'react'

export default function HeaderText ({ title , txtSize } : { title : string , txtSize : string }) {
    //const title: string = "CS-MJU"
    //const [count, setCount] = useState(0)

    return (
        <>
            <h1 style={{ fontSize: `${count + 20}px` }} className={status ? "green-txt" : "red-txt"}>{name}</h1>
        </>
    )
}type HeaderTextProps = {
  title: string
  txtSize: string
}

export default function HeaderText({ title, txtSize }: HeaderTextProps) {
  return (
    <h1 style={{ fontSize: txtSize }} className="text-green-600 font-bold text-center">
      {title}
    </h1>
  )
}

