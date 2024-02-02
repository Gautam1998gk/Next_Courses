import { IEvent } from "@/database/models/eventModel"
import Card from "./Card"
import Pagination from "./Pagination"

type collectionProps={
    data:IEvent[]
    emptyTitle:string
    emptyStateSubtext:string
    collectionType?:"Events_Organized"| 'My_Tickets' | 'All_Events'
    limit:number
    page:number | string
    totalPages?:number
    urlParamName?:string
}
const Collection = ( {data,emptyTitle,emptyStateSubtext,collectionType,limit,urlParamName,page,totalPages=0}:collectionProps) => {
  return (
    <>
    {data.length>0?(
        <div className="flex flex-col items-center gap-10" >
            <ul className="grid w-full grid-cols-1 sm:grid-cols-2 gap-5  lg:grid-cols-3 xl:gap-10">
               {data?.map((event=>{
                const hasOrderLink = collectionType === "Events_Organized"
                const hidePrice = collectionType==="My_Tickets"
                return (
                    <li key={event._id} className="flex justify-center">
                        <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
                    </li>
                )
               }))} 
            </ul>
            {totalPages>1&&(
                <Pagination  urlParamName={urlParamName} page={page} totalPages={totalPages}/>
            )}
        </div>
    ):(
        <div className="w-full gap-3 flex flex-col wrapper rounded-[14px] flex-center min-h-[200px] bg-gray-50 py-28 text-center">
            <h3 className="p-bold">{emptyTitle}</h3>
            <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
    )}
    </>
  )
}

export default Collection