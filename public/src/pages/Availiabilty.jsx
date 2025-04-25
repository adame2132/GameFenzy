import TopBanner from '../components/MainHeader/Banner';
import { useState } from 'react';
import TimeGrid from '../components/AvailabilityPage/TimeGrid';
import Matchingfriend from '../components/AvailabilityPage/MathcingFriend';
import UpdateSchedule from '../components/AvailabilityPage/UpdateSchedule';
import TimeModal from '../components/AvailabilityPage/TimeModal';
import { useUpdateAvaliablityStore } from '../store';
export default function Availability() {
    const {isTimeModalOpen} = useUpdateAvaliablityStore();
    const [scheduleSwitch, setScheduleSwitch] = useState(0);

    const handleYourScheduleClicked = () => {
        setScheduleSwitch(0);
    };

    const handleFriendScheduleClicked = () => {
        setScheduleSwitch(1);
    };
    const handleUpdateScheduleClicked = () => {
        setScheduleSwitch(2);
    };

    return (
        <div className='flex w-screen h-screen flex-col bg-blak'>
            <TopBanner />
            { isTimeModalOpen && <TimeModal/>}
            <div className='flex gap-10 mt-10'>
                <div className='flex flex-col gap-5 w-2/3 justify-start'>
                    <div className='flex justify-between  ml-10 mt-10'>
                        <div className='flex gap-3'>
                            <button 
                                className={`w-40 h-10 text-center rounded text-md font-semibold ${scheduleSwitch === 0 ? 'bg-neon text-blak' : 'bg-darkGreen text-customwhite'}`} 
                                onClick={handleYourScheduleClicked}
                            >
                                Your Availability
                            </button>
                            <p className='text-3xl'>|</p>
                            <button 
                                className={`w-40 h-10 text-center rounded text-md font-semibold  ${scheduleSwitch === 1 ? 'bg-neon text-blak' : 'bg-darkGreen text-customwhite'}`} 
                                onClick={handleFriendScheduleClicked}
                            >
                                Friends Availability
                            </button>
                        </div>
                        <button className={`w-40 h-10 text-md font-semibold  ${scheduleSwitch === 2 ? 'bg-neon text-blak' : 'bg-darkGreen text-customwhite'} text-center rounded`}  onClick={handleUpdateScheduleClicked}>
                            Update Availability
                        </button>
                    </div>
                    {scheduleSwitch != 2 && <TimeGrid schedule={scheduleSwitch}/>}
                    {scheduleSwitch === 2 &&  <UpdateSchedule/>}
                </div>
                <Matchingfriend/>
            </div>
        </div>
    );
}