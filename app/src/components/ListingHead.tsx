'use client';
import { User } from "@/app/generated/prisma"
import useCountries from "./hooks/useCountries";
import Heading from "./Heading";
import Image from "next/image";
import HeartButton from "./navbar/HeartButton";

interface listingProps{
    imageSrc?:string,
    currentUser?:User|null,
    title?:string,
    locationValue?:string,
    id?:string
};

const ListingHead:React.FC<listingProps> = ({
    imageSrc,
    currentUser,
    title,
    locationValue,
    id
}) => {
    if(locationValue == null){
        locationValue = "Unknown";
    }
    const {ByValue} = useCountries();
    const location = ByValue(locationValue);
  return (
    <>
        <Heading title={locationValue} subtitle={`${location?.region},${location?.label}`}/>
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image
            alt="Image"
            src={imageSrc||'/logo.png'}
            fill
            className="object-cover w-full shadow-md"
            />
            <div className="absolute top-5 right-5">
                <HeartButton listingId={id}currentUser={currentUser}/>
            </div>

        </div>
    
    </>
  )
}

export default ListingHead