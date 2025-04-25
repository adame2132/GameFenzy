import { useEffect, useState } from 'react';
import { useEventDetailStore, useGoogleMapsStore, useUserStore} from '../../store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import { faLocationDot, faClock, faLock, faUnlock ,faSquareXmark,  faCalendar} from "@fortawesome/free-solid-svg-icons"; 
import reactIcon from '../../assets/gameFrenzyMarker.png'
import userIcon from '../../assets/userMarker.png'
import Particpent from './Participent';

export default function Detail() {
    const [updateParticpents, setUpdateParticpents] = useState(false);
    const { event, getEvent, eventId, closeEventDetail, clearEvent, participents, getParticipents} = useEventDetailStore();
    const {userLocation, isLoaded} = useGoogleMapsStore();
    const [date, setDate] = useState(null);
    const {user} = useUserStore();

    const containerStyle = {
        width: "100%",
        height: "200px"
    };

    const center = userLocation ? {
        lat: userLocation.lat,
        lng: userLocation.lng
    } : { lat: 37.0965, lng: -113.5684 };

    const options = {
        styles: [{
            disableDefaultUI: true,
            featureType: "poi",
            stylers: [{ visibility: "off" }]
        }]
    };

    const handleDateChanged = (date) => {
        const year = date.getFullYear();
        const mm = date.getMonth() + 1;
        let dd = date.getDate();
        let formatted_dd = '';
        if (dd < 10) {
            formatted_dd = "0" + dd.toString();
        } else {
            formatted_dd = dd.toString();
        }
        const formated_date = mm.toString() + "/" + formatted_dd + '/' + year.toString();
        setDate(formated_date);
    };

    const handleCloseEvent = () => {
        closeEventDetail();
        clearEvent();
    };

    const handleJoin = async() => {
        try {
            let data = 'event=' + encodeURIComponent(eventId);
            data += '&user=' + encodeURIComponent(user._id);
            const response = await fetch('http://localhost:8080/participents', {
                method: "Post",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: data
            });
            if (response.status === 201) {
                console.log('Event was created, now just reload the data!');
                setUpdateParticpents(true);
            } else {
                console.log('Error with response status to create event');
            }
        } catch (error) {
            console.log("Error in trying to Create a New Participent", error);
        }
    };

    useEffect(() => {
        console.log("You joined, must update participants");
        getParticipents();
        setUpdateParticpents(false);
    }, [updateParticpents]);

    useEffect(() => {
        if (eventId) {
            console.log("eventId has changed, calling getEvent");
            getEvent();
            getParticipents();
        }
    }, [eventId, getEvent]);

    useEffect(() => {
        if (event?.date) {
            handleDateChanged(new Date(event.date));
        }
    }, [event]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 ">
            <div className="bg-neon p-5 rounded-lg shadow-lg w-1/3">
                {event && (
                    <div className="flex flex-col items-center justify-center w-full bg-customwhite p-4">
                        <FontAwesomeIcon icon={faSquareXmark} size="2xl" className="self-end" onClick={handleCloseEvent} />
                        <p className="text-3xl font-extrabold text-black mb-3">{event.sport_name}</p>
                        {isLoaded && (
                            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} options={options}>
                                {userLocation && <Marker title={"me"} position={userLocation} options={{icon: {url: userIcon,scaledSize: new window.google.maps.Size(30, 30),},}} />}
                                <Marker key={event._id} title={event.sport_name} position={event.geolocation} options={{icon: {url: reactIcon,scaledSize: new window.google.maps.Size(60, 60),},}} />
                            </GoogleMap>
                        )}
                        <div className='flex flex-col gap-2 w-full items-center mb-4'>
                            <div className="flex gap-3 mt-4">
                                <FontAwesomeIcon icon={faLocationDot} size="xl" style={{ color: "darkGreen" }} />
                                <p className='font-semibold'>{event.location}</p>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex gap-3">
                                    <FontAwesomeIcon icon={faClock} size="lg" style={{color: "darkGreen"}}/>
                                    <p className='font-semibold'>{event.time}</p>
                                </div>
                                {date && (
                                    <div className="flex gap-3">
                                        <FontAwesomeIcon icon={faCalendar} size="lg" style={{color: "darkGreen"}} />
                                        <p className='font-semibold'>{date}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-around w-full">
                            <div className="flex flex-col">
                                <p className='bg-darkGreen text-customwhite text-sm font-extrabold p-2'>Participants</p>
                                <div className="max-h-20 overflow-y-auto mt-2">
                                    {participents &&
                                        participents.filter(p => !p.checkedIn).map(user => (
                                            <Particpent key={user.user._id} user={user.user} checkedIn={false}/>
                                        ))}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className='bg-darkGreen text-customwhite text-sm font-extrabold p-2 text-center'>Checked In</p>
                                <div className="max-h-60 overflow-y-auto mt-2">
                                    {participents &&
                                        participents.filter(p => p.checkedIn).map(user => (
                                            <Particpent key={user.user._id} user={user.user} checkedIn={true} />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 self-end">
                            <button className="bg-black w-20 h-10 text-customwhite hover:text-blak hover:bg-neon mt-5" onClick={handleCloseEvent}>
                                Exit
                            </button>
                            <button className="bg-black w-20 h-10 text-customwhite hover:text-blak hover:bg-neon mt-5" onClick={handleJoin}>
                                Join
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}