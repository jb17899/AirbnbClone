'use client'
import { User } from "@/app/generated/prisma";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import CategoryBox from "../CategoryBox";
import Categories from "./Categories";
interface currentUser{
    currentUser?:User|null
};
const Navbar:React.FC<currentUser> = ({
    currentUser
})=>{
    return (
        <div className="fixed w-full bg-white shadow-xl z-1">
            <div className="py-4">
                <Container>
                    <div className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-4
                    md:gap-0
                    ">
                        <Logo/>
                        <Search/>
                        <UserMenu user={currentUser}/>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
    );
}
export default Navbar;