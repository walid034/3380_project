import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './App.css'; // You can style your CarCard using CSS
import axios from 'axios';

const CarCard = ({ make, model, year }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [carImage, setCarImage] = useState('/images/notfound.png');

  useEffect(() => {
    // Fetch average overall rating for the car
    axios.get(`http://localhost:5000/getavgreview/${make}&${model}&${year}`)
      .then(response => {
        const avgOverall = response.data[0]?.Overall || 0;
        setAverageRating(avgOverall);
      })
      .catch(error => {
        console.error('Error fetching average rating:', error);
      });

    // Set car image or fallback to 'notfound.jpg'
    const imageSrc = `/images/${make}_${model}_${year}.jpg`;
    axios.head(imageSrc)
      .then(() => {
        setCarImage(imageSrc);
      })
      .catch(() => {
        console.warn('Car image not found, using fallback');
      });
  }, [make, model, year]);

  return (
    <Link to={`/car-details/${make}/${model}/${year}`} className="car-card-link">
      <div className="car-card">
        <div className="car-image">
          <img src={carImage} alt={`${make} ${model}`} />
        </div>
        <div className="car-details">
          <h3>{make} {model}</h3>
          <p>Average Overall Rating: {averageRating}</p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;