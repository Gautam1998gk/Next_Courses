import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.action"
import { auth } from "@clerk/nextjs"

const UpdateEvent = async({params}:{params:{id:string}}) => {
   
    const event = await getEventById(params.id)
    
    const  {sessionClaims}=auth()
    const userId=sessionClaims?.userId as string
  return (<>
    <section className="bg-primary-50bg-dotted-pattern ">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
    </section>
    
    <div className="wrapper my-8">
        <EventForm userId={userId} event={event} eventId={event._id} type="Update"/>
    </div>
    
    </>)
}

export default UpdateEvent