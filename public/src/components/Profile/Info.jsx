import { useState, useEffect } from 'react';
import { useUserStore } from '../../store';
import SmallEventCard from './EventJr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import sportImage from "../../assets/gameFrenzyMarker.png"



export default function Info() {
    const [menuSelector, setMenuSelector] = useState(0);
    const { user, setUser } = useUserStore();
    const [bio, setBio] = useState(user.bio || '');
    const [originalBio, setOriginalBio] = useState(user.bio || '');
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [loadingJoinedEvents, setLoadingJoinedEvents] = useState(false);
    const [testFavSports, setTestFavSports] = useState(user.sport_intrests ?? []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSport, setNewSport] = useState('');
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);


    useEffect(() => {
        setHasChanged(bio !== originalBio);
    }, [bio, originalBio]);

    const fetchJoinedEvents = async () => {
        setLoadingJoinedEvents(true);
        try {
            const res = await fetch(`http://localhost:8080/participents/users/${user._id}`);
            if (!res.ok) throw new Error("Failed to fetch joined events");
            const data = await res.json();
            setJoinedEvents(data);
        } catch (err) {
            console.error("Error fetching joined events:", err);
        } finally {
            setLoadingJoinedEvents(false);
        }
    };

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await fetch(`http://localhost:8080/participents/users/history/${user._id}`);
            if (!res.ok) throw new Error("Failed to fetch joined events");
            const data = await res.json();
            setHistory(data);
        } catch (err) {
            console.error("Error fetching joined events:", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        if (menuSelector === 2) {
            fetchJoinedEvents();
        }
        if(menuSelector == 1){
            fetchHistory();
        }
    }, [menuSelector, user._id]);

    const handleMenuSelector = (value) => {
        setMenuSelector(value);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setBio(originalBio);
        setIsEditing(false);
    };

    const handleSave = async () => {
        const data = "bio=" + encodeURIComponent(bio);
        const response = await fetch(`http://localhost:8080/users/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        });
        if (response.status === 200) {
            const received = await response.json();
            setOriginalBio(received.bio);
            setUser(received);
            setIsEditing(false);
            setHasChanged(false);
        } else {
            console.log("Error updating the status");
        }
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };
    const handleAddSportClicked = () => {
        setIsModalOpen(true);
      };

      const handleModalClose = () => {
        setIsModalOpen(false);
        setNewSport('');
      };
      
      const handleAddSport = async () => {
        if (!newSport.trim()) return;
    
        const updatedSports = [...testFavSports, newSport.trim()];
    
        try {
            const response = await fetch(`http://localhost:8080/users/${user._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sport_intrests: updatedSports })
            });
    
            if (response.ok) {
                const updatedUser = await response.json();
                setTestFavSports(updatedUser.sport_intrests);
                setUser(updatedUser);
                handleModalClose();
            } else {
                console.error("Failed to update sports");
            }
        } catch (error) {
            console.error("Error updating sports:", error);
        }
    };
    const handleRemoveSport = async (sportToRemove) => {
        const updatedSports = testFavSports.filter(sport => sport !== sportToRemove);
      
        try {
          const response = await fetch(`http://localhost:8080/users/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sport_intrests: updatedSports }),
          });
      
          if (response.ok) {
            const updatedUser = await response.json();
            setTestFavSports(updatedUser.sport_intrests);
            setUser(updatedUser);
          } else {
            console.error('Failed to update sports');
          }
        } catch (error) {
          console.error('Error updating sports:', error);
        }
      };



    return (
        <div className="flex w-full gap-5 flex-col h-full">
            <div className="flex items-center h-16 bg-black pb-6 justify-start gap-5 mb-4 border border-black">
                {['Bio', 'History', 'Joined Events'].map((item, index) => (
                    <p
                        key={index}
                        onClick={() => handleMenuSelector(index)}
                        className={`cursor-pointer text-xl w-40 h-10 text-white font-semibold text-center leading-10
                            ${menuSelector === index ? 'bg-neon shadow-neon text-black' : 'bg-darkGreen text-white'}`}
                    >
                        {item}
                    </p>
                ))}
            </div>
            <div className="flex-grow overflow-y-auto pr-2">
                {menuSelector === 0 && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-3'>
                            <p className='text-2xl font-extrabold text-customwhite '>Athlete Bio</p>
                            {!isEditing && (
                                <button className='bg-darkGreen w-20  text-customwhite py-1 text-sm hover:bg-neon hover:text-blak' onClick={handleEdit}>Edit</button>
                            )}
                        </div>
                        <textarea
                            rows="5"
                            value={bio}
                            onChange={handleBioChange}
                            disabled={!isEditing}
                            placeholder="Add Bio"
                            className={`border rounded  w-3/5 h-60  p-2 resize-none ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                        {isEditing && (
                            <div className='flex gap-4 mt-2'>
                                <button onClick={handleCancel} className='bg-darkGreen px-3 py-1 text-customwhite hover:text-blak hover:bg-neon'>Cancel</button>
                                <button
                                    onClick={handleSave}
                                    disabled={!hasChanged}
                                    className={`px-3 py-1 rounded ${hasChanged ? 'bg-neon text-blak' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                                >
                                    Save
                                </button>
                            </div>
                        )}
                        <div className='flex gap-2 items-center  '>
                            <p className='text-2xl font-extrabold text-customwhite  mt-2'>Preferred sports</p>
                            <FontAwesomeIcon icon={faSquarePlus} className="text-darkGreen   hover:text-neon hover:drop-shadow-[0_0_10px_#39ff14] mt-2" size='2x' onClick={handleAddSportClicked}/>
                        </div>
                        <div className='flex gap-2 flex-wrap mt-8'>
                            {testFavSports.map((sport, index) => (
                                <div key={index} className='relative w-32 h-32 rounded-lg overflow-hidden shadow-neon' style={{backgroundImage: `url(${sportImage})`,backgroundSize: 'cover',backgroundPosition: 'center',}}>
                                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                                        <p className='text-neon font-extrabold text-lg capitalize'>{sport}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faSquareXmark} className='absolute top-1 right-1 text-darkGreen cursor-pointer  hover:text-neon hover:shadow-neon' size='2x' onClick={() => handleRemoveSport(sport)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {menuSelector === 1 && (
                    <div className="flex flex-col gap-4">
                        {loadingJoinedEvents ? (
                            <p>Loading History...</p>
                        ) : (
                            history.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {history.map(participation => (
                                        <SmallEventCard
                                            key={participation.event._id}
                                            event={participation.event}
                                            showCheckIn={false}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>You haven't joined any events yet.</p>
                            )
                        )}
                    </div>
                )}

            
                {menuSelector === 2 && (
                    <div className="flex flex-col gap-4">
                        {loadingJoinedEvents ? (
                            <p>Loading events...</p>
                        ) : (
                            joinedEvents.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {joinedEvents.map(participation => (
                                        <SmallEventCard
                                            key={participation.event._id}
                                            event={participation.event}
                                            onCheckIn={fetchJoinedEvents}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p>You haven't joined any events yet.</p>
                            )
                        )}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
                    <div className='relative bg-neon rounded-lg p-6 z-10 w-96 flex shadow-neon'>
                        <div className="bg-white  rounded-lg p-6 z-10 w-96 flex flex-col">
                            <h2 className="text-xl  text-blak  font-extrabold mb-4">Add A Preferred Sport</h2>
                            <input
                                type="text"
                                placeholder="Enter a sport name"
                                value={newSport}
                                onChange={(e) => setNewSport(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                onClick={handleModalClose}
                                className="bg-darkGreen text-white px-4 py-2 rounded hover:bg-neon hover:text-blak font-semibold"
                                >
                                Cancel
                                </button>
                                <button
                                onClick={handleAddSport}
                                className="bg-darkGreen text-white px-4 py-2 rounded hover:bg-neon hover:text-blak font-semibold"
                                >
                                Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}