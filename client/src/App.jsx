import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css'
function App() {
  return (
    <div className="app-background">
      {/* Main Glassmorphism Card */}
      <div className="main-card">
        
        {/* Header Section */}
        <div className="header-gradient">
          <div className="header-icon">☁️</div>
          <h1 className="header-title">
            Skill Swap <span className="text-indigo-200"></span>
          </h1>
          <p className="header-subtitle">
            Instant Cloud Sharing for Images & PDFs
          </p>
        </div>

        {/* Content Section */}
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

        {/* Footer */}
        <footer className="card-footer">
          <p className="footer-text">
            MERN STACK • CLOUDINARY • VITE
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;