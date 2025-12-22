import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="hero-content">
        <h1>Welcome to Skill Swap</h1>
        <p>The fastest way to share assets with your team.</p>
        <button 
          className="get-started-btn" 
          onClick={() => navigate('/share')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;