import React, {useState,useContext} from 'react'
import './Login.css'
import {auth} from '../../firebase/config'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleLogin = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
      navigate("/")

    }).catch((error)=>alert('invalid user'))

  }
  return (
    <div>
      <div className='loginParentDiv'>
        
        <img width="200px" height="200px" src='./olx-logo.png'></img>
          <form onSubmit={handleLogin}>
            <label htmlFor='fname'>Email</label>
            <br/>

            <input
              className='input'
              type='email'
              id='fname'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name='email'
            />
            <br/>

            <label htmlFor='lname'>Password</label>
            <br/>

            <input
            className='input'
            type='password'
            id='lname'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name='password'
            
            />
            <br/>
            <br/>

            <button>Login</button>

          </form>

        <a href='/signup'>Signup</a>  
        

      </div>
    </div>
    )
}

export default Login