import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faClock, faLock, faUnlock } from "@fortawesome/free-solid-svg-icons"; 
import { useUserStore } from "../../store";

export default function SmallEventCard({ event, onCheckIn, showCheckIn = true}) {
    const { user } = useUserStore();
    const dateStripper = event.date.split("T");
    const [year, month, day] = dateStripper[0].split("-");
    const months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const getMonth = (month) => month[0] === "0" ? parseInt(month[1]) : parseInt(month);
    const formatedMonth = months[getMonth(month)];
    const isPrivate = event.private;

    const handleCheck = async () => {
        console.log(`Event clicked! Event ID: ${event._id}`);
        try {
            const response = await fetch(`http://localhost:8080/participents/${user._id}/${event._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                console.log("Successfully checked in!");
                if (onCheckIn) {
                    onCheckIn();
                }
            } else {
                console.error("Failed to check in:", response.status);
            }
        } catch (error) {
            console.error("Error during check-in:", error);
        }
    };

    return (
        <div className="flex  items-center gap-2 hover:-translate-y-1 hover:scale-[1.025] transition-all duration-300 ease-in-out shadow-md w-3/5 max-w-xl justify-between p-4 rounded-lg bg-white">
            <div className="flex items-center gap-1 px-8 bg-darkGreen  w-28 h-20 justify-center rounded-lg ">
                <p className="text-3xl font-extrabold border-r-2 pr-3 text-neon">{day}</p>
                <div className="text-sm flex flex-col pl-2 text-gray-700">
                    <p className="text-customwhite font-semibold">{year}</p>
                    <p className="text-customwhite font-semibold">{formatedMonth}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1 flex-grow ml-3">
                <p className="text-lg font-extrabold text-center">{event.sport_name}</p>
                <div className="flex gap-6 text-sm items-center justify-between text-gray-800">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} />
                        <span>{event.time}</span>
                    </div>
                    <FontAwesomeIcon icon={isPrivate ? faLock : faUnlock} />
                </div>
            </div>

            {showCheckIn && (<button 
                onClick={handleCheck} 
                className="bg-darkGreen text-sm text-white text-center py-2 px-4 rounded-lg hover:bg-neon hover:text-blak transition-all duration-300"
            >
                Check In
            </button>)}
        </div>
    );
}