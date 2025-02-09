import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import Routing from "./components/Routing/Routing";
import setAuthToken from "./utils/setAuthToken";
import { getJwt } from "./services/userServices";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartApi,
  increaseProductAPI,
  removeFromCartAPi,
} from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "./services/userServices";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";

setAuthToken(getJwt());

const App = () => {
  const [user, setuser] = useState(null);
  const [cart, setcart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setuser(jwtUser);
      }
      setuser(jwtUser);
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product.id
    );
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setcart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product Added Successfully!");
      })
      .catch((err) => {
        toast.error("Failed to add product!");
        setcart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setcart(newCart);

    removeFromCartAPi(id).catch((err) => {
      toast.error("Something went wrong!");
      setcart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setcart(updateCart);

      increaseProductAPI(id).catch(err => {toast.error("Something went wrong!")
        setcart(oldCart)
      });
    }
    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setcart(updateCart);

      decreaseProductAPI(id).catch(err =>{toast.error("Something went wrong!")
        setcart(oldCart)
      })
    }
  };

  const getCart = () => {
    getCartApi()
      .then((res) => {
        setcart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setcart }}
      >
        <div className="app">
          <NavBar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
