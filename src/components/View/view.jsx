import React,{useEffect,useState,useContext} from 'react';
import {collection, doc,getDoc} from 'firebase/firestore';
import './view.css';
import { PostContext } from '../../store/PostContext'
import {db} from '../../firebase/config'

function View() {

    const [userDetails,setUserDetails] = useState(null)
    const{postDetails} = useContext(PostContext)
    
    
    useEffect( () => {
            const fetchUserData = async() => {



                try {

                    
                    if (postDetails && postDetails.userId) {

                        const userDocRef = doc(db,'users',postDetails.userId);
                        const userDocSnapshot = await getDoc(userDocRef);


                

                    if (userDocSnapshot.exists) {

                        setUserDetails(userDocSnapshot.data());
                        console.log('User data:', userDocSnapshot.data());

                    }else{
                        
                        console.log('user not found')
                    }

                } 
                 else {
                    console.log('postDetails or postDetails.userId is undefined');
                }
                
                          }catch(error)
                          {
                            console.log('error fetching  user data',error)
                          }
            }

                fetchUserData();
            
    },[]);

  return (
    <div className='viewParentDiv'>
        <div className='imageShowDiv'>
            <img
                src={postDetails?.imageUrl || ''}
                alt=''
            />

        </div>

        <div className='rightSection'>
            <div className='productDetails'>
                   <p>&#x20B9; {postDetails?.price || ''} </p>
                    <span>{postDetails?.name || ''}</span>
                    <p>{postDetails?.category || ''}</p>
                    <span>{postDetails?.createdAt || ''}</span>
    
            </div>

            {userDetails && (
                    <div className='contactDetails'>
                        <p>Owner:{userDetails.username}</p>
                        <p>Phone No: {userDetails.phone}</p>
                    </div>
                )}


        </div>

    </div>
  )
}

export default View