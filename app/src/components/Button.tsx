'use client'
import { IconType } from "react-icons"

interface ButtonProps{
    label:string,
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void,
    disabled?:boolean,
    outline?:boolean,
    small?:boolean,
    Icon?:IconType,
    isSecondary?:Boolean
};
const Button:React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    Icon
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
    text-center
    cursor-pointer
    text-md
    ${outline?`bg-white`:`bg-rose-500`}
    ${outline?`border-black`:`border-rose-500`}
    ${outline?`text-black`:`text-white`}
    ${small?'py-1':'py-3'}
    ${small?'font-semibold':'font-bold'}
    ${small?'border-[1px]':'border-2'}
    `}>
        {Icon&&(
            <Icon className="absolute top-4 left-5" size={18}/>
        )}
      {label}
    </button>
  )
}

export default Button
