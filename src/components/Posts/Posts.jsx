import React,{useEffect,useState,useContext} from 'react'
import Heart from '../../assets/Heart'
import './Posts.css'
import {collection,getDocs} from 'firebase/firestore'
import {db} from '../../firebase/config'
import { PostContext } from '../../store/PostContext'
import {useNavigate} from 'react-router-dom'


function Posts() {
    const [productData,setProducts] = useState([])
    const {setPostDetails} = useContext(PostContext)
    const navigate = useNavigate()

    useEffect(() => {
        const getDatas = async () => {
            try{
                const productsCollectionReference = collection(db,"products");
                const snapshot = await getDocs(productsCollectionReference);

                const products_arr = snapshot.docs.map((doc) =>doc.data());
                console.log(products_arr,'aaaaaaaaaaaaaa')
                
                setProducts(products_arr)
            }catch(error){

                console.error('error fetching data',error);
            

            };
        }
        getDatas(); 

        
    },[])
  return (
    <div className='postParentDiv'>
        <div className='moreView'>
            <div className='heading'>
                <span>Quick Menu</span>
                <span>View more</span>
            </div>
            
            <div className='cards'>

            {productData.map(product => 
                <div className='card'  onClick={() =>{
                    setPostDetails(product)
                    navigate('/view')
                }}>
                    <div className='favourite'>
                        <Heart/>
                    </div>

                    <div className="image">
                        <img src= {product.imageUrl} alt="" />
                    </div>

                    <div className="content">
                        <p className="rate">&#x20B9; {product.price} </p>
                        <span className="kilometer">{product.category}</span>
                        <p className="name"> {product.name} </p>
                    </div>

                    <div className="date">
                        <span> {product.createdAt} </span>
                    </div>

                </div>

            )}

            </div>
        </div>

        <div className="recommendations">
            <div className="heading">
            <span>Fresh recommendations</span>
            </div>

            <div className="cards">

                <div className="card">

                    <div className="favorite">
                    <Heart></Heart>
                    </div>

                    <div className="image">
                    <img src="./R15V3.jpg" alt="" />
                    </div>

                    <div className="content">
                    <p className="rate">&#x20B9; 250000</p>
                    <span className="kilometer">Two Wheeler</span>
                    <p className="name"> YAMAHA R15V3</p>
                    </div>

                    <div className="date">
                    <span>10/5/2024</span>
                    </div>

                </div>

            </div>
        </div>

    </div>
  )
}

export default Posts