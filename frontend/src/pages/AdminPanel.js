import React, { useState, useEffect, useContext } from 'react';
import { reportService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';
import { FiCheck, FiX } from 'react-icons/fi';

export const AdminPanel = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
      return;
    }
    fetchPendingReports();
  }, [isAuthenticated, user, navigate]);

  const fetchPendingReports = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await reportService.getPendingReports();
      setReports(response.data.reports);
    } catch (err) {
      setError('Failed to fetch pending reports');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (reportId) => {
    try {
      await reportService.verifyReport(reportId, verificationNotes);
      setReports(reports.filter(r => r._id !== reportId));
      setSelectedReport(null);
      setVerificationNotes('');
    } catch (err) {
      setError('Failed to verify report');
    }
  };

  const handleReject = async (reportId) => {
    try {
      await reportService.rejectReport(reportId, verificationNotes);
      setReports(reports.filter(r => r._id !== reportId));
      setSelectedReport(null);
      setVerificationNotes('');
    } catch (err) {
      setError('Failed to reject report');
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Verify and manage scam reports</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading pending reports...</div>
      ) : reports.length === 0 ? (
        <div className="no-reports">
          <p>No pending reports to verify.</p>
        </div>
      ) : (
        <div className="admin-content">
          <div className="reports-list">
            {reports.map((report) => (
              <div
                key={report._id}
                className={`report-item ${selectedReport?._id === report._id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedReport(report);
                  setVerificationNotes('');
                }}
              >
                <h4>{report.companyName}</h4>
                <p className="job-title">{report.jobTitle}</p>
                <small>By: {report.reportedBy?.name}</small>
              </div>
            ))}
          </div>

          {selectedReport && (
            <div className="report-details">
              <h3>{selectedReport.companyName}</h3>
              <div className="detail">
                <strong>Job Title:</strong> {selectedReport.jobTitle}
              </div>
              <div className="detail">
                <strong>Description:</strong> {selectedReport.description}
              </div>
              {selectedReport.redFlags.length > 0 && (
                <div className="detail">
                  <strong>Red Flags:</strong>
                  <div className="flags-list">
                    {selectedReport.redFlags.map((flag, idx) => (
                      <span key={idx} className="flag">{flag}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="detail">
                <strong>Reported by:</strong> {selectedReport.reportedBy?.name} ({selectedReport.reportedBy?.email})
              </div>

              <div className="verification-section">
                <label>Verification Notes:</label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add any verification notes..."
                  rows="4"
                />
              </div>

              <div className="action-buttons">
                <button
                  className="verify-btn"
                  onClick={() => handleVerify(selectedReport._id)}
                >
                  <FiCheck /> Verify
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(selectedReport._id)}
                >
                  <FiX /> Reject
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
