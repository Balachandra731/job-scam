import React, { useState } from 'react';
import '../styles/SearchBar.css';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (company.trim()) {
      navigate(`/scams?company=${encodeURIComponent(company)}`);
      setCompany('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search company name..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        <FiSearch /> Search
      </button>
    </form>
  );
};
