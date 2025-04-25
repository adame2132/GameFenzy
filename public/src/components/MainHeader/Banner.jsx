import Nav from './BannerSubComponents/Nav'
import Logo from './BannerSubComponents/Logo'
import Profile from './BannerSubComponents/Profile'
import SideMenu from './BannerSubComponents/SideMenu'
import { useSideMenuStore } from '../../store'
export default function TopBanner(){
    const {isSideMenuOpen} = useSideMenuStore();
    return(
        <div className='flex items-center border-b-4 border-neon shadow-[0_4px_20px_rgba(0,255,0,0.6)] bg-blak h-20 gap-10 w-screen px-4'>
            <Logo />
            <Nav />
            <div className='ml-auto'>
                <Profile />
            </div>
            {isSideMenuOpen && <SideMenu />}
        </div>
    )
}