import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSearch = () => {
      navigate(`/search/${searchTerm}`);
  };

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  return (
    <div className="navbar-container">
      <Link to="/" className="app-name">RATEYOURRIDE</Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="login-signup">
        <button>Login</button>
        <button><Link to="/signup">Sign Up</Link></button>
      </div>
    </div>
  );
};

export default NavigationBar;
