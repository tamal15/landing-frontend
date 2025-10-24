import PropTypes from "prop-types";
import React, { createContext, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);

  useEffect(() => {
    const allCart = JSON.parse(localStorage.getItem("productCart"));
    if (allCart) setCart(allCart);
  }, []);

  
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;