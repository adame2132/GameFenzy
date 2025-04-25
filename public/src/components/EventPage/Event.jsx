import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"; 
import { useEventDetailStore } from "../../store";

export default function Event({ event }) {
    const { openEventDetail, setEventId } = useEventDetailStore();
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const year = eventDate.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const formatedMonth = months[eventDate.getMonth()];

    const isPrivate = event.private;

    const ViewDetailsBtn = (eventId) => {
        console.log("View Btn clicked searching for eventId: ", eventId);
        openEventDetail();
        setEventId(eventId);
    };

    return (
        <div className="flex mt-5 p-2 ml-30 bg-customwhite items-center gap-5 hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out shadow w-230 justify-between border-2 border-darkGreen rounded-xl">
            <div className="flex items-center gap-5 bg-darkGreen p-4 h-20 justify-center border-solid border-1">
                <p className="text-5xl text-neon font-extrabold border-r-4 pr-5">{day}</p>
                <div className="flex flex-col">
                    <p className="text-customwhite font-extrabold">{year}</p>
                    <p className="text-customwhite font-extrabold">{formatedMonth}</p>
                </div>
            </div>

            {isPrivate ? (
                <FontAwesomeIcon icon={faLock} size="3x" className="mt-3 text-darkGrey" />
            ) : (
                <FontAwesomeIcon icon={faUnlock} size="3x" className="mt-5 text-darkGrey" />
            )}

            <div className="flex flex-col gap-2">
                <p className="text-xl self-center font-bold">{event.sport_name}</p>
                <div className="flex gap-5 items-center">
                    <div className="flex gap-3">
                        <FontAwesomeIcon icon={faLocationDot} size="xl" className="text-darkGrey" />
                        <p className="font-semibold">{event.location}</p>
                    </div>
                    <div className="flex gap-3">
                        <FontAwesomeIcon icon={faClock} size="lg" className="text-darkGrey" />
                        <p className="font-semibold">{event.time}</p>
                    </div>
                </div>
            </div>

            <button
                className="bg-darkGreen text-lg h-20 font-extrabold w-40 border-solid border-1 text-customwhite hover:bg-neon hover:text-blak"
                onClick={() => ViewDetailsBtn(event._id)}
            >
                View Details
            </button>
        </div>
    );
}