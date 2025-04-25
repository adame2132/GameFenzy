import logo from '../../../assets/react.svg';
import { useEffect, useState } from 'react';
import { useUserStore, useSideMenuStore } from '../../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';


export default function Profile() {
    const { openSideMenu } = useSideMenuStore();
    const { user } = useUserStore();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    useEffect(() => {
        if (user) {
            setFname(user.fname);
            setLname(user.lname);
        }
    }, [user]);

    const handleClicked = () => {
        openSideMenu();
        console.log("side menu should open");
    };

    return (
        <div
            className="flex items-center gap-3 bg-lightgrey hover:bg-neon cursor-pointer p-3  w-50 h-12 hover:font-semibold"
            onClick={handleClicked}
        >
            <FontAwesomeIcon icon={faCircleUser} size='2x' />
            {/* <img src={logo} alt="" className="w-18 h-18 rounded-full object-cover" /> */}
            <h2 className="text-black text-lg">{fname} {lname}</h2>
        </div>
    );
}