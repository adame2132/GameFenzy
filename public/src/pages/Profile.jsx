import TopBanner from '../components/MainHeader/Banner'
import { useUserStore } from '../store' 
import Userprofile from '../components/UserProfile'
import Info from '../components/Profile/Info'
export default function Profile(){
    const {user} = useUserStore()
    return(
        <div>
             <TopBanner/>
             <div className='flex gap-10 h-screen bg-blak justify-center'>
                <div className='w-2/5 bg-white shadow-neon h-4/5 mt-5'>
                    <Userprofile person={user}/>
                </div>
                <div className='w-3/5 bg-blak h-4/5 mt-5'>
                    <Info/>
                </div>
             </div>
        </div>
    )
};