import { useUserStore, useSideMenuStore } from "../../../store"
import pic from "../../../assets/react.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faCircleUser } from "@fortawesome/free-solid-svg-icons"; 
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

export default function SideMenu() {
    const { user, logout } = useUserStore();
    const { closeSideMenu } = useSideMenuStore();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 10);
    }, []);

    const handleXClicked = () => {
        setIsVisible(false);
        setTimeout(() => {
            closeSideMenu();
        }, 300); 
    };

    const handleLogout = () => {
        closeSideMenu();
        logout();
    };

    const handlePageNav = () => {
        navigate("/users/profile");
        closeSideMenu();
    };

    return (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm flex justify-end">
            <div className={`h-full w-80 bg-blak border-l-2 border-gray-400 shadow-neon p-4 z-50 transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col items-center mt-5'>
                    <FontAwesomeIcon icon={faSquareXmark} size="2xl" className='self-end cursor-pointer text-customwhite' onClick={handleXClicked} />
                    {/* <img src={pic} alt="" className='h-30 w-30 rounded-full object-cover' /> */}
                    <h3 className='text-center text-3xl text-customwhite font-extrabold'>{user.fname} {user.lname}</h3>
                    <p className='text-xs'>{user.email}</p>
                    <div className='mt-5 w-full flex flex-col gap-2'>
                        <button className='h-12 bg-darkGreen text-customwhite hover:bg-neon hover:text-blak font-semibold text-lg' onClick={handlePageNav}>Profile</button>
                        <button className='h-12 bg-darkGreen text-customwhite hover:bg-neon hover:text-blak font-semibold text-lg'>Event History</button>
                        <button className='h-12 bg-darkGreen text-customwhite hover:bg-neon hover:text-blak font-semibold text-lg' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}