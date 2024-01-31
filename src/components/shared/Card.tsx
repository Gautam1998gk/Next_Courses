import { IEvent } from "@/database/models/eventModel";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "./DeleteConfirmation";

type cardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: cardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div
      className="group relative flex flex-col overflow-hidden min-h-[380px] w-full
    max-w-[400px] rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
    >
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500"
      />
      {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div
        className="flex min-h-[230px] flex-col  gap-3 p-5 md:gap-4"
      >
        {!hidePrice && (
          <div className="flex gap-2 items-center">
            <span className="p-semibold-14 w-min bg-green-500/10 text-green-60 px-4 py-1 rounded-full">
              {event.isFree ? "Free" : `$${event.price}`}
            </span>
            <p className="w-min line-clamp-1  rounded-full px-4 py-1 bg-gray-500/10 text-gray-500 p-regular-semibold">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <Link  href={`/events/${event._id}`}>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex text-black">
          {event.title}
        </p>
        </Link>
        <div className="flex-between w-full">
          <p className="p-medium-14 text-gary-600 md:p-medium-16">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="p-regular-16">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
