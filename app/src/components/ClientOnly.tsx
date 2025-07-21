'use client'

import { useEffect, useState } from "react"

interface clientOnly{
  children:React.ReactNode
}
const ClientOnly:React.FC<clientOnly> = ({children}) => {
  const [hasMounted,setHasMounted] = useState(false);
  useEffect(()=>{
    setHasMounted(true)
  },[])
  if(!hasMounted){
    return null;
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default ClientOnly

