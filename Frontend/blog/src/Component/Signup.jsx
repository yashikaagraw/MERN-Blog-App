import React, { useState } from 'react';

const initialvalue = {
  name: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [state, setState] = useState(initialvalue);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    };

    fetch('http://localhost:8000/signup', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Reset the form after successful submission
        setState(initialvalue);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    alert('Posted successfully');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        name="name"
        placeholder="Name"
        value={state.name}
        onChange={handleInput}
        style={inputStyle}
      />
      <input
        name="email"
        placeholder="Email"
        value={state.email}
        onChange={handleInput}
        style={inputStyle}
      />
      <input
        name="password"
        placeholder="Password"
        value={state.password}
        onChange={handleInput}
        style={inputStyle}
        type="password"
      />
      <button onClick={handleSubmit} style={buttonStyle}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
