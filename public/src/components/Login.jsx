import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useUserStore } from '../store';

export default function Login(){
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const setToken = useUserStore((state) => state.setToken);
    const setUser = useUserStore((state) => state.setUser);
    const setRefresh = useUserStore((state) => state.setRefresh);
    const AttemptLogin = async () => {
        try{
            var data = 'email=' + encodeURIComponent(email);
            data += '&password=' + encodeURIComponent(password);
            console.log('data being sent to login is :', data);
            //go get the encoded jwt token 
            const response = await fetch('http://localhost:8080/sessions', {
                method: "Post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            });
            if(response.status === 201){
                const cred = await response.json()
                console.log('Logged in: ', cred);
                //save the data to the user store 
                setToken(cred.token);
                setUser(cred.user);
                setRefresh(cred.refresh);
                // const data = await response.json();
                // console.log('key is: ', data);
                setLoggedIn(true);

            }
        }catch(error){
            console.log("Error trying to log in", error);
        } 
    } 
    useEffect(()=>{
        if(loggedIn){
            navigate('/events')
        }
    },[loggedIn, navigate]);
    
    return(
        <div>
            <div className="flex flex-col gap-5">
                <h1 className='text-4xl text-center text-neon font-extrabold'>Login</h1>
                <input  className="h-20 border-solid border-1 border-black text-center"type="text" value = {email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input className="h-20 border-solid border-1 border-black text-center" type="text" value = {password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                <button className ='bg-neon text-blak font-semibold h hover:shadow-neon h-10' onClick={AttemptLogin}>Login</button>
            </div>
        </div>
    )
}