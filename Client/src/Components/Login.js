import React, { useState } from 'react'
import axios from 'axios';
import "../CSS/Login.css"
import { toast } from 'react-toastify';


const Login = () => {

 const [registrationdata, setRegistrationdata] = useState();
 const [logindata, setLogindata] = useState()

 const handlechange=( e ) =>
 {
   setRegistrationdata( { ...registrationdata, [ e.target.name ]: e.target.value } )
   console.log( registrationdata )
 }

 const handlelogin = (e) =>{
  setLogindata( { ...logindata, [ e.target.name ]: e.target.value } )
   console.log( logindata )
 }

 const Registration = (event) =>{
  axios.post( 'http://localhost:3001/api/register', {
    email: registrationdata.email,
    password: registrationdata.pswd,
    username:registrationdata.txt
    
  } )
    .then( function ( response )
    {
      toast("User Created Successfully")
    } )
    .catch( function ( error )
    {
      toast("User Already Exist")
    } );
    event.preventDefault();
 }

 const Login = (event) =>{
  axios.post( 'http://localhost:3001/api/login', {
    email: logindata.email,
    password: logindata.pswd
  } )
    .then( function ( response )
    {
      console.log( response );
    } )
    .catch( function ( error )
    {
      console.log( error );
    } );
    event.preventDefault();
 }

  return (
      <div className="main">  	
        <input type="checkbox" id="chk" aria-hidden="true"/>
          <div className="signup">
            <form>
              <label for="chk" aria-hidden="true">Sign up</label>
              <input type="text" name="txt" placeholder="User name" required="" onChange={handlechange}/>
              <input type="email" name="email" placeholder="Email" required="" onChange={handlechange}/>
              <input type="password" name="pswd" placeholder="Password" required="" onChange={handlechange}/>
              <button onClick={Registration}>Sign up</button>
            </form>
          </div>
    
          <div className="login">
            <form>
              <label for="chk" aria-hidden="true">Login</label>
              <input type="email" name="email" placeholder="Email" required="" onChange={handlelogin}/>
              <input type="password" name="pswd" placeholder="Password" required="" onChange={handlelogin}/>
              <button onClick={Login}>Login</button>
            </form>
          </div>
      </div>
  )
}

export default Login