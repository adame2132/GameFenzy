import { StandaloneSearchBox } from '@react-google-maps/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons"; 
import { useAddModalStore, useUserStore, useEventDetailStore } from '../store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DatePickerMulti from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { useState, useEffect, useRef } from 'react'

export default function CreateEventForm() {
    const {loadEvents} = useEventDetailStore();
    const { user } = useUserStore();
    const { closeAddModal } = useAddModalStore();
    const locationRef = useRef(null);
    const [sportName, setSportName] = useState('');
    const [startTime, setStartTime] = useState(null); 
    const [endTime, setEndTime] = useState(null);
    const [location, setLocation] = useState(null);
    const [date, setDate] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);
    const [players, setPlayers] = useState(null);

    const geoLoactateAddress = async (address) => {
        if (!window.google) {
            console.error("Google Maps API is not loaded.");
            return null;
        }

        const geocoder = new window.google.maps.Geocoder();

        return new Promise((resolve, reject) => {
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === "OK" && results[0]) {
                    console.log(results[0].geometry.location);
                    resolve({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
                } else {
                    console.error("Geocoding failed:", status);
                    reject(status);
                }
            });
        });
    };

    const createEventRequest = async () => {
        try {
            console.log("Create event button clicked");
            let data = 'userId=' + encodeURIComponent(user._id);
            data += '&sportName=' + encodeURIComponent(sportName);
            data += '&location=' + encodeURIComponent(location);
            const geoLocation = await geoLoactateAddress(location);
            console.log("geoLocation is: ", geoLocation);
            data += '&geolocation=' + encodeURIComponent(JSON.stringify(geoLocation));
            data += '&date=' + encodeURIComponent(date);
            const t = `${startTime.format("hh:mmA")}-${endTime.format("hh:mmA")}`; 
            data += '&time=' + encodeURIComponent(t);
            data += '&private=' + encodeURIComponent(isPrivate);
            if (isPrivate) {
                data += '&players=' + encodeURIComponent(players);
            }
            const response = await fetch('http://localhost:8080/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data
            });
            if (response.status === 201) {
                console.log('Event was created, now reload the data!');
                closeAddModal();
                loadEvents();
            } else {
                console.log('Error with response status while creating event');
            }

        } catch (error) {
            console.log("Error in trying to create a new event");
            console.log(error);
        }
    }

    const handleOnPlacesChanged = () => {
        console.log(locationRef.current.getPlaces());
        const places = locationRef.current.getPlaces();
        setLocation(places[0].formatted_address);
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
        const formatted_date = `${year}/${mm}/${formatted_dd}`;
        setDate(formatted_date);
    }

    const handleStartTimeChange = (time) => {
        console.log('Start time: ', time.format("hh:mmA"));
        setStartTime(time);
    };

    const handleEndTimeChange = (time) => {
        console.log('End time: ', time.format("hh:mmA"));
        setEndTime(time); 
    }

    const handlePlayers = (value) => {
        if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
            setPlayers(parseInt(value));
        }
    }

    useEffect(() => {
        console.log("Updated location: ", location);
    }, [location]);

    useEffect(() => {
        console.log("Updated date: ", date);
    }, [date]);

    useEffect(() => {
        console.log("Updated players ", players);
    }, [players]);

    useEffect(() => {
        console.log("Start time is: ", startTime, " End time: ", endTime);
    }, [startTime, endTime]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex-col p-6 rounded-lg shadow-lg w-1/3 h-1/2 relative bg-neon">
                <div className='bg-customwhite p-4 flex-col rounded-lg'>
                    <FontAwesomeIcon icon={faSquareXmark} size="2xl" className='absolute top-2 right-2 cursor-pointer' onClick={closeAddModal} />
                    <h1 className='text-3xl font-extrabold text-center'>Create An Event</h1>
                    <div className='ml-10'>
                        <div className="flex-col mt-5">
                            <p className='text-lg font-semibold'>Sport</p>
                            <input type="text" value={sportName} onChange={(e) => setSportName(e.target.value)} className="border-solid border-2 border-blak w-full" />
                        </div>
                        <div className="flex-col">
                            <p className='text-lg font-semibold'>Address</p>
                            <StandaloneSearchBox onLoad={(ref) => locationRef.current = ref} onPlacesChanged={handleOnPlacesChanged}>
                                <input type="text" className="border-solid border-2 border-black w-full" />
                            </StandaloneSearchBox>
                        </div>
                        <div className='flex gap-5'>
                            <div className="flex-col">
                                <p className='text-lg font-semibold'>Date</p>
                                <DatePicker selected={date} onChange={handleDateChanged} dateFormat={"MM/dd/yyyy"} className='border-solid border-2 border-black' />
                            </div>
                            <div className='flex-col'>
                                <p className='text-lg font-semibold'>Status</p>
                                <select value={isPrivate ? "Private" : "Public"} onChange={(e) => setIsPrivate(e.target.value === "Private")} className='border-solid border-2 text-sm h-8'>
                                    <option value="Public">Public</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                            {isPrivate &&
                                <div className='flex-col'>
                                    <p className='text-lg'>Players</p>
                                    <input type="text" onChange={(e) => handlePlayers(e.target.value)} className='border-solid border-2 w-15' />
                                </div>}
                        </div>
                        <div className='flex justify-between'>
                            <div className="flex-col">
                                <p className='text-lg font-semibold'>Start Time</p>
                                <DatePickerMulti disableDayPicker value={startTime} onChange={handleStartTimeChange} format="hh:mm A" plugins={[<TimePicker hideSeconds />]} />
                            </div>
                            <div className="flex-col">
                                <p className='text-lg font-semibold'>End Time</p>
                                <DatePickerMulti disableDayPicker value={endTime} onChange={handleEndTimeChange} format="hh:mm A" plugins={[<TimePicker hideSeconds />]} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-10 gap-5'>
                        <button onClick={closeAddModal} className='bg-darkGreen w-20 text-customwhite font-semibold hover:text-blak text-lg hover:bg-neon'>Cancel</button>
                        <button onClick={createEventRequest} className='bg-darkGreen w-20 text-lg text-customwhite font-semibold hover:text-blak hover:bg-neon'>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}