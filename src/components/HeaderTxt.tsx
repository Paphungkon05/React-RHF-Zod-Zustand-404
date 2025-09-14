type HeaderTxtProps = {
  title: string
  txtSize?: string
}

export default function HeaderTxt({ title, txtSize = "text-3xl" }: HeaderTxtProps) {
  return (
    <h1 className={`${txtSize} font-bold text-center`}>
      {title}
    </h1>
  )
}
