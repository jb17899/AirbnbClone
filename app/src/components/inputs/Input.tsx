'use client'

import {  FieldError, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"


interface InputProps{
    id:string,
    label:string,
    type?:string,
    disabled?:boolean,
    formatPrice?:boolean,
    required?:boolean,
    register:UseFormRegister<FieldValues>,
    error:FieldErrors<FieldValues>
}

const Input:React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    register,
    error
}) => {
  return (
    <div className="
    w-full
    relative
    ">
        {formatPrice&&
        (
            <BiDollar
            size={24}
            className="text-neutral-700
            absolute
            top-5
            left-2
            "
            />
        )
        }
        <input id={id} disabled={disabled} {...register(id,{required})} type={type} step={'0.01'}
        placeholder=" "
        className={`
            peer
            bg-white
            p-3
            pt-5
            pl-5
            w-full
            border-2
            rounded-md
            outline-none
            transition
            disabled:opactiy-70
            disabled:cursor-not-allowed
            focus:shadow-md
            ${formatPrice?`pl-9`:`pl-4`}
            ${error[id]?`border-rose-500`:`border-neutral-300`}   
            ${error[id]?`focus:border-rose-500`:`focus:border-black`}                
            `}
        />
        <label className={
            `absolute
            text-sm
            duration-150
            transform
            -translate-y-3
            top-5
            z-10
            origin-[0]
            ${formatPrice?`left-9`:`left-4`}
            peer-placeholder-shown:scale-120
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            px-2
            `}
        >
            {label}    
        </label>
      
    </div>
  )
}

export default Input
