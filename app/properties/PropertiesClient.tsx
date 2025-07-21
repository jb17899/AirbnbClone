'use client'
import { useRouter } from "next/navigation"
import { Listings, Reservation, User } from "../generated/prisma"
import Container from "../src/components/Container"
import Heading from "../src/components/Heading"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCard from "../src/components/ListingCard"

interface TripsClientProps{
    listings:Array<Listings>,
    currentUser:User
};
const TripsClient:React.FC<TripsClientProps> = ({
    listings,
    currentUser
}) => {
  const router = useRouter();
  const [deletingId,setDeletingId] = useState("");
  const onCancel= useCallback((id?:string)=>{
    if(!id||id===undefined){
      console.log("error no id");
      return null;
    }
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`)
    .then(()=>{
      toast.success("Successfully deleted your Listing");
      router.refresh();
    })
    .catch((error)=>{
      console.log(error);
      toast.error("Some error occured While deleting your listings");
    })
    .finally(()=>{
      setDeletingId("");
    })
  },[]);

  return (
    <Container>
      <Heading title="Properties"subtitle="List of Your Properties"/>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((element)=>{
          return (
            <ListingCard
            key={element.id}
            data={element}
            actionId={element.id}
            onAction={onCancel}
            disabled={deletingId == element.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default TripsClient
