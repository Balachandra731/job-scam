import React, { useState, useContext } from 'react';
import { reportService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportForm.css';

const RED_FLAGS_OPTIONS = [
  'No interview process',
  'Unrealistic salary',
  'Upfront payment required',
  'Poor communication',
  'Fake job posting',
  'Identity theft attempts',
  'Spelling/grammar errors',
  'Unknown company'
];

export const ReportPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    redFlags: [],
    evidenceLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRedFlagChange = (flag) => {
    setFormData(prev => ({
      ...prev,
      redFlags: prev.redFlags.includes(flag)
        ? prev.redFlags.filter(f => f !== flag)
        : [...prev.redFlags, flag]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await reportService.createReport(formData);
      setSuccess(response.data.message);
      setFormData({
        companyName: '',
        jobTitle: '',
        description: '',
        redFlags: [],
        evidenceLink: ''
      });
      setTimeout(() => navigate('/my-reports'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-container">
      <div className="report-box">
        <h1>Report a Job Scam</h1>
        <p className="subtitle">Help us protect others by reporting suspicious job postings</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description of the Scam *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what happened and why you think it's a scam (min 20 characters)"
              rows="6"
              required
              minLength="20"
            />
          </div>

          <div className="form-group">
            <label>Red Flags (Select all that apply)</label>
            <div className="checkboxes-group">
              {RED_FLAGS_OPTIONS.map(flag => (
                <label key={flag} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.redFlags.includes(flag)}
                    onChange={() => handleRedFlagChange(flag)}
                  />
                  {flag}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Evidence Link (optional)</label>
            <input
              type="url"
              name="evidenceLink"
              value={formData.evidenceLink}
              onChange={handleChange}
              placeholder="Link to job posting, email, etc."
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
