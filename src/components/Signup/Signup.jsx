import React ,{useState,useContext} from 'react';
import './Signup.css'
import { FirebaseContext} from '../../store/Context';
import {auth,db}  from '../../firebase/config';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'



function Signup() {

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()


  const validatePassword = (password) => {
    // Password must contain at least one character, one number, not only space,
    // and must not start or end with a space. It should be at least six characters long.
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
};

  const validateUsername = (username) => {
    // Username must contain at least four characters, not other special characters,
    // not only space, and must not start or end with a space
    return /^[A-Za-z]{4,}$/.test(username);
  };

  const validatePhone = (phone) => {
    // Phone number must contain exactly 10 digits, not other characters,
    // not only space, and must not start or end with a space
    return /^\d{10}$/.test(phone);
  };

  

  const handleSubmit = (e)=>{

    e.preventDefault()


    if (!validatePassword(password)) {
      toast.error('password must meet the required standard')
      return;
    }

    if (!validateUsername(username)) {
      toast.error('username must meet the required standard')
      return;
    }

    if (!validatePhone(phone)) {
      toast.error('phone number must meet the required standard')
      return;
    }




    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{

      updateProfile(userCredential.user,{
        displayName:username
      })
      
      setDoc(doc(db,"users",userCredential.user.uid),{id:userCredential.user.uid,username:username,email:email,password:password,phone:phone})
     
    }).then(() => {

      toast.success('Signup Successfull');

      
      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    })
    .catch( (error) =>
    {
      console.error('Error signing up', error)
      toast.error("Error signing up please try again");
    });

    };
  
  return (
    <div>
        <div className='signupParentDiv'> 
            <img width='200px' height="200px" src='./olx-logo.png'></img>
            <form onSubmit={handleSubmit}>
                <label htmlFor='fname'> Username</label>
                <br/>
                <input
                  className='input'
                  type="text"
                  id='fname'
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  name='name'
                />

                <br/>
                <label htmlFor="fname">Email</label>       
                <br />

                <input
                className='input'
                type='text'
                id='fname'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                name='email'
                />
                <br/>

                <label htmlFor='lname'>Phone</label>
                <br/>

                <input
                className='input'
                type='tel'
                id='lname'
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                name='phone'
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

                <button>Signup</button>
            </form>

            <a href='/login'>Login</a>

        </div>
    </div>
  )
}

export default Signup