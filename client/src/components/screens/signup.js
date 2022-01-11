import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css'




const Signup = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [country,setCountry] = useState("")
    const PostData = ()=>{
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //     M.toast({html:"Invalid Email"})
        //     return
        // }
      
        fetch("/signup",{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                country,
                email,
                password
            })
            
        }) 
        
         
        .then(res =>res.json())
        .then(data =>{
            if(data.error){
                M.toast({html:data.error, classes:"red"})

            }
            else{
                M.toast({html:data.message, classes:"green"})

                history.push('/signin')
            }

            
        }).catch(err=>{
            console.log(err)
        })
        

    }



    return(
<div className="mycard">
    <div className="card auth-card">
        <h2 className="instaName">Postify</h2>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} />
        <input type="text" placeholder="Enter Country" value={country} onChange={(e)=> setCountry(e.target.value)}/>
        <input type="email" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button className="btn" onClick={()=>PostData()}>Sign up</button>
        <h6>
            <Link to='/signin'>Already have an Account? Click here</Link>
        </h6>
    </div>
</div>    
)
}
export default Signup