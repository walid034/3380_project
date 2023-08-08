import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the useUser hook

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useUser(); // Use the useUser hook

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
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
        {loggedInUser ? (
          <button onClick={handleLogout}>Sign Out</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        {!loggedInUser && (
          <button><Link to="/signup">Sign Up</Link></button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
