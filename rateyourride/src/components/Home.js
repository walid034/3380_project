import React, { useState, useEffect } from 'react';
import './App.css'; // You can style your Home component using CSS
import CarCard from './CarCard'; // Import the CarCard component
import axios from 'axios';

const Home = () => {
  const [topCars, setTopCars] = useState([]);

  useEffect(() => {
    // Fetch top 7 reviewed cars
    axios.get('http://localhost:5000/gettopcars')
      .then(response => {
        setTopCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching top cars:', error);
      });
  }, []);

  return (
    <div className="home">
      <h1>Welcome to RATEYOURRIDE</h1>
      <h2>Top rated cars:</h2>
      <div className="car-list">
        {topCars.map((car, index) => (
          <CarCard
            key={index}
            make={car.Make}
            model={car.Model}
            year={car.Year}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;