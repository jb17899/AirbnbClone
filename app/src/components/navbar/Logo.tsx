'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();
  return (
    <Image
    onClick={()=>{router.push('/');}}
    alt="logoImage"
    className="hidden md:block cursor-pointer border-solid"
    width={120}
    height={120}
    src={"/logo.png"}
    />
  )
}

export default Logo
