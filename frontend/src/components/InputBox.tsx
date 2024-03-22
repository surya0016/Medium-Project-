import { ChangeEvent } from 'react'

interface InputBoxType {
    label:string;
    placeholder?:string;
    type?:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
}

export default function InputBox({label, placeholder, onChange, type}:InputBoxType) {
  return (
    <div className="mb-4">
        <div>
            <label htmlFor="first_name" className="block mb-2 text-md font-medium text-gray-900">{label}</label>
            <input type={type || "text"} id="first_name"  onChange={onChange} className="bg-gray-50 border outline-none border-gray-300 
            text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5"
            placeholder={placeholder} required />
        </div>
    </div>
  )
}
