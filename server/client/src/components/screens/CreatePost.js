import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import M from 'materialize-css'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [place, setPlace] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    
    useEffect(()=>{
        if(url){

       
        fetch("/createPost",{
            method: "post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                title,
                description,
                place,
                image:url
            })
            
        }) 
        
         
        .then(res =>res.json())
        .then(data =>{
            if(data.error){
                M.toast({html:data.error, classes:"red"})

            }
            else{
                M.toast({html:"Created Post Successfully", classes:"green"})

                history.push('/')
            }

            
        }).catch(err=>{
            console.log(err)
        })
    }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "samdeevenfiles")
        fetch("	https://api.cloudinary.com/v1_1/samdeevenfiles/image/upload", {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })


    }






    return ( 
        <div className = "card input-field" >
        
        <input type = "text"
        placeholder = "Title"
        value = { title }
        onChange = {
            (e) => setTitle(e.target.value) }
        /> 
        <input type = "text"
        placeholder = "Description"
        value = { description }
        onChange = {
            (e) => setDescription(e.target.value) }
        /> 
       <input type = "text"
        placeholder = "Place"
        value = { place }
        onChange = {
            (e) => setPlace(e.target.value) }
        />

        
<div className = "file-field input-field">
       
<div className = "btn">
        
<span>Upload Image</span> 
<input type = "file"
        onChange = {
            (e) => setImage(e.target.files[0]) }
        /> 
        </div>

        
        <div className = "file-path-wrapper">
        
        <input className = "file-path validate"
        type = "text"/>
        
        </div> 
        </div> 
        <button className = "btn"
        onClick = {
            () => postDetails() }>Submit Post</button> 
        </div>
    )
}

export default CreatePost