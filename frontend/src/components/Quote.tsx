
export default function Quote(props:any) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-200">
        <div className="max-w-lg ">
            <div className="font-bold text-3xl mb-4"> "{props.quote}"</div>
            <div className="font-semibold text-lg">{props.author}</div>
            <div className="text-sm text-gray-500">{props.title}</div>
        </div> 
    </div>
  )
}
