import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/sellButton';
import SellButtonPlus from '../../assets/sellButtonPlus';
import { Authcontext } from '../../store/Context';
import {signOut} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {auth} from '../../firebase/config'



function Header() {
  const {user} = useContext(Authcontext)
  const navigate = useNavigate()

  return (
    <div className='headerParentDiv'>
        <div className='headerChildDiv'>
            <div className='brandName'>
                <OlxLogo/>
            </div>

            <div className='placesearch'>
              <Search/>
              <input type="text"/>
              <Arrow/>
            </div>

            <div className='productsearch'>
              <div className='input'>
                <input
                type = "text"
                placeholder='Find car, mobile phone and more...'
                />
              </div>

              <div className='searchAction'>
                <Search color="#ffffff"/>
              </div>
            </div>

            <div className='language'>
              <span>ENGLISH</span>
              <Arrow/>

            </div>

            <div className='loginPage'>
            {user ?(
              <span>{user.displayName}</span>
            ) : (

              <a href='/login'>Login</a>

            )}  
          

            </div>

            {user&&<span onClick={()=>{
              signOut(auth);
              navigate('/login')
              
            }}>Logout</span>}

            <div className='sellMenu'  onClick={() => {   navigate('/create')}}>
              <SellButton/>
              <div className='sellMenuContent'>
                <SellButtonPlus/>
                <span>SELL</span>
              </div>
            </div>

            <div>
              <hr/>
            </div>

             
        </div>     
    </div>
  
  )
}

export default Header