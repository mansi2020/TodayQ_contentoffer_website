import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../../assets/img.png";
import "react-toastify/dist/ReactToastify.css";
import "./FormData.css"; // Import the CSS file

const FormData = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setImageUrl(url);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      authorName: authorName,
      title: title,
      description: description,
      price: price,
      addedToCart: addedToCart,
      // image: imageUrl // Use the uploaded image URL directly
    };

    try {
      const response = await axios.post(
        "https://todayq-contentoffer-website.onrender.com/api/content/add",
        data
      );
      navigate("/");
      toast.success("Data posted successfully");
      console.log("Response Data:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <header className="home-header">
        <h2>Publish Your Content</h2>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
        </div>
      </header>
      <div className="form-container">
        <img src={img} alt="img form container" id="form-container-img" />
        <form onSubmit={handleFormSubmit} className="form-content">
          <h2 className="form-title">Submit Your Content</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
          {/* Uncomment this if you plan to add file upload functionality */}
          {/* <div {...getRootProps()} className="form-dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select an image</p>
        </div> */}
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormData;
