'use client'
import { User } from "@/app/generated/prisma"
import categories,{categoryType} from "./navbar/CategoriesList"
import useCountries from "./hooks/useCountries"
import ClientOnly from "./ClientOnly"
import EmptyState from "./EmptyState"
import Avatar from "./navbar/Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"


interface infoProps{
    user:User,
    category?:categoryType,
    description:string,
    roomCount?:number,
    guestCount?:number,
    bathroomCount?:number,
    locationValue?:string,
};

const Map = dynamic(()=>import('./Map'),{
    ssr:false
});
const ListingInfo:React.FC<infoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue
}) => {
    if(!locationValue||!bathroomCount||!guestCount||!roomCount||!category){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }
    const {ByValue} = useCountries();
    const coordinate = ByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-bold flex flex-row items-center gap-2">
                <div>Hosted by {user?.name}</div>
                <Avatar src={user.image}/>
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>

            </div>
        </div>
        <hr className="text-neutral-100 bg-neutral-100"/>
        {category&&(
            <ListingCategory icon={category.icon}label={category.label} description={category.description}/>
        )}
        <hr className="text-neutral-100 bg-neutral-100"/>
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr className="text-neutral-100 bg-neutral-100"/>
        <Map center={coordinate}/>
        
    </div>
  )
}

export default ListingInfo
