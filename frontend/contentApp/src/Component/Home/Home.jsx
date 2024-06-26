import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContentContext } from "./../../Context/Context";
import axios from "axios";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const { contentData, setContentData } = useContentContext();
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://todayq-contentoffer-website.onrender.com/api/content/get"
      );
      setContentData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = (id) => {
    setTotalQuantity((prevQty) => prevQty + 1);
    const updatedData = contentData.map((content) => {
      if (content._id === id) {
        return {
          ...content,
          addedToCart: true,
          quantity: (content.quantity || 0) + 1,
        };
      }
      return content;
    });
    setContentData(updatedData);
    console.log("increment", updatedData);
  };

  const removeFromCart = (id) => {
    if (totalQuantity !== 0) {
      setTotalQuantity((prevQty) => prevQty - 1);
    }

    const updatedData = contentData.map((content) => {
      if (content._id === id && content.quantity > 0) {
        return { ...content, quantity: content.quantity - 1 };
      }
      return content;
    });
    setContentData(updatedData);
    console.log("decrement", updatedData);
  };

  return (
    <div>
      <header className="home-header">
        <h2>Welcome to Conetnt Publication</h2>
        <div>
          <Link to="/formdata">
            <button>Publish Content</button>
          </Link>
          <Link to="/cart">
            <button>
              Cart <sup>{totalQuantity}</sup>
            </button>
          </Link>
        </div>
      </header>
      <div className="home-container">
        {/* <h2>Content Data:</h2> */}
        <div className="card-container">
          {contentData.map((content, index) => (
            <div
              key={content._id}
              className={`card ${content.addedToCart ? "yellow" : ""}`}
            >
              <h3>{content.title}</h3>
              <p>Author: {content.authorName}</p>
              <p>Description: {content.description}</p>
              <p>Price: {content.price}</p>
              <p>
                Created At:{" "}
                {new Date(content.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
              <button onClick={() => addToCart(content._id)}>+</button>
              <button>Qty: {content.quantity}</button>
              <button onClick={() => removeFromCart(content._id)}>-</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
