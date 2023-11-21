import React from 'react'
import "./contact.css";
import {useState} from 'react'

const initialVal = {
    name: "",
    email: "",
    message: "",
}

export default function Contact() {

    const [state, setState] = useState(initialVal)
    //console.log(state);
  

    const handleSubmit = (e) => {
        alert("submitted successfully")
        e.preventDefault();
        const requestOptions = {
         method: "POST",
         headers: {"Content-Type":"application/json"},
         body: JSON.stringify(state),
        };
        fetch("http://localhost:8000/contact ", requestOptions)
        .then((response)=> response.json())
        .then((data)=> console.log(data));
        
  
    }
    const handleChange = (e) => {
        //setState(e.target.value)
        setState({...state, [e.target.name]: e.target.value});
    }

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>If you have any questions or inquiries, please feel free to contact us.</p>

        <div className="contact-info">
          <h2>Gallery Information</h2>
          <p>
            Address: 123 Art Street<br />
            City: Artville<br />
            Phone: (555) 123-4567<br />
            Email: info@artgallery.com
          </p>
        </div>

        <div className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required onChange={handleChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows="4" required onChange={handleChange}></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}