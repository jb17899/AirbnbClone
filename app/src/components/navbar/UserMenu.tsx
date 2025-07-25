'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "../hooks/useRegisterModal"
import useLoginModal from "../hooks/useLoginModal"
import { User } from "@/app/generated/prisma"
import { signOut } from "next-auth/react"
import useRentModal from "../hooks/useRentModal"
import { useRouter } from "next/navigation"
import useToggleMenu from "../hooks/useToggleMenu"
interface userMenu {
    user?: User | null
}


const UserMenu: React.FC<userMenu> = ({
    user
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const toggleMenu = useToggleMenu();
    const [open, setIsOpen] = useState(false);
    const router = useRouter();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [])
    const onRent = useCallback(()=>{
        if(!user){
            return loginModal.onOpen();
        }
        rentModal.onOpen();

    },[user,loginModal,rentModal])
    return (
        <div className="relative">
            <div className="
        flex 
        flex-row 
        items-center
        gap-3
        ">
                <div onClick={() => {onRent(); }} className="
            hidden
            md:block
            text-md)
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            ">
                    Airbnb Your Home
                </div>
                <div
                    onClick={()=>{toggleOpen();}}
                    className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            ">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={user?.image}/>
                    </div>

                </div>
            </div>
            {open && (
                <div className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            ">
                    <div className="flex flex-col cursor-pointer transition">
                        {!user?(
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={() => { loginModal.onOpen();toggleOpen(); }}
                                />
                                <MenuItem
                                    label="Signup"
                                    onClick={() => { registerModal.onOpen();toggleOpen(); }}
                                />
                            </>):
                            (
                            <>
                                <MenuItem
                                    label="My Trips"
                                    onClick={() => {router.push('/trips');}}
                                />
                                <MenuItem
                                    label="My Favorites"
                                    onClick={() => {router.push('/favorites');}}
                                />
                                <MenuItem
                                    label="My Reservations"
                                    onClick={() => {router.push("/reservations");}}
                                />
                                <MenuItem
                                    label="My Properties"
                                    onClick={() => {router.push("/properties");}}
                                />
                                <MenuItem
                                    label="Airbnb My Home"
                                    onClick={() => {rentModal.onOpen();}}
                                />
                                <hr className="text-neutral-100"/>
                                <MenuItem
                                    label="Logout"
                                    onClick={() => {signOut();}}
                                />
                                
                            </>)
                        }
                    </div>


                </div>
            )}

        </div>
    )
}

export default UserMenu
