import React, { useState } from 'react';
import axios from 'axios';

const PostReview = ({ make, model, year, username }) => {
  const [engine, setEngine] = useState('');
  const [chassis, setChassis] = useState('');
  const [aesthetics, setAesthetics] = useState('');
  const [comfort, setComfort] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [reliability, setReliability] = useState('');
  const [overall, setOverall] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const reviewData = {
      username,
      Make: make,
      Model: model,
      Year: year,
      engine: parseFloat(engine),
      chassis: parseFloat(chassis),
      aesthetics: parseFloat(aesthetics),
      comfort: parseFloat(comfort),
      fuel_efficiency: parseFloat(fuelEfficiency),
      reliability: parseFloat(reliability),
      overall: parseFloat(overall),
      comment
    };

    axios.post('https://ryc-backend.onrender.com/addreview', reviewData)
      .then((response) => {
        console.log(response.data);
        setEngine('');
        setChassis('');
        setAesthetics('');
        setComfort('');
        setFuelEfficiency('');
        setReliability('');
        setOverall('');
        setComment('');
        alert('Review added successfully!');
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
  };

  return (
    <div className="post-review">
      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <p>Make: {make}</p>
        <p>Model: {model}</p>
        <p>Year: {year}</p>
        <input
          type="number"
          placeholder="Engine"
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="Chassis"
          value={chassis}
          onChange={(e) => setChassis(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="Aesthetics"
          value={aesthetics}
          onChange={(e) => setAesthetics(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="Comfort"
          value={comfort}
          onChange={(e) => setComfort(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="Fuel Efficiency"
          value={fuelEfficiency}
          onChange={(e) => setFuelEfficiency(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="Reliability"
          value={reliability}
          onChange={(e) => setReliability(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="Overall"
          value={overall}
          onChange={(e) => setOverall(e.target.value)}
          min="1"
          max="10"
          step="0.1"
          required
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PostReview;
