import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import './App.css';

// 1. New Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <h1>Skill Swap <span></span></h1>
        <p>The ultimate hub for sharing educational assets and searching courses.</p>
        <button className="get-started-btn" onClick={() => navigate('/share')}>
          Module 1
        </button>
      </div>
    </div>
  );
};

// 2. Your Original UI (Now as a separate route)
const SharePage = () => {
  return (
    <div className="app-background">
      <div className="main-card">
        <div className="header-gradient">
          <div className="header-icon">☁️</div>
          <h1 className="header-title">
            File Uploading <span className="text-indigo-200"></span>
          </h1>
          <p className="header-subtitle">
            Instant Cloud Sharing for Images & PDFs
          </p>
        </div>

        <div className="content-area">
          <div className="info-header">
            <div>
              <h2 className="section-title">Upload Assets</h2>
              <p className="section-desc">PNG, JPG, or PDF (Up to 10MB)</p>
            </div>
            <div className="status-badge">Secure</div>
          </div>
          
          <div className="upload-zone">
             <FileUpload />
          </div>
        </div>

        <footer className="card-footer">
          <p className="footer-text">
            MERN STACK • CLOUDINARY • VITE
          </p>
        </footer>
      </div>
    </div>
  );
};

// 3. Main App with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </Router>
  );
}

export default App;