
import {useState} from 'react';
import SignUp2 from "./Signup2"



function Signup1({nextBtn}){
    var [nextPressed, setNextBtnPressed] = useState(false);
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    const nextBtnPressed = ()=>{
        console.log("Next btn clicked");
        console.log("email typed is: ", email);
        console.log("Password typed is: ", password);
        setNextBtnPressed(true);
        nextBtn();


    }
    if(!nextPressed){
        return(
            <div className="flex flex-col gap-5">
                <h1 className='text-4xl text-center text-neon font-semibold'>Create an Account</h1>
                <input  className="h-20 border-solid border-1 border-black text-center"type="text" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input className="h-20 border-solid border-1 border-black text-center" type="text" value = {password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                <button className ='bg-neon  text-black font-semibold hover:shadow-neon h-10' onClick={nextBtnPressed}>Next</button>
            </div>
        )
    }
    if(nextBtnPressed){
        return(
            <SignUp2 email={email} password={password}/>
        )
    }
}
export default Signup1

