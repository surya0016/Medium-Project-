interface ButtonType {
    name:string,
    onClick:()=>void
}
export default function Button({name, onClick}:ButtonType) {
  return (
    <button onClick={onClick} className="bg-black text-white py-1.5 w-full rounded-md hover:bg-zinc-800  transition-all ">{name}</button>
  )
}
