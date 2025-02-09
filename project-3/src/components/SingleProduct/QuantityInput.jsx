import React from 'react'
import './QuantityInput.css'

const QuantityInput = ({quantity, setquantity, stock, cartPage, productId}) => {
  return (
    <>
                <button className="quantity_input_button" disabled={quantity <= 1} onClick={() =>{cartPage ?setquantity("decrease", productId) : setquantity(quantity-1)}}>{" "} - {" "}</button>
                <p className='quantity_input_count'>{quantity}</p>
                <button className="quantity_input_button" disabled={quantity >= stock} onClick={() => {cartPage ?setquantity("increase", productId) :setquantity(quantity + 1 )}}>+</button>
    </>
  )
}

export default QuantityInput