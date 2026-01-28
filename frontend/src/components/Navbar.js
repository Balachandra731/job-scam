import React from 'react';
import '../styles/Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚨 Job Scam Detector
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/scams" className="nav-link">View Scams</Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/report" className="nav-link">Report Scam</Link>
              </li>
              <li className="nav-item">
                <Link to="/my-reports" className="nav-link">My Reports</Link>
              </li>
              {user?.isAdmin && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">Admin Panel</Link>
                </li>
              )}
            </>
          )}
        </ul>
        <div className="nav-auth">
          {isAuthenticated ? (
            <>
              <span className="user-name">Hello, {user?.name}</span>
              <button className="logout-btn" onClick={logout}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
