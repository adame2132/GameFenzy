import {useState, useEffect} from 'react'
import LoginPrompt from './LoginPrompt';
function Signup2(props){
    const email = props.email;
    const password = props.password;
    var [fname, setFname] = useState("");
    var [lname, setLname] = useState("");
    var [age, setAge] = useState("");
    const signUpBtnClicked = async () =>{
        try{
            console.log("sign up btn clicked");
            console.log("email passed is: ", email , " password prop passed: ", password);
            console.log("fname: ", fname, " lname: ", lname, " age: ", age);
            var data = 'fname='+ encodeURIComponent(fname);
            data += '&lname=' + encodeURIComponent(lname);
            data += '&age=' + encodeURIComponent(age);
            data += '&email=' + encodeURIComponent(email);
            data += '&password=' + encodeURIComponent(password);
            console.log("this is the data being sent: ", data);
            const response = await fetch('http://localhost:8080/users', {
                method: "Post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            if(!response.status === 201){
                console.log("Post status failed to create user");
            }
            console.log("User Created");
        }catch(error){
            console.log("error in trying to create");
        }
    }
    return(
        <div className='flex w-full flex-col gap-5 px-10'>
            <h1 className='text-4xl  text-center text-neon font-semibold'>Create an Account</h1>
            <input  className="h-20 border-solid border-1 border-black text-center" type="text" value={fname} onChange={(e) => setFname(e.target.value)}placeholder="First name"/>
            <input  className="h-20 border-solid border-1 border-black text-center" type="text" value={lname} onChange={(e) => setLname(e.target.value)}placeholder="Last name"/>
            <input  className="h-20 border-solid border-1 border-black text-center" type="text" value={age} onChange={(e) => setAge(e.target.value)}placeholder="Age"/>
            <button  className ='bg-neon hover:shadow-neon text-black font-semibold h-10' onClick={signUpBtnClicked}>Sign Up</button>
        </div>
    )
    
}
export default Signup2
