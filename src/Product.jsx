import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userContext } from "./Mycontext";
import "./Product.css";
const Product = () => {
  const obj = useContext(userContext);
  const fetchProducts = async () => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const result = await response.json();
    obj.setproduct(result);
    obj.setAllProduct(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add to items to cart
  const addToCart = (id, price) => {
    const isFound = obj.cartItems.some((i) => {
      if (i.id === id) {
        return true;
      }
      return false;
    });
    if (isFound) {
      obj.cartItems.map((i) => {
        if(i.id === id)
        {
          i.quantity = i.quantity + 1;
          i.total_price = i.price * i.quantity;
        }
      });
    } else {
      const items = obj.product.filter((i) => i.id === id);
      items[0].quantity = 1;
      items[0].total_price = price;
      obj.setCartitems([...obj.cartItems, items[0]]);
    }
  };
  return (
    <>
      <div className="products_heading">Our Products</div>
      <div className="product_card">
        {obj.product.map((i) => {
          var a=false
          if(!i.images[0]){
            console.log("no image")
            a=true
          }
          return (
            <>
              <div className="product_sub_card">
                {
                  a === false ? <img src={i.images[0]} alt="img" className="prod_img" /> :
                  <img className="prod_img" src = 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg' alt ='#' />
                }
                <div>{i.title}</div>
                <div>&#x20B9;{i.price}</div>
                <div>
                  <Button
                    id="add_cart_btn"
                    onClick={() => addToCart(i.id, i.price)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Product;
