'use client'
import useToggleMenu from "./hooks/useToggleMenu";

interface ContainerProps{
    children:React.ReactNode
};
const Container:React.FC<ContainerProps> = ({
    children
}) => {
  const toggleMenu= useToggleMenu();
  return (
    <div 
    onClick={()=>{}}
    className="
    max-w-[2520px]
    mx-auto
    xl:px-20
    md:px-10
    sm:px-2
    px-4
    ">
        {children}
    </div>
  )
}

export default Container
