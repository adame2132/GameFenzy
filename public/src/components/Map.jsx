import {useState, useEffect, use} from 'react'
import {GoogleMap, Marker} from '@react-google-maps/api'
import reactIcon from '../assets/gameFrenzymarker.png'
import userIcon from '../assets/userMarker.png'
import { useGoogleMapsStore } from '../store';
import SidePopup from './SideEventPopUp';

// export default function Map({events}){ //37.0965° N, 113.5684° W?
//     const {userLocation}  = useGoogleMapsStore();
//     const [isPopup, setIsPopup] = useState(false);
//     const [clickedEvent, setCLickedEvent] = useState(null);
//     const containerStyle = {
//         width: "100%",
//         height: "500px"
//     };
//     const center = userLocation ? {
//         lat: userLocation.lat,
//         lng: userLocation.lng
//        // (Saint George Utah)
//     }:{ lat: 37.0965, lng: -113.5684 };

//     const options = {
//         styles: [{
//             featureType: "poi",
//             stylers: [{ visibility: "off" }]
//         }
//         ]
    
//     };
   
//     const handleMapClick = (marker) =>  {
//         console.log("clicked pin ", marker);
//         setIsPopup(true);
//     }

//     return (
//         <div className='w-screen z-2'>
//             <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} options={options}>
//                 {userLocation && <Marker title={"me"}position={userLocation} onClick={(event)=> handleMapClick(event)} options={{icon: {url: userIcon, scaledSize: new window.google.maps.Size(40, 40)}} } />}
//                 {events && events.map(marker => (
//                     <Marker key={marker._id} title={marker.sportName} position={marker.geolocation} onClick={()=> handleMapClick(marker)} options={{icon: {url: reactIcon, scaledSize: new window.google.maps.Size(80, 80)}} }/>
//                 ))}
//             </GoogleMap>
//             {isPopup && <SidePopup/> }
//         </div>
//     )
// }

export default function Map({ events }) {
    const { userLocation } = useGoogleMapsStore();
    const [isPopup, setIsPopup] = useState(false);
    const [clickedEvent, setClickedEvent] = useState(null);

    const containerStyle = {
        width: "100%",
        height: "500px",
    };

    const center = userLocation
        ? { lat: userLocation.lat, lng: userLocation.lng }
        : { lat: 37.0965, lng: -113.5684 };

    const options = {
        styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
    };

    const handleMapClick = (marker) => {
        setClickedEvent(marker);
        setIsPopup(true);
    };

    const closePopup = () => {
        setIsPopup(false);
        setClickedEvent(null);
    };

    return (
        <div className="relative w-full h-[500px]">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                options={options}
            >
                {userLocation && (
                    <Marker
                        title={"me"}
                        position={userLocation}
                        onClick={(event) => handleMapClick(event)}
                        options={{
                            icon: {
                                url: userIcon,
                                scaledSize: new window.google.maps.Size(40, 40),
                            },
                        }}
                    />
                )}
                {events &&
                    events.map((marker) => (
                        <Marker
                            key={marker._id}
                            title={marker.sportName}
                            position={marker.geolocation}
                            onClick={() => handleMapClick(marker)}
                            options={{
                                icon: {
                                    url: reactIcon,
                                    scaledSize: new window.google.maps.Size(80, 80),
                                },
                            }}
                        />
                    ))}
            </GoogleMap>
            {isPopup && (
                <SidePopup
                    event={clickedEvent}
                    onClose={closePopup}
                />
            )}
        </div>
    );
}