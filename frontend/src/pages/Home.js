import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import '../styles/Home.css';
import { FiCheck, FiShield, FiUsers } from 'react-icons/fi';

const HomeComponent = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>🚨 Job Scam Detector</h1>
          <p>Protect yourself from job scams with verified reports</p>
          <SearchBar />
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <FiShield className="feature-icon" />
          <h3>Stay Protected</h3>
          <p>Check if a company has been reported for scams</p>
        </div>
        <div className="feature">
          <FiCheck className="feature-icon" />
          <h3>Verified Reports</h3>
          <p>All reports are verified by our admin team</p>
        </div>
        <div className="feature">
          <FiUsers className="feature-icon" />
          <h3>Community Driven</h3>
          <p>Help others by reporting suspicious job postings</p>
        </div>
      </section>

      <section className="cta">
        <h2>Help Us Fight Job Scams</h2>
        <p>Have you encountered a job scam? Report it and help protect others</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/scams" className="btn btn-secondary">View Scams</Link>
        </div>
      </section>

      <section className="info">
        <h2>Common Job Scam Red Flags</h2>
        <div className="flags-grid">
          <div className="flag-item">
            <h4>No Interview Process</h4>
            <p>Legitimate companies always interview candidates</p>
          </div>
          <div className="flag-item">
            <h4>Unrealistic Salary</h4>
            <p>If it sounds too good to be true, it probably is</p>
          </div>
          <div className="flag-item">
            <h4>Upfront Payment</h4>
            <p>Real employers never ask for payment upfront</p>
          </div>
          <div className="flag-item">
            <h4>Poor Communication</h4>
            <p>Scammers often have spelling and grammar errors</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Home = React.memo(HomeComponent);
