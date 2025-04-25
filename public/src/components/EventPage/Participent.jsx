import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons"; 

export default function Particpent({ user, checkedIn }) {
    return (
        <div>
            <div className="flex gap-2 items-center">
                <FontAwesomeIcon 
                    icon={faUser} 
                    className={checkedIn ? 'text-neon' : ''} // Use 'text-neon' if checkedIn is true
                />
                <p>{user.fname}</p>
                <p>{user.lname}</p>
            </div>
        </div>
    );
}