import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  // const { cart } = props; // option -1
  // const cart = props.cart; // option-2
    
    // for total price, shipping calculation 
    let totalPrice = 0;
    let totalShipping = 0;
    for (const product of cart) { 
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }

    // tax
    const tax = totalPrice * 7 / 100;
    // grand total 
    const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h3>Order Summery: </h3>
      <p>Selected Items: {cart.length} </p>
      <p>Total Price: $ {totalPrice}</p>
      <p>Total Shipping: $ {totalShipping} </p>
      <p>Tax:$ {tax.toFixed(2)}</p>
      <h4>Grand Total:$ {grandTotal.toFixed(2)} </h4>
    </div>
  );
};

export default Cart;
