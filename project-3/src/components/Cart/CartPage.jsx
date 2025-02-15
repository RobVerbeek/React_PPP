import React, { useEffect, useState, useContext } from 'react'
import './CartPage.css'
import UserContext from '../../contexts/UserContext'
import Table from '../Common/Table'
import QuantityInput from '../SingleProduct/QuantityInput'
import remove from '../../assets/remove.png'
import CartContext from '../../contexts/CartContext'
import { toast } from "react-toastify";
import {checkoutAPI} from '../../services/OrderServices'

const CartPage = () => {
    const [subTotal, setsubTotal] = useState(0)
    const user = useContext(UserContext)
    const {cart, removeFromCart, updateCart, setCart} = useContext(CartContext)
    const checkout = () => {
        const oldCart = [...cart]
        setCart([])
        checkoutAPI().then(() =>{
            toast.success("order placed successfully!")
        }).catch(() => {
            toast.error("something went wrong!")
            setCart(oldCart)
        }    
    )}
    useEffect(() => {
        let total = 0
        cart.forEach(item => {
            total += item.product.price * item.quantity
        })
        setsubTotal(total)
    }, [cart])
  return (
    <section className="align_center cart_page">
        <div className="align_center user_info">
            <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="" />
            <div>
                <p className="user_name">Name: {user?.name}</p>
                <p className="user_email">Email: {user?.email}</p>
            </div>
        </div>

        <Table headings={["Item","Price","Quantity","Total","Remove"]}>
            <tbody>
                {cart.map(({product, quantity}) => <tr key={product._id}>
                <td>
                    {product.title}
                </td>                    
                <td>
                    ${product.price}
                </td>                    
                <td className='align_center table_quantity_input'>
                    <QuantityInput quantity={quantity} stock={product.stock} setquantity={updateCart} CartPage={true} productId={product._id}/>
                </td>                    
                <td>
                    ${quantity * product.price}
                </td>                    
                <td>
                    <img src={remove} alt="" className='cart_remove_icon' onClick={() => removeFromCart(product._id)}/>
                </td>
            </tr>)}
                </tbody> 
                </Table>

        <table className="cart_bill">
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>${subTotal}</td>
                </tr>                <tr>
                    <td>Shipping Charge</td>
                    <td>$5</td>
                </tr>                
                <tr className='cart_bill_final'>
                    <td>Total</td>
                    <td>${subTotal + 5}</td>
                </tr>
            </tbody>
        </table>

        <button className="search_button checkout_button" onClick={checkout}>Checkout</button>
    </section>
)
}

export default CartPage