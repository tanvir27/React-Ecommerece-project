import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //
  useEffect(() => {
    // console.log(products);
    const storedCart = getShoppingCart();

    const savedCart = [];
    // step-1 get id
    for (const id in storedCart) {
      // step-2 get the product by using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // step-3 get quantity of product
        const quantity = storedCart[id];
        //  console.log(id, quantity);
        addedProduct.quantity = quantity;
        // step -4 add the added product to the saved cart
        savedCart.push(addedProduct);
      }
      // console.log("added product", addedProduct);
    }
    // step -5
    setCart(savedCart);
  }, [products]);

  // button handler
  const handleAddToCart = (product) => {
    // console.log(product);
    // const newCart = [...cart, product];
    let newCart = [];
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      products.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.id);
  };
  // handle clear cat button
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link className="proceed-link" to="/orders">
            <button className="btn-orders">
              <span> Review Orders</span>
              <FontAwesomeIcon className="" icon={faArrowRight} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
