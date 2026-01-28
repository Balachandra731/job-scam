import React, { useState, useEffect } from 'react';
import { reportService } from '../services/api';
import { ReportCard } from '../components/ReportCard';
import { SearchBar } from '../components/SearchBar';
import '../styles/ScamsPage.css';

export const ScamsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async (company = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await reportService.getAllReports(company);
      setReports(response.data.reports);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (company) => {
    setSearchQuery(company);
    fetchReports(company);
  };

  return (
    <div className="scams-page">
      <div className="scams-header">
        <h1>Job Scam Database</h1>
        <p>Browse verified job scam reports</p>
      </div>

      <SearchBar />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="no-results">
          <p>No scam reports found. {searchQuery ? 'Try a different search.' : 'Be safe out there!'}</p>
        </div>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};
