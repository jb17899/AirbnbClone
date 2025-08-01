'use client'

interface HeadingProps{
    title:string,
    subtitle:string,
    center?:boolean,
};


const Heading:React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={center == true?`text-center`:`text-start`}>
        <div className="text-2xl font-black">
            {title}
        </div>
        <div className="font-md text-neutral-500 mt-2">
            {subtitle}
        </div>


    </div>
  )
}

export default Heading
