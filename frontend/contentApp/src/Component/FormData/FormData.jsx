import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormData = () => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ addedToCart,setAddedToCart] = useState(false);
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
    // console.log(imageUrl);

    const data = {
      authorName: authorName,
      title: title,
      description: description,
      price: price,
      addedToCart: addedToCart,
      // image: imageUrl // Use the uploaded image URL directly
    };

    try {
      const response = await axios.post('https://todayq-contentoffer-website.onrender.com/api/content/add', data);
      navigate("/");
      toast.success("Data posted successfully");
      console.log("Response Data:", response.data);
      // Handle success
    } catch (error) {
      console.log("Error:", error);
      // Handle error
    }
  };
   

 
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author Name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        {/* <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select an image</p>
        </div> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormData;
