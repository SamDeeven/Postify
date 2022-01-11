import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../../App";

const Profile = ()=>{
    const [myPics, setMyPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
      fetch('myPosts',{
          headers:{
              "Authorization":"Bearer " + localStorage.getItem('jwt')
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result) 
          setMyPics(result.myPosts)
      })  
    },[])
    return(
        <div style={{maxWidth:'550px', margin:"0px auto"}}>
            <div style={{display:"flex", justifyContent:"space-around", margin:"18px 0px ", borderBottom: '1px solid grey'}}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src="https://i.scdn.co/image/ab67616d0000b273daa08d4fb47d7e944f081075"/>
                </div>
                <div>
                    <h4>{state?state.name:"Loading..."}</h4>
                    <div style={{display:'flex', justifyContent:'space-between', width:'108%'}} >
                        <h6>6 Posts</h6>
                        <h6>49 Followers</h6>
                        <h6>40 Following </h6>

                    </div>
                </div>
            </div>


            <div className="gallery">
                {
                    myPics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.image} alt="photo"/>
                           
                        )
                    })
                }
              
                

            </div>
        </div>







    )
}
export default Profile