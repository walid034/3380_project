import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostReview from './PostReview';

import { useUser } from './UserContext';

const CarDetails = () => {
  const [reviews, setReviews] = useState([]);
  const { make, model, year } = useParams();
  const [carImage, setCarImage] = useState('/images/notfound.png');
  const [carDetails, setCarDetails] = useState({});
  const [averageRatings, setAverageRatings] = useState({
    Engine: 0,
    Chassis: 0,
    Aesthetics: 0,
    Comfort: 0,
    'Fuel Efficiency': 0,
    Reliability: 0,
    Overall: 0,
  });

  const { loggedInUser } = useUser();

  useEffect(() => {
    // Fetch car details
    axios.get(`http://localhost:5000/getcardetails/${make}&${model}&${year}`)
      .then(response => {
        setCarDetails(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching car details:', error);
      });

    // Fetch average ratings
    axios.get(`http://localhost:5000/getavgreview/${make}&${model}&${year}`)
      .then(response => {
        const avgRatings = response.data[0] || {}; // Use an empty object if the response is empty
        setAverageRatings({
          Engine: avgRatings.Engine || 0,
          Chassis: avgRatings.Chassis || 0,
          Aesthetics: avgRatings.Aesthetics || 0,
          Comfort: avgRatings.Comfort || 0,
          'Fuel Efficiency': avgRatings['Fuel Efficiency'] || 0,
          Reliability: avgRatings.Reliability || 0,
          Overall: avgRatings.Overall || 0,
        });
      })
      .catch(error => {
        console.error('Error fetching average ratings:', error);
    });

    axios.get(`http://localhost:5000/getallreview/${make}&${model}&${year}`)
     .then(response => {
      setReviews(response.data);
      })
      .catch(error => {
          console.error('Error fetching reviews:', error);
    });

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
    <div className="car-details">
      <img
        src={carImage}
        alt={`${make} ${model}`}
        style={{ width: 950, height: 600 }}
      />
      <h2>{`${make} ${model} ${year}`}</h2>
      <div className="car-specs">
        <h3>Specifications:</h3>
        <ul>
          <li>Car Type: {carDetails?.Category}</li>
          <li>Engine Type: {carDetails.specs?.['Engine Type']}</li>
          <li>Displacement: {carDetails.specs?.Displacement}</li>
          <li>HP: {carDetails.specs?.HP}</li>
          <li>Torque: {carDetails.specs?.Torque}</li>
          <li>Transmission: {carDetails.specs?.Transmission}</li>
          <li>Avg. Starting Price: {carDetails.specs?.['Avg.Starting Price']}</li>
        </ul>
      </div>
      <div className="average-ratings">
        <h3>Average Ratings:</h3>
        <ul>
          <li>Engine: {averageRatings.Engine || 0}</li>
          <li>Chassis: {averageRatings.Chassis || 0}</li>
          <li>Aesthetics: {averageRatings.Aesthetics || 0}</li>
          <li>Comfort: {averageRatings.Comfort || 0}</li>
          <li>Fuel Efficiency: {averageRatings['Fuel Efficiency'] || 0}</li>
          <li>Reliability: {averageRatings.Reliability || 0}</li>
          <li>Overall: {averageRatings.Overall || 0}</li>
        </ul>
      </div>
      <div className="user-reviews">
        <h3>User Reviews:</h3>
        <ul>
          {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.username}:</strong> {review.comment}
          </li>
          ))}
        </ul>
      </div>
      {loggedInUser && (
        <PostReview make={make} model={model} year={year} username={loggedInUser} />
      )}

    </div>
  );
};

export default CarDetails;
