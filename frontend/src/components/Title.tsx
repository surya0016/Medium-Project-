interface TitleType {
    title:string
}
export default function Title({title}:TitleType) {
  return (
    <div className="font-bold text-3xl text-center px-4 pb-5">
        {title}
    </div>
  )
}
