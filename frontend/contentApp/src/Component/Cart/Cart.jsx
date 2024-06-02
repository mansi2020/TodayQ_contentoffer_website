import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContentContext } from '../../Context/Context';
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { contentData } = useContentContext();
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    formatCartData();
  }, [contentData]);

  const formatCartData = () => {
    const formattedCartData = contentData.filter(content => content.quantity > 0).map(item => ({
      _id:item._id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    }));
    setCartData(formattedCartData);

    updateTotalPrice(formattedCartData);
  };

  const updateTotalPrice = (updatedCartData) => {
    const total = updatedCartData.reduce((acc, item) => acc + (item.total || 0), 0); // Add a check for NaN
    setTotalPrice(total);
  };

  const handlePurchase = async () => {
    let transactionSaved = false; // Flag to track if the transaction was saved successfully
  
    try {
      for (const item of cartData) {
        const { _id, ...postData } = item; // Exclude _id field from postData
        const response = await fetch('https://todayq-contentoffer-website.onrender.com/api/order/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData), // Send postData without _id
        });
  
        if (!response.ok) {
          const errorMessage = await response.json(); // Get error message from response
          console.error(`Failed to add item: ${errorMessage.message}`);
          toast.error(`Failed to add item: ${errorMessage.message}`);
          return; // Exit the function if an error occurs
        }
      }
  
      // If all items were successfully saved and transactionSaved flag is false
      if (!transactionSaved) {
        toast.success(`Transaction saved successfully`);
        transactionSaved = true; // Set the flag to true to prevent multiple toasts
      }
    } catch (error) {
      console.error('Error adding item to order:', error);
      toast.error('An unexpected error occurred while saving the order data');
    }
  };

  const incrementQuantity = (itemId) => {
    const updatedCartData = cartData.map(item => {
      if (item._id === itemId) {
        return { ...item, quantity: item.quantity + 1, total: item.price * (item.quantity + 1) };
      }
      return item;
    });
    setCartData(updatedCartData);
    updateTotalPrice(updatedCartData);
  };

  const decrementQuantity = (itemId) => {
    const updatedCartData = cartData.map(item => {
      if (item._id === itemId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1, total: item.price * (item.quantity - 1) };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove item if quantity is 0
    setCartData(updatedCartData);
    updateTotalPrice(updatedCartData);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Cart Page</h1>
      <Link to="/">

      <button>Home</button>
      </Link>
      <div>
        {cartData.map((item,index) => (
          <div key={item._id}>
            <p>Item: {item.title}</p>
            <p>Price: {item.price}</p>
            
            <button onClick={() => incrementQuantity(item._id)}>+</button>
            <button>Quantity: {item.quantity}</button>
            <button onClick={() => decrementQuantity(item._id)}>-</button>
          </div>
        ))}
      </div>
      <p>Total Cart Price: {totalPrice}</p>
      
        <button onClick={handlePurchase}>Purchase Content</button>
     
    </div>
  );
}

export default Cart;
