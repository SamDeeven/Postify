import React,{useContext} from "react";
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from "../App";
const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
            <li><Link to="/createPost">Create Post</Link></li>,
            <li>
              <button className="btn #d32f2f red darken-1" 
              onClick={()=>{localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('./signin')

              }}
              >Sign out</button>

            </li>

      ]
    }else{
      return[
        <li><Link to="/signin">Sign in</Link></li>,
        <li><Link to="/signup">Sign up</Link></li>
       
      ]
    }
  }

    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left">Postify</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default NavBar; 