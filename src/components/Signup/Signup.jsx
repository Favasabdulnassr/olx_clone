import React from 'react';
import './Signup.css'


function Signup() {
  return (
    <div>
        <div className='signupParentDiv'> 
            <img width='200px' height="200px" src='./olx-logo.png'></img>
            <form>
                <label htmlFor='fname'> Username</label>
                <br/>
                <input
                  className='input'
                  type="text"
                  id='fname'
                  name='name'
                  defaultValue="John"
                />

                <br/>
                <label htmlFor="fname">Email</label>       
                <br />

                <input
                className='input'
                type='text'
                id='fname'
                name='email'
                defaultValue='john'
                />
                <br/>

                <label htmlFor='lname'>Phone</label>
                <br/>

                <input
                className='input'
                type='number'
                id='lname'
                name='phone'
                defaultValue="Doe"
                />
                <br/>

                <label htmlFor='lname'>Password</label>
                <br/>

                <input
                className='input'
                type='password'
                id='lname'
                name='password'
                defaultValue='Doe'
                />
                <br/>
                <br/>

                <button>Signup</button>
            </form>

            <a>Login</a>

        </div>
    </div>
  )
}

export default Signup