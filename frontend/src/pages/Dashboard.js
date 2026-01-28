import React, { useState, useEffect, useContext } from 'react';
import { reportService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ReportCard } from '../components/ReportCard';
import '../styles/Dashboard.css';

export const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMyReports();
  }, [isAuthenticated, navigate]);

  const fetchMyReports = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await reportService.getMyReports();
      setReports(response.data.reports);
    } catch (err) {
      setError('Failed to fetch your reports');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Reports</h1>
        <p>Track all your submitted scam reports</p>
        <button className="new-report-btn" onClick={() => navigate('/report')}>
          + New Report
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading your reports...</div>
      ) : reports.length === 0 ? (
        <div className="no-reports">
          <p>You haven't submitted any reports yet.</p>
          <button onClick={() => navigate('/report')} className="btn-primary">
            Submit Your First Report
          </button>
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
