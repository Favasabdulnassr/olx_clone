import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context, {FirebaseContext} from './store/Context.jsx'
import FirebaseApp from './firebase/config.jsx'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
      <FirebaseContext.Provider value={{FirebaseApp}}>
        <Context>
          <App />
        </Context>
       <ToastContainer   position="top-center" />

      </FirebaseContext.Provider>


    </React.StrictMode>

)
