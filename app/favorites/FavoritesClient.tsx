import { User,Listings } from "../generated/prisma"
import Container from "../src/components/Container"
import Heading from "../src/components/Heading"
import ListingCard from "../src/components/ListingCard"
interface favClientProps{
    listing:Array<Listings>
    currentUser:User|null
};

const FavoritesClient:React.FC<favClientProps> = ({
    listing,
    currentUser
}) => {
  return (
    <Container>
        <Heading title="Your Favorites" subtitle="Homes You Liked"/>
         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((element)=>{
          return (
            <ListingCard
            key={element.id}
            data={element}
            currentUser={currentUser}
            />
          )
        })}
      </div>


    </Container>
  )
}

export default FavoritesClient
