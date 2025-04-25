
import logo from '../../../assets/gameFrenzylogo.png';

export default function Logo(){
    return(
    <div className='flex gap-1 items-center'>
        <img src= {logo} alt=""  className='w-20'/>
        <h1 className='text-4xl  font-bold text-neon'>Game Frenzy</h1>
    </div>
    )
}