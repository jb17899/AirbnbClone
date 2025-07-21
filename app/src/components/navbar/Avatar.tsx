'use client'
import Image from "next/image"
interface AvatarProps{
  src?:string|null
}
const Avatar:React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image 
    className="rounded-full"
    src={src != null?src:"/placeholder.jpg"}
    alt="image"
    width={30}
    height={30}
    />
  )
}

export default Avatar
