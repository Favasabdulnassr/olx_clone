import React, { Fragment,useContext,useState } from 'react'
import Header from '../Header/Header'
import './Create.css'
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import {storage,db} from '../../firebase/config'
import { Authcontext } from '../../store/Context'
import {useNavigate} from 'react-router-dom'
import { Firestore,collection,addDoc } from 'firebase/firestore'
import {toast} from 'react-toastify'

function Create() {

    const [name, setName] = useState('')
    const [category,setCategory] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState(null)
    const {user} = useContext(Authcontext)
    const date = new Date()
    const navigate = useNavigate()

    


    const downloadUrl = async() => {

      const imageref = ref(storage, `images/${image.name}`);

      try{
        await uploadBytes(imageref,image);

        const Url = await getDownloadURL(imageref);

        return Url

      }catch (error) {
        console.error('Error uploading image:',error)
      }


        
    }

    const handleSubmit = async () => {

    


      if (!name || !category || !price) {
        toast.error("Please fill in all the required fields.");
        return; 
      } 
      
      if (!/^\d+$/.test(price)) {
        toast.error("Price should contain only digits.");
        return; 
      }

      if (!/^[A-Za-z]{3,}$/.test(category)){
        toast.error('category format is incorrect')
        return; 
      }

      if (!/.{3,}/.test(name)) {
        toast.error("Name should contain at least three characters.");
        return;
    }




  





      const imageUrl = await downloadUrl()
      try{

        await addDoc(collection(db,'products'), {

          name,
          category,
          price,
          imageUrl,
          userId:user.uid,
          createdAt:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        });

        await toast.success('Product successfully created')
        setTimeout(() => {
          navigate('/');
      }, 6000); // Adjust the delay time as needed
        
      }catch(error){
        console.error('Error adding product to Firestore:', error);

      }
    }

  return (
    <Fragment>
        <Header/>

            <div className='centerDiv'>
                    <label htmlFor='fname'>Name</label>
                    <br />

                    <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    id="fname"
                    name="Name"
                    defaultValue="John"
                    />
                    <br />

                    <label htmlFor="fname">Category</label>
                    <br />

                    <input
                    className="input"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="fname"
                    name="category"
                    defaultValue="John"
                    />
                    <br />

                    <label htmlFor="fname">Price</label>
                    <br />

                    <input className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="fname" name="Price" />
                    <br />


                <br />
                <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image) :''}></img>
                
                    <br />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" />
                    <br />
                    <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

            </div>
            
    </Fragment>
  )
}

export default Create