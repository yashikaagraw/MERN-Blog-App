import { useContext } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MyAuthContext } from './Context/AuthContextProvider';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [state, setState] = useState(initialState);

  const { login, isAuth } = useContext(MyAuthContext);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    width: '300px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '20px',
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
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={headingStyle}>Login</h1>
        <input
          name="email"
          placeholder="Email"
          onChange={handleInput}
          style={inputStyle}
        />
        <input
          name="password"
          placeholder="Password"
          onChange={handleInput}
          style={inputStyle}
          type="password"
        />
        <button onClick={handleSubmit} style={buttonStyle}>
          Login
        </button>
      </div>
      {isAuth && <Navigate to="/dashboard" />}
    </div>
  );
};

export default Login;
