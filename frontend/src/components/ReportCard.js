import React from 'react';
import '../styles/ReportCard.css';
import { FiCheck, FiX } from 'react-icons/fi';

export const ReportCard = ({ report }) => {
  return (
    <div className="report-card">
      <div className="report-header">
        <h3>{report.companyName}</h3>
        <span className={`status ${report.status}`}>
          {report.status === 'verified' && <FiCheck />} {report.status}
        </span>
      </div>
      
      <div className="report-content">
        <p><strong>Job Title:</strong> {report.jobTitle}</p>
        <p><strong>Description:</strong> {report.description.substring(0, 100)}...</p>
        
        {report.redFlags && report.redFlags.length > 0 && (
          <div className="red-flags">
            <strong>Red Flags:</strong>
            <div className="flags-list">
              {report.redFlags.map((flag, idx) => (
                <span key={idx} className="flag-badge">{flag}</span>
              ))}
            </div>
          </div>
        )}
        
        <p><strong>Scam Count:</strong> {report.scamCount}</p>
        <p><strong>Reported by:</strong> {report.reportedBy?.name || 'Anonymous'}</p>
        
        {report.verificationNotes && (
          <p><strong>Notes:</strong> {report.verificationNotes}</p>
        )}
        
        <small className="report-date">
          {new Date(report.createdAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};
