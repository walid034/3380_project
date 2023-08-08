import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import CarCard from './CarCard';
import axios from 'axios';

const SearchResults = () => {
  const { sentence } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${encodeURIComponent(sentence || '')}`
        );
        setSearchResults(response.data);
        setCurrentPage(1); // Reset to first page when search results change
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchSearchResults();
  }, [sentence]);

  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    for (let page = 1; page <= totalPages; page++) {
      pageLinks.push(
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }
    return pageLinks;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = searchResults.slice(startIndex, endIndex);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="car-list">
        {displayedResults.map((car) => (
          <CarCard key={car._id} make={car.Make} model={car.Model} year={car.Year} />
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {renderPageLinks()}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
