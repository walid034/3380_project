import React, { useState } from 'react';
import './App.css'; // You can style your SignUpForm using CSS
import axios from 'axios';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    axios.get(`https://ryc-backend.onrender.com/checkuser/${username}`)
      .then(response => {
        if (response.data.length >= 1) {
          alert('Username already exists.');
        } else {
          if (!username || !password) {
            alert('Username and password cannot be blank.');
            return;
          }

          axios.post('https://ryc-backend.onrender.com/adduser', { username, password })
            .then(response => {
              console.log(response.data);
              setUsername('');
              setPassword('');
              alert('Sign up complete!');
              window.location.reload(); // Reloading the page to show home component
            })
            .catch(error => {
              console.error('Error signing up:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error checking username:', error);
      });
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpForm;
