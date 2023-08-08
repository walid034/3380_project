import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './Home';
import SignUpForm from './SignUpForm';
import CarDetails from './CarDetails';
import SearchResults from './SearchResults';
import LoginForm from './LoginForm';
import { UserProvider } from './UserContext'; // Import the UserProvider

function App() {
  return (
    <Router>
      <UserProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/car-details/:make/:model/:year" element={<CarDetails />} />
          <Route path="/search/:sentence" element={<SearchResults />} />
          <Route path="/search/" element={<SearchResults />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
