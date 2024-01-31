import { IEvent } from "@/database/models/eventModel"
import { Button } from "../ui/button";

const Checkout = ({event,userId}:{event:IEvent,userId:string}) => {
 
 const onCheckout=async()=>{
    console.log("Checkout");
    
 }
    return (
    <form action={onCheckout}>
        <Button type="submit" size="lg" role="link" className="button sm:w-fit">
            {event.isFree?"Get Ticket":"Buy Ticket"}
        </Button>
    </form>
  )
}

export default Checkout