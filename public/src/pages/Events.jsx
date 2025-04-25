import TopBanner from '../components/MainHeader/Banner'
import Map from '../components/Map'
import CreateEventForm from '../components/CreateEventForm'
import { useState, useEffect } from 'react'
import SearchBox from '../components/EventPage/SearchBox'
import Filter from '../components/EventPage/Filter'
import Event from '../components/EventPage/Event'
import { useAddModalStore, useEventDetailStore, useGoogleMaps, useGoogleMapsStore } from '../store'
import Detail from '../components/EventPage/Detail'

export default function Events() {
    const { isEventDetailOpen, events, loadEvents, searchQuery, filterType } = useEventDetailStore();
    const { isAddModalOpen, openAddModal } = useAddModalStore();
    const [isFiltered, setIsFiltered] = useState(false);
    const { isLoaded } = useGoogleMaps();
    const { userLocation, setUserLocation } = useGoogleMapsStore();

    useEffect(() => {
        if (searchQuery !== '' || filterType !== '') {
            setIsFiltered(true);
        } else {
            setIsFiltered(false);
        }
    }, [searchQuery, filterType]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    console.log('User location set');
                },
                (error) => {
                    console.error("Error getting location: ", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
        loadEvents();
    }, []);

    const addBtnClicked = (event) => {
        event.preventDefault();
        console.log("add event btn clicked");
        openAddModal();
    }

    const filteredEvents = (events || []).filter(event => {
        const matchesSearch =
            searchQuery === '' || event.sport_name.toLowerCase().includes(searchQuery.toLowerCase());
    
        const matchesFilter =
            filterType === '' ||
            (filterType.toLowerCase() === 'private' && event.private === true) ||
            (filterType.toLowerCase() === 'public' && event.private === false);
    
        return matchesSearch && matchesFilter;
    });

    return (
        <div className='flex flex-col items-center bg-blak min-h-screen'>
            <TopBanner />
            {isLoaded && <Map events={events} />}
            <div className='flex mt-5 w-full gap-10 self-center ml-40 mb-5'>
                <h1 className='text-3xl bg-darkGreen text-neon ml-30 border-solid border-customwhite font-extrabold border-2 w-50 text-center p-5'>Events</h1>
                <SearchBox />
                <Filter />
                <button className="bg-darkGreen w-40 hover:bg-neon font-extrabold text-customwhite hover:text-blak" onClick={(event) => addBtnClicked(event)}>Add Event</button>
            </div>
            <div className='flex flex-col items-center max-h-[600px] overflow-y-auto'>
                {filteredEvents.map(event => (
                    <Event key={event._id} event={event} />
                ))}
            </div>

            {isAddModalOpen && <CreateEventForm />}
            {isEventDetailOpen && <Detail />}
        </div>
    );
}