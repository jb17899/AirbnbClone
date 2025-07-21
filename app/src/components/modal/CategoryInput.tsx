'use client'

import { IconType } from "react-icons"

interface categoryInputProps{
    onClick:(value:string)=>void,
    selected:boolean,
    label:string,
    icon:IconType
}
const CategoryInput:React.FC<categoryInputProps> = ({
    onClick,
    selected,
    label,
    icon:Icon
}) => {
  return (
    <div  onClick={()=>{onClick(label)}}
    className={`
        rounded-lg
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected?'border-black':'border-neutral-100'}        
        `}
    >
      <Icon size={30}/>
      <div className="font-bold">
        {label}
      </div>
      
    </div>
  )
}

export default CategoryInput
