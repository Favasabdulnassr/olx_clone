import React,{useContext,useEffect} from 'react';
import './App.css';
import Home from './Pages/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Signup_page from './Pages/Signup_page';
import Login_page from './Pages/Login_Page';
import CreatePage from './Pages/CreatePage';
import ViewPost from './Pages/ViewPost';
import { Authcontext } from './store/Context';
import {auth} from './firebase/config';
import {onAuthStateChanged} from 'firebase/auth'
import Post from './store/PostContext';


function App() {
  const{setUser} = useContext(Authcontext)
  
  useEffect(()=>{
    onAuthStateChanged(auth,(user) => {
      setUser(user)
    })
  })
  
  return (
    <>

    <Post>
      <Router>
       
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup_page/>} />
          <Route path="/login" element={<Login_page/>} />
          <Route path="/create" element={<CreatePage/>}/>
          <Route path='/view' element={<ViewPost/>}/>

          
        </Routes>

      </Router>


    </Post>  


    </>
  );
}

export default App;

