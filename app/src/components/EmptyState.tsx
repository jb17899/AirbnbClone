'use client'

import { useRouter } from "next/navigation"
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps{
    title?:string,
    subtitle?:string,
    showReset?:boolean
};

const EmptyState:React.FC<EmptyStateProps> = ({
title="No exact Matches",
subtitle="Try Changing or removing some of your filters",
showReset 
}) => {
  const router = useRouter();
  return (
    <div className="
    h-[60vh]
    flex
    flex-col
    items-center
    justify-center
    ">
      <Heading title={title} subtitle={subtitle} center/>
      <div className="w-48 mt-4">
        {showReset&&(
          <Button
          outline
          label="Reset all Filters"
          onClick={()=>{router.push('/');}}
          />
        )}


      </div>

    </div>
  )
}

export default EmptyState
