import logo from '../assets/gameFrenzylogo.png';

function Header(){
    return(
        <div className="flex h-20 items-center justify-center gap-2 bg-blak shadow-neon mt-20">
            <img src={logo} alt="" className='w-20' />
            <h1 className='text-4xl text-neon font-extrabold'>Game Frenzy</h1>
        </div>
    )
}

export default Header