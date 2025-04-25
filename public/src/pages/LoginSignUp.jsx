import Header from '../components/Header'
import Signup1 from '../components/Signup1'
import LoginHero from '../components/LoginHero'
import Google from '../components/Google'
import Login from '../components/Login'
import LoginPrompt from '../components/LoginPrompt'
import {useState} from 'react'
export default function LoginSignUp() {
    var [logingIn, setLogingIn] = useState(true);
    var [hideGoogle, setHideGoogle] = useState(false);
    const handleHideGoogle = () => {
        console.log("Next was clicked");
        setHideGoogle(true);
    }
    var[prompt, setPrompt] = useState("Dont Have An Account?");
    const switchComponent = () =>{
        console.log("SwitchCompnet function called on parent side");
        if(logingIn){
            setLogingIn(false);
            setPrompt("Already Have An Account?");
        }
        else{
            setLogingIn(true);
            setPrompt("Dont Have An Account?");
        }
    }
    return (
        <div className='flex w-screen h-screen bg-blak justify-center gap-40'>
            <div className=' flex flex-col w-[500px] gap-10'>
                <Header/>
                {logingIn && <Login/>}
                {!logingIn && <Signup1 nextBtn={handleHideGoogle}/>}
                {!hideGoogle &&  (
                    <>
                        <Google/> 
                        <LoginPrompt message={prompt} swap={switchComponent}/>
                    </>
                    )}
            </div>
            <LoginHero />
        </div>
    )
}