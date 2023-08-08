import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useUser } from './UserContext'; // Import the useUser hook
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const LoginForm = () => {
  const { setLoggedInUser } = useUser(); // Use the useUser hook
  const navigate = useNavigate(); // Use the useNavigate hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.get(`http://localhost:5000/getuser/${username}&${password}`)
      .then(response => {
        if (response.data.length >= 1) {
          setLoggedInUser(username); // Update the logged-in user
          navigate('/'); // Redirect to the home page
        } else {
          alert('Login failed. Please check your username and password.');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
