import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useUser } from './UserContext'; 
import { useNavigate } from 'react-router-dom'; 

const LoginForm = () => {
  const { setLoggedInUser } = useUser(); 
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.get(`https://ryc-backend.onrender.com/getuser/${username}&${password}`)
      .then(response => {
        if (response.data.length >= 1) {
          setLoggedInUser(username); 
          navigate('/'); 
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
