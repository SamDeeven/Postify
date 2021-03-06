import React,{useEffect,createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Profile from './components/screens/profile'
import Signin from './components/screens/signin'
import Signup from './components/screens/signup'
import CreatePost from './components/screens/CreatePost'
import {reducer, initialState} from './reducers/userReducer'


export const UserContext= createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(typeof(user), user)
    if(user){
      dispatch({type:"USER", payload:user})
      // history.push('/')
          }
          else{
            history.push('/signin')
          }
  },[])
  return(
    <Switch>
    <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
      <Route path='/createPost'>
        <CreatePost />
      </Route>
      </Switch>
  )
}




function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (

    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>

      <NavBar />
      <Routing/>
      

    </BrowserRouter>
    </UserContext.Provider>
    );
}

export default App;
