import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContentContext } from "../../Context/Context";
import { ToastContainer, toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css";
import emptyCart from "../../assets/emptycart.png";
import "./Cart.css"; // Import the CSS file for styling

const Cart = () => {
  const { contentData } = useContentContext();
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    formatCartData();
  }, [contentData]);

  const formatCartData = () => {
    const formattedCartData = contentData
      .filter((content) => content.quantity > 0)
      .map((item) => ({
        _id: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      }));
    setCartData(formattedCartData);

    updateTotalPrice(formattedCartData);
  };

  const updateTotalPrice = (updatedCartData) => {
    const total = updatedCartData.reduce(
      (acc, item) => acc + (item.total || 0),
      0
    );
    setTotalPrice(total);
  };

  const handlePurchase = async () => {
    let transactionSaved = false;

    try {
      for (const item of cartData) {
        const { _id, ...postData } = item;
        const response = await fetch(
          "https://todayq-contentoffer-website.onrender.com/api/order/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.json();
          console.error(`Failed to add item: ${errorMessage.message}`);
          toast.error(`Failed to add item: ${errorMessage.message}`);
          return;
        }
      }

      if (!transactionSaved) {
        toast.success(`Your order is done`);
        setCartData([]); // Clear cart data
        setTotalPrice(0); // Reset total price
        transactionSaved = true;
      }
    } catch (error) {
      console.error("Error adding item to order:", error);
      toast.error("An unexpected error occurred while saving the order data");
    }
  };

  const incrementQuantity = (itemId) => {
    const updatedCartData = cartData.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
          total: item.price * (item.quantity + 1),
        };
      }
      return item;
    });
    setCartData(updatedCartData);
    updateTotalPrice(updatedCartData);
  };

  const decrementQuantity = (itemId) => {
    const updatedCartData = cartData
      .map((item) => {
        if (item._id === itemId && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1,
            total: item.price * (item.quantity - 1),
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCartData(updatedCartData);
    updateTotalPrice(updatedCartData);
  };

  return (
    <>
      <header className="home-header">
        <h2>Your Order</h2>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </header>
      <div className="cart-container">
        <ToastContainer position="top-center" />{" "}
        {/* Set position to bottom-center */}
        <div className="cart-items">
          {cartData.length === 0 ? (
            <div>
              <img src={emptyCart} alt="Cart" id="emptyCart" />
              <p className="empty-cart-message">Cart is empty</p>
            </div>
          ) : (
            cartData.map((item, index) => (
              <div key={item._id} className="cart-item">
                <p className="item-title">Item: {item.title}</p>
                <p className="item-price">Price: {item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className="quantity-button"
                  >
                    +
                  </button>
                  <button className="quantity-display">
                    Quantity: {item.quantity}
                  </button>
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    className="quantity-button"
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartData.length > 0 && (
          <>
            <p className="total-price">Total Cart Price: {totalPrice}</p>
            <button onClick={handlePurchase} className="purchase-button">
              Purchase Content
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
