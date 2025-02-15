import React, {useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import './SingleProductPage.css'
import QuantityInput from './QuantityInput';
import useData from '../../hooks/useData';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';


const SingleProductPage = () => {
    const user = useContext(UserContext)
    const {addToCart} = useContext(CartContext)
    const [selectedImage, setselectedImage] = useState(0)
    const [quantity, setquantity] = useState(1)
    const {id} = useParams()

    const {data: product, error} = useData(`/products/${id}`)   
  return (
    <section className="align_center single_product">
        {error && <em className='form_error'>{error}</em>}
       {product && <><div className="align_center">
            <div className="single_product_thumbnails">
                {
                    product.images.map((image, index) => <img src={`http://localhost:5000/products/${image}`} alt={product.title} className={selectedImage === index ? 'selected_image' : ""} onClick={() => setselectedImage(index)}/>)
                }
            </div>
            <img src={`http://localhost:5000/products/${product.images[selectedImage]}`} alt={product.title} className='single_product_display' />
        </div>

        <div className="single_product_details">
            <h1 className="single_products_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>

            {user && <>
            <h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
                <QuantityInput quantity={quantity} setquantity={setquantity} stock={product.stock}/>
            </div>
            <button className="search_button add_cart" onClick={() => addToCart(product, quantity)}>Add to cart</button></>}
        </div></>}
    </section>
)
}

export default SingleProductPage