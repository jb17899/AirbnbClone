'use client'
import Container from "../Container"

import CategoryBox from "../CategoryBox"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/dist/client/components/navigation"

import categories  from "./CategoriesList"




const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname ==='/';
    if(!isMainPage){
        return null;
    }

    return (
        <div>
            <Container>
                <div className="
                pt-4
                flex
                flex-row 
                items-center
                justify-between
                overflow-x-auto
                " draggable={false}>
                    {categories.map((item)=>(
                        <CategoryBox
                        key={item.label}
                        label = {item.label}
                        selected={category ===item.label}
                        icon={item.icon}
                        />
                    ))}

                </div>


            </Container>

        </div>
    )
}

export default Categories
