import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

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
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
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
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
