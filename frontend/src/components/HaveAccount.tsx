import { Link } from 'react-router-dom'
interface HaveAccountType {
    content:string,
    to:string,
    routename:string
}
export default function HaveAccount({content, to, routename}:HaveAccountType) {
  return (
    <div className="text-center my-2 font-semibold text-zinc-500">
        {content}<Link to={routename}><span className="cursor-pointer text-blue-500 hover:underline ">{to}</span></Link>
    </div>
  )
}
