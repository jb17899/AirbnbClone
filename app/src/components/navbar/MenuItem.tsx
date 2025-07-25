'use client'

import React from "react"

interface MenuItemProps{
    onClick:()=>void
    label:string
}
const MenuItem:React.FC<MenuItemProps> = ({onClick,label}) => {
  return (
    <div
    onClick={onClick}
    className="
    px-3
    py-3
    hover:bg-neutral-100
    hover:shadow-md
    font-bold
    transition
    "
    >
        {label}

    </div>
  )
}

export default MenuItem
