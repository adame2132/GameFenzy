import { useNavigate } from 'react-router-dom';
import { usePageStore } from '../../../store';

export default function Nav() {
    const { setCurrentPage, currentPage } = usePageStore();
    const navigate = useNavigate();

    const handleNavigation = (page) => {
        setCurrentPage(page);
        navigate(page);
    };

    return (
        <div className="flex gap-2">
            {/* <button
                className={`h-10 w-[100px] text-base text-center ${
                    currentPage === '/home' ? 'bg-neon font-semibold' : 'bg-lightgrey'
                } hover:bg-darkGrey hover:border-lightgrey border-2`}
                onClick={() => handleNavigation('/home')}
            >
                Home
            </button> */}
            <button
                className={`h-10 w-[100px] text-base text-center ${
                    currentPage === '/events' ? 'bg-neon font-semibold' : 'bg-lightgrey'
                } hover:bg-darkGrey hover:border-lightgrey border-2`}
                onClick={() => handleNavigation('/events')}
            >
                Home
            </button>
            <button
                className={`h-10 w-[100px] text-base text-center ${
                    currentPage === '/availiability' ? 'bg-neon font-semibold' : 'bg-lightgrey'
                } hover:bg-darkGrey hover:border-lightgrey border-2`}
                onClick={() => handleNavigation('/availiability')}
            >
                Availability
            </button>
            <button
                className={`h-10 w-[100px] text-base text-center ${
                    currentPage === '/friends' ? 'bg-neon font-semibold' : 'bg-lightgrey'
                } hover:bg-darkGrey hover:border-lightgrey border-2`}
                onClick={() => handleNavigation('/friends')}
            >
                Friends
            </button>
        </div>
    );
}