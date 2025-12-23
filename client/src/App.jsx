import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import FileSearch from './components/FileSearch'; // We will create this next
import './App.css';

// 1. Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <h1>Skill Swap <span>2.0</span></h1>
        <p>The ultimate hub for sharing educational assets and searching courses.</p>
        <div className="button-group">
          <button className="get-started-btn" onClick={() => navigate('/share')}>
            Module 1: Share Files
          </button>
          <button className="get-started-btn secondary" onClick={() => navigate('/search')}>
            Module 2: Search Courses
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Module 1: Share Page
const SharePage = () => {
  const navigate = useNavigate();
  return (
    <div className="app-background">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <div className="main-card">
        <div className="header-gradient">
          <div className="header-icon">☁️</div>
          <h1 className="header-title">File Uploading</h1>
          <p className="header-subtitle">Instant Cloud Sharing for Images & PDFs</p>
        </div>
        <div className="content-area">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

// 3. Module 2: Search Page (Advanced MongoDB Search)
const SearchPage = () => {
  const navigate = useNavigate();
  return (
    <div className="app-background">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      <div className="main-card search-card">
        <div className="header-gradient search-head">
          <div className="header-icon">🔍</div>
          <h1 className="header-title">Course Discovery</h1>
          <p className="header-subtitle">Advanced Search across MongoDB Database</p>
        </div>
        <div className="content-area">
          <FileSearch />
        </div>
      </div>
    </div>
  );
};

// 4. Main App Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;